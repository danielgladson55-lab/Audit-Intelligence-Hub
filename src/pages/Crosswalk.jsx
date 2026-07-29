import crosswalks from "../data/crosswalks";

export default function Crosswalk() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-5">
        Framework Crosswalk
      </h2>

      {crosswalks.map(item => (
        <div
          key={item.keyword}
          className="border p-4 rounded-xl mb-3"
        >
          <h3 className="font-bold">
            {item.keyword}
          </h3>

          <pre>
            {JSON.stringify(
              item.mappings,
              null,
              2
            )}
          </pre>
        </div>
      ))}
    </div>
  );
}
