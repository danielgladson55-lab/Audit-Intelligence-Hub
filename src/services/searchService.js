export const searchControls = (
  controls,
  searchTerm
) => {

  return controls.filter(
    (control) =>
      control.controlName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||

      control.domain
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||

      control.risk
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

};