const RESPONSE_SCORES = {
  Compliant: 1,
  Partial: 0.5,
  "Not Compliant": 0,
  "Not Applicable": null,
  "Not Assessed": null,
};

export function calculateTprmScore(questions, responses) {
  let earned = 0;
  let possible = 0;

  questions.forEach((question) => {
    const response = responses[question.id]?.response || "Not Assessed";
    const score = RESPONSE_SCORES[response];
    if (score === null || score === undefined) return;
    earned += question.weight * score;
    possible += question.weight;
  });

  const percentage = possible === 0 ? 0 : Math.round((earned / possible) * 100);
  const rating = percentage >= 85 ? "Low" : percentage >= 70 ? "Moderate" : percentage >= 50 ? "High" : "Critical";
  return { earned, possible, percentage, rating };
}
