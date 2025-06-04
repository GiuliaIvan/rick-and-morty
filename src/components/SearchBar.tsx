type Props = {
  value: string;
  onChange: (value: string) => void;
};

function SearchBar({ value, onChange }: Props) {
  return (
    <input
      type="text"
      placeholder="Search by name"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{ padding: "8px", marginBottom: "16px", width: "300px" }}
    />
  );
}

export default SearchBar;