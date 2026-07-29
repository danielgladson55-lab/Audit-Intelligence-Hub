export default function ControlCard({
  control
}) {
  return (
    <div className="border rounded-xl p-4 bg-white">
      <h3 className="font-bold">
        {control.controlName}
      </h3>

      <p>{control.domain}</p>

      <p className="text-sm text-gray-500">
        {control.risk}
      </p>
    </div>
  );
}
