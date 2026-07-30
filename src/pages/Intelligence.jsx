import { useState } from "react";
import controlLibrary from "../data/controlLibrary";

export default function Intelligence() {

  const [search, setSearch] =
    useState("");

  const filtered =
    controlLibrary.filter(control =>
      control.controlName
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  return (
    <div>

      <h1>
        Audit Intelligence Engine
      </h1>

      <input
        value={search}
        onChange={(e)=>
          setSearch(e.target.value)
        }
        placeholder="Search..."
      />

      {filtered.map(control => (

        <div key={control.controlId}>

          <h2>
            {control.controlName}
          </h2>

          <p>
            Domain: {control.domain}
          </p>

          <p>
            Risks:
            {" "}
            {control.riskIds.join(", ")}
          </p>

        </div>

      ))}

    </div>
  );
}