import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { IoOptionsOutline } from "react-icons/io5";

const SearchBar: React.FC = () => {
  const [search, setSearch] = useState("");

  return (
    <div className="flex items-center w-full max-w-md bg-white border border-gray-300 rounded-lg p-2 shadow-sm">

      <FiSearch className="text-gray-400 text-lg ml-2" />

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search..."
        className="flex-1 px-3 py-1 text-gray-700 focus:outline-none bg-transparent"
      />

      <button className="p-2 text-gray-600 hover:text-black">
        <IoOptionsOutline size={20} />
      </button>
    </div>
  );
};

export default SearchBar;
