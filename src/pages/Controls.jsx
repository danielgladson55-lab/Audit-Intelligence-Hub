import controls from "../data/controls";
import ControlCard from "../components/ControlCard";

export default function Controls() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-5">
        Control Repository
      </h2>

      <div className="grid gap-4">
        {controls.map(control => (
          <ControlCard
            key={control.controlId}
            control={control}
          />
        ))}
      </div>
    </div>
  );
}
