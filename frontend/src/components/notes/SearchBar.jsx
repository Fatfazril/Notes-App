// components/notes/SearchBar.jsx
function SearchBar({ value, onChange }) {
  return (
    <div className="relative">
      <span className="material-symbols-outlined absolute top-1/2 -translate-y-1/2 left-3 text-gray-400 text-[20px]">
        search
      </span>
      <input
        type="text"
        placeholder="Search notes..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
      />
    </div>
  );
}

export default SearchBar;