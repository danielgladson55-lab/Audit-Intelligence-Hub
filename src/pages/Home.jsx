import frameworks from "../data/frameworks";
import controls from "../data/controls";
import risks from "../data/risks";

export default function Home() {
  return (
    <div>

      <div className="mb-10">
        <h1 className="text-5xl font-bold">
          Audit Intelligence Hub
        </h1>

        <p className="text-lg mt-3">
          Unified IT Audit, Cybersecurity,
          GRC and Compliance Platform
        </p>
      </div>

      <div className="grid md:grid-cols-4 gap-4">

        <div className="p-6 bg-white rounded-xl shadow">
          <h3>Frameworks</h3>
          <p className="text-3xl">
            {frameworks.length}
          </p>
        </div>

        <div className="p-6 bg-white rounded-xl shadow">
          <h3>Controls</h3>
          <p className="text-3xl">
            {controls.length}
          </p>
        </div>

        <div className="p-6 bg-white rounded-xl shadow">
          <h3>Risks</h3>
          <p className="text-3xl">
            {risks.length}
          </p>
        </div>

        <div className="p-6 bg-white rounded-xl shadow">
          <h3>Audit Programs</h3>
          <p className="text-3xl">
            0
          </p>
        </div>

      </div>
    </div>
  );
}
