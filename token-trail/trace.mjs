export function displayToken(value) {
  return JSON.stringify(value);
}

export function displayProbability(value) {
  const percent = value * 100;
  return percent > 0 && percent < 0.01 ? "<0.01%" : `${percent.toFixed(2)}%`;
}

export function validateTrace(trace) {
  if (
    !trace ||
    trace.schema_version !== "1.0" ||
    trace.decoding?.probability_basis !== "raw_softmax_logits" ||
    !Array.isArray(trace.prompt_tokens) ||
    !Array.isArray(trace.steps) ||
    trace.steps.length === 0 ||
    typeof trace.generated_text !== "string"
  ) {
    throw new Error("The model returned a trace this page cannot display.");
  }

  const validCandidate = (candidate) =>
    candidate &&
    Number.isInteger(candidate.token_id) &&
    typeof candidate.token === "string" &&
    Number.isFinite(candidate.probability) &&
    candidate.probability >= 0 &&
    candidate.probability <= 1;

  if (
    !trace.prompt_tokens.every(
      (token) => Number.isInteger(token.token_id) && typeof token.token === "string",
    ) ||
    !trace.steps.every((step, index) => {
      if (
        step.step !== index ||
        !Number.isInteger(step.selected_token_id) ||
        typeof step.selected_token !== "string" ||
        !Number.isFinite(step.selected_probability) ||
        step.selected_probability < 0 ||
        step.selected_probability > 1 ||
        !Number.isFinite(step.step_ms) ||
        !Array.isArray(step.alternatives) ||
        !step.alternatives.every(validCandidate)
      ) {
        return false;
      }
      return step.alternatives.every(
        (candidate, candidateIndex) =>
          candidate.token_id !== step.selected_token_id &&
          (candidateIndex === 0 ||
            step.alternatives[candidateIndex - 1].probability >= candidate.probability),
      );
    })
  ) {
    throw new Error("The model returned inconsistent token information.");
  }
  return trace;
}

export function requestError(status, code) {
  if (status === 429) return "The model is busy. Please wait a moment and try again.";
  if (status === 503 || status === 502) return "The model is starting or unavailable. Please try again shortly.";
  if (status === 504) return "The model took too long. Try a shorter trace.";
  if (status === 403 && code === "origin_not_allowed") {
    return "This page's origin is not approved by the model service.";
  }
  if (status === 413 || status === 422) return "Check the prompt and settings, then try again.";
  return "The live trace failed. Please try again shortly.";
}
