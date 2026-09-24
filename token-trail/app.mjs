import { displayProbability, displayToken, requestError, validateTrace } from "./trace.mjs";

const API = "https://ozyjay-token-trail-backend.hf.space";
const form = document.querySelector("#trace-form");
const promptField = document.querySelector("#prompt");
const generateButton = document.querySelector("#generate");
const cancelButton = document.querySelector("#cancel");
const status = document.querySelector("#service-status");
const emptyState = document.querySelector("#empty-state");
const result = document.querySelector("#trace-result");
const promptTokens = document.querySelector("#prompt-tokens");
const generatedText = document.querySelector("#generated-text");
const stepCount = document.querySelector("#step-count");
const selectedToken = document.querySelector("#selected-token");
const selectedProbability = document.querySelector("#selected-probability");
const selectedFill = document.querySelector("#selected-fill");
const alternatives = document.querySelector("#alternatives");
const stepTiming = document.querySelector("#step-timing");
const previousStep = document.querySelector("#previous-step");
const nextStep = document.querySelector("#next-step");

let activeController = null;
let currentTrace = null;
let currentStep = 0;

function setStatus(message, tone = "neutral") {
  status.textContent = message;
  status.dataset.tone = tone;
}

function setBusy(busy) {
  generateButton.disabled = busy;
  cancelButton.hidden = !busy;
}

async function checkHealth(signal) {
  const response = await fetch(`${API}/health`, { signal, cache: "no-store" });
  if (!response.ok) return false;
  const health = await response.json();
  return health.ready === true;
}

async function waitForModel(signal) {
  for (let attempt = 0; attempt < 20; attempt += 1) {
    if (signal.aborted) throw new DOMException("Cancelled", "AbortError");
    try {
      if (await checkHealth(signal)) return;
    } catch (error) {
      if (signal.aborted) throw error;
    }
    setStatus("The model is waking up. This can take a little while…");
    await new Promise((resolve) => setTimeout(resolve, 4000));
  }
  throw new Error("The model did not become ready. Please try again later.");
}

function requestPayload() {
  return {
    prompt: promptField.value,
    model: "qwen2.5-0.5b",
    max_new_tokens: Number(document.querySelector("#max-tokens").value),
    top_k: Number(document.querySelector("#top-k").value),
    temperature: Number(document.querySelector("#temperature").value),
    top_p: Number(document.querySelector("#top-p").value),
  };
}

async function fetchTrace(payload, signal) {
  const response = await fetch(`${API}/v1/traces`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    signal,
    cache: "no-store",
  });
  let data;
  try {
    data = await response.json();
  } catch {
    throw new Error(requestError(response.status));
  }
  if (!response.ok) {
    throw new Error(requestError(response.status, data.error?.code));
  }
  return validateTrace(data);
}

function renderPromptTokens(trace) {
  promptTokens.replaceChildren();
  for (const piece of trace.prompt_tokens) {
    const item = document.createElement("span");
    item.className = "token-piece";
    item.textContent = displayToken(piece.token);
    item.title = `Token ID ${piece.token_id}`;
    promptTokens.append(item);
  }
}

function renderStep() {
  if (!currentTrace) return;
  const step = currentTrace.steps[currentStep];
  const atEnd = currentStep === currentTrace.steps.length - 1;
  stepCount.textContent = `Step ${currentStep + 1} of ${currentTrace.steps.length}`;
  previousStep.disabled = currentStep === 0;
  nextStep.disabled = atEnd;
  generatedText.textContent = atEnd
    ? currentTrace.generated_text
    : currentTrace.steps.slice(0, currentStep + 1).map((part) => part.selected_token).join("");
  selectedToken.textContent = displayToken(step.selected_token);
  selectedToken.title = `Token ID ${step.selected_token_id}`;
  selectedProbability.textContent = displayProbability(step.selected_probability);
  selectedFill.style.width = `${step.selected_probability * 100}%`;
  alternatives.replaceChildren();

  for (const candidate of step.alternatives) {
    const item = document.createElement("li");
    const label = document.createElement("span");
    label.className = "alternative-token";
    label.textContent = displayToken(candidate.token);
    label.title = `Token ID ${candidate.token_id}`;
    const probability = document.createElement("span");
    probability.className = "alternative-probability";
    probability.textContent = displayProbability(candidate.probability);
    const track = document.createElement("span");
    track.className = "probability-track";
    const fill = document.createElement("span");
    fill.className = "probability-fill";
    fill.style.width = `${candidate.probability * 100}%`;
    track.append(fill);
    item.append(label, probability, track);
    alternatives.append(item);
  }
  stepTiming.textContent = `Token ID ${step.selected_token_id} · ${Math.round(step.step_ms)} ms for this step · raw model probabilities`;
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (activeController) return;
  activeController = new AbortController();
  setBusy(true);
  setStatus("Checking the model…");
  try {
    await waitForModel(activeController.signal);
    setStatus("Generating the trace…");
    const trace = await fetchTrace(requestPayload(), activeController.signal);
    currentTrace = trace;
    currentStep = 0;
    renderPromptTokens(trace);
    renderStep();
    emptyState.hidden = true;
    result.hidden = false;
    setStatus(`Trace ready · ${trace.steps.length} generated tokens`, "ready");
  } catch (error) {
    setStatus(
      activeController.signal.aborted
        ? "Request cancelled. Your previous trace is still available."
        : error instanceof TypeError
          ? "Could not reach the model service. Check your connection and try again."
          : error.message,
      "error",
    );
  } finally {
    activeController = null;
    setBusy(false);
  }
});

cancelButton.addEventListener("click", () => activeController?.abort());
previousStep.addEventListener("click", () => {
  currentStep = Math.max(0, currentStep - 1);
  renderStep();
});
nextStep.addEventListener("click", () => {
  if (currentTrace) currentStep = Math.min(currentTrace.steps.length - 1, currentStep + 1);
  renderStep();
});
for (const button of document.querySelectorAll(".example")) {
  button.addEventListener("click", () => {
    promptField.value = button.dataset.prompt;
    promptField.focus();
  });
}

checkHealth()
  .then((ready) => setStatus(ready ? "Model ready" : "Model starting. Generating will wake it.", ready ? "ready" : "neutral"))
  .catch(() => setStatus("Model sleeping or unavailable. Generating will try to wake it."));
