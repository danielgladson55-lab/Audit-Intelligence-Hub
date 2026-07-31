import { clearAllDemoData } from "../../services/demoDataService";

export default function DemoResetButton() {
  function resetDemo() {
    const confirmed = window.confirm(
      "Reset all Audit Intelligence Hub demonstration data saved in this browser?"
    );

    if (!confirmed) return;

    clearAllDemoData();
    window.location.hash = "#/";
    window.location.reload();
  }

  return (
    <button className="demo-reset-button" type="button" onClick={resetDemo}>
      Reset demo data
    </button>
  );
}
