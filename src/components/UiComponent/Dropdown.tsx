import React from 'react'
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
const Dropdown = () => {
    const [showDropdown, setShowDropdown] = useState(false);
  return (
    <div className="relative inline-block text-left">
            <div>
              <button
                type="button"
                className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50"
                onClick={() => setShowDropdown(!showDropdown)}
                aria-expanded={showDropdown ? "true" : "false"}
                aria-haspopup="true"
              >
                Date Created
                <IoIosArrowDown className="ml-2 text-gray-400" />
              </button>
            </div>

            {showDropdown && (
              <div
                className="absolute right-0 z-10 mt-2 w-full text-center origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 focus:outline-hidden"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
              >
                <div className="py-1">
                  <a
                    href="#"
                    className="block  py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                  >
                    Date Created
                  </a>
                  <a
                    href="#"
                    className="block  py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                  >
                    Last Updated
                  </a>
                  <a
                    href="#"
                    className="block  py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                  >
                    Alphabetical
                  </a>
                </div>
              </div>
            )}
          </div>
  )
}

export default Dropdown