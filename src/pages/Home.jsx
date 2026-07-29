import frameworks from "../data/frameworks";
import controls from "../data/controls";
import risks from "../data/risks";

export default function Home() {
  return (
    <div className="space-y-8">

      <section>
        <h1 className="text-5xl font-bold">
          Audit Intelligence Hub
        </h1>

        <p className="text-gray-600 mt-2 text-lg">
          Unified Audit, Risk, Compliance,
          Security and Governance Platform
        </p>
      </section>

      <section className="grid md:grid-cols-4 gap-4">

        <div className="bg-white p-6 rounded-xl shadow">
          <h3>Frameworks</h3>
          <p className="text-3xl font-bold">
            {frameworks.length}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3>Controls</h3>
          <p className="text-3xl font-bold">
            {controls.length}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3>Risks</h3>
          <p className="text-3xl font-bold">
            {risks.length}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3>Audit Programs</h3>
          <p className="text-3xl font-bold">
            3
          </p>
        </div>

      </section>

    </div>
  );
}
