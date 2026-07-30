import { useState } from "react";

import SearchBar from "../components/SearchBar";
import ControlCard from "../components/ControlCard";

import controlLibrary
from "../data/controlLibrary";

import { searchControls }
from "../services/searchService";

export default function Controls() {

  const [searchTerm, setSearchTerm] =
    useState("");

  const filteredControls =
    searchControls(
      controlLibrary,
      searchTerm
    );

  return (
    <div>

      <h1>
        Universal Control Library
      </h1>

      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      {filteredControls.map(control => (

        <ControlCard
          key={control.controlId}
          control={control}
        />

      ))}

    </div>
  );
}