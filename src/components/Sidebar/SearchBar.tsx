import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { IoOptionsOutline } from "react-icons/io5";

const SearchBar: React.FC = () => {
  const [search, setSearch] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div
      className={`flex items-center w-full max-w-md border border-gray-300 rounded-lg p-2 transition-all ${
        isFocused ? "bg-white" : "bg-transparent"
      }`}
    >
      <FiSearch className="text-gray-400 text-lg ml-2" />

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search..."
        className="flex-1 px-3 py-1 text-gray-700 focus:outline-none bg-transparent"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />

      <button className="p-2 text-gray-600 hover:text-black">
        <IoOptionsOutline size={20} />
      </button>
    </div>
  );
};

export default SearchBar;

