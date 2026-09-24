import assert from "node:assert/strict";
import test from "node:test";
import {
  displayProbability,
  displayToken,
  requestError,
  validateTrace,
} from "../token-trail/trace.mjs";

function trace() {
  return {
    schema_version: "1.0",
    decoding: { probability_basis: "raw_softmax_logits" },
    prompt_tokens: [{ token_id: 5, token: "The" }],
    generated_text: " moon",
    steps: [
      {
        step: 0,
        selected_token_id: 10,
        selected_token: " moon",
        selected_probability: 0.4,
        step_ms: 90,
        alternatives: [
          { token_id: 11, token: " sun", probability: 0.3 },
          { token_id: 12, token: " star", probability: 0.2 },
        ],
      },
    ],
  };
}

test("accepts a bounded raw-probability trace", () => {
  assert.equal(validateTrace(trace()).steps[0].selected_token_id, 10);
});

test("rejects a different probability basis and inconsistent candidates", () => {
  const wrongBasis = trace();
  wrongBasis.decoding.probability_basis = "filtered_sampling";
  assert.throws(() => validateTrace(wrongBasis));

  const wrongStep = trace();
  wrongStep.steps[0].step = 1;
  assert.throws(() => validateTrace(wrongStep));

  const unsorted = trace();
  unsorted.steps[0].alternatives[1].probability = 0.35;
  assert.throws(() => validateTrace(unsorted));
});

test("shows whitespace and very small probabilities honestly", () => {
  assert.equal(displayToken(" moon"), '" moon"');
  assert.equal(displayProbability(0.4), "40.00%");
  assert.equal(displayProbability(0.00001), "<0.01%");
});

test("reports busy and origin errors plainly", () => {
  assert.match(requestError(429), /busy/);
  assert.match(requestError(403, "origin_not_allowed"), /origin/);
});
