import {
  maturityDomains,
  maturityLevels,
} from "../data/maturity/maturityModel";

export function createMaturityAssessment() {
  return maturityDomains.map((domain) => ({
    ...domain,
    currentScore: 0,
    targetScore: 3,
    priority: "Medium",
    owner: "",
    targetDate: "",
    evidenceReference: "",
    observation: "",
    improvementAction: domain.suggestedActions[0],
  }));
}

export function getMaturityLevel(score) {
  return (
    maturityLevels.find((level) => level.score === Number(score)) ||
    maturityLevels[0]
  );
}

export function calculateMaturityMetrics(records) {
  if (!records.length) {
    return {
      currentAverage: 0,
      targetAverage: 0,
      totalGap: 0,
      highPriorityGaps: 0,
      completion: 0,
    };
  }

  const currentTotal = records.reduce(
    (total, item) => total + Number(item.currentScore || 0),
    0
  );
  const targetTotal = records.reduce(
    (total, item) => total + Number(item.targetScore || 0),
    0
  );
  const assessed = records.filter(
    (item) => item.observation.trim() || item.evidenceReference.trim()
  ).length;

  return {
    currentAverage: Number((currentTotal / records.length).toFixed(1)),
    targetAverage: Number((targetTotal / records.length).toFixed(1)),
    totalGap: records.reduce(
      (total, item) =>
        total + Math.max(0, Number(item.targetScore) - Number(item.currentScore)),
      0
    ),
    highPriorityGaps: records.filter(
      (item) =>
        item.priority === "High" &&
        Number(item.targetScore) > Number(item.currentScore)
    ).length,
    completion: Math.round((assessed / records.length) * 100),
  };
}

export function getMaturityHeatClass(currentScore, targetScore) {
  const gap = Number(targetScore) - Number(currentScore);
  if (gap <= 0) return "maturity-on-target";
  if (gap === 1) return "maturity-small-gap";
  if (gap === 2) return "maturity-medium-gap";
  return "maturity-large-gap";
}
