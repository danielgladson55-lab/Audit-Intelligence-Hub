import frameworks from "../data/frameworks";

export default function Frameworks() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-5">
        Framework Repository
      </h2>

      {frameworks.map((f) => (
        <div
          key={f.id}
          className="border rounded-xl p-4 mb-2"
        >
          <h3>{f.name}</h3>
          <p>{f.category}</p>
        </div>
      ))}
    </div>
  );
}
