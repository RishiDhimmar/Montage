import { IoGrid, IoGridOutline } from "react-icons/io5";
import { MdViewList } from "react-icons/md";

const ViewModeToggle = ({ viewMode, setViewMode }) => {
  return (
    <div className="text-xl font-bold flex justify-between px-3 py-2">
      <div>Design</div>
      <div className="flex gap-2 items-center">
        <button
          onClick={() => setViewMode("grid")}
          className={`p-2 rounded ${viewMode === "grid" ? "bg-gray-300" : "hover:bg-gray-200"} `}
        >
          {viewMode === "grid" ? <IoGrid size={20} /> : <IoGridOutline size={20} />}
        </button>

        {/* List View Button */}
        <button
          onClick={() => setViewMode("list")}
          className={`p-2 rounded ${viewMode === "list" ? "bg-gray-300" : "hover:bg-gray-200"} `}
        >
          <MdViewList size={20} />
        </button>
      </div>
    </div>
  );
};

export default ViewModeToggle;
