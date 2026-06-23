interface Props {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: Props) {
  return (
    <input
      className="search-bar"
      type="search"
      placeholder="Rechercher par nom, pseudo ou société…"
      value={value}
      onChange={(event) => onChange(event.target.value)}
    />
  );
}
