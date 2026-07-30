import frameworks from "../data/frameworks";

export default function Frameworks() {
  return (
    <div>
      <h1>Framework Repository</h1>

      {frameworks.map((framework) => (
        <div key={framework.id}>
          <h3>{framework.name}</h3>
          <p>{framework.category}</p>
        </div>
      ))}
    </div>
  );
}