export default function SearchBar({
  value,
  onChange
}) {
  return (
    <input
      className="w-full border rounded-lg p-3"
      placeholder="Search controls, risks, frameworks..."
      value={value}
      onChange={(e) =>
        onChange(e.target.value)
      }
    />
  );
}
``
