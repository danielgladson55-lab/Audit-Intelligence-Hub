export const searchControls = (
  controls,
  searchTerm
) => {
  return controls.filter(control =>
    control.controlName
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );
};
