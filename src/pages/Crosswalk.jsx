import { useState } from "react";

import crosswalks from "../data/crosswalks";
import SearchBar from "../components/SearchBar";
import CrosswalkCard from "../components/CrosswalkCard";

export default function Crosswalk() {
  const [searchTerm, setSearchTerm] =
    useState("");

  const filteredCrosswalks =
    crosswalks.filter((item) =>
      item.keyword
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );

  return (
    <div>
      <h1>Framework Crosswalk Engine</h1>

      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      {filteredCrosswalks.map((item) => (
        <CrosswalkCard
          key={item.id}
          item={item}
        />
      ))}
    </div>
  );
}