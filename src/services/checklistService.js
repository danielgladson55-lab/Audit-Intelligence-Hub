export const generateChecklist = (
  controls
) => {
  return controls.map(control => ({
    control: control.controlName,
    testingStatus: "Not Started",
    evidence: [],
    conclusion: ""
  }));
};
