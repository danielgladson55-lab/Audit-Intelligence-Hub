export default function SearchBar({
  searchTerm,
  setSearchTerm,
}) {
  return (
    <input
      type="text"
      placeholder="Search controls, risks, frameworks..."
      value={searchTerm}
      onChange={(e) =>
        setSearchTerm(e.target.value)
      }
      style={{
        width: "100%",
        padding: "12px",
        borderRadius: "8px",
        border: "1px solid #ccc",
        marginBottom: "20px",
        fontSize: "16px"
      }}
    />
  );
}
