export function generateEvidenceList(
  selectedControls
) {
  const evidence = new Set();

  selectedControls.forEach((control) => {
    control.evidence.forEach((item) => {
      evidence.add(item);
    });
  });

  return [...evidence];
}