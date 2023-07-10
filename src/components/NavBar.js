import React from "react";
import {
  FiMenu,
  FiChevronDown,
  FiSearch,
  FiBell,
  FiHelpCircle,
  FiMoon,
  FiSun,
  FiUser,
} from "react-icons/fi";

const Navbar = () => {
  return (
    <div className="h-[50px] flex items-center justify-between bg-gray-800 text-white py-3 px-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <FiMenu className="text-xl" />
          <div className="dots" />
        </div>
        <div className="flex items-center gap-2">
          <span>Workspaces</span>
          <FiChevronDown />
        </div>
        <div className="flex items-center gap-2">
          <span>Recent</span>
          <FiChevronDown />
        </div>
        <div className="flex items-center gap-2">
          <span>Starred</span>
          <FiChevronDown />
        </div>
        <div className="flex items-center gap-2">
          <span>Templates</span>
          <FiChevronDown />
        </div>
        <button className="create-btn">Create</button>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center bg-gray-700 p-2 rounded">
          <FiSearch className="text-lg" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent focus:outline-none ml-2"
          />
        </div>
        <FiBell className="text-xl" />
        <FiHelpCircle className="text-xl" />
        <div className="flex items-center gap-2">
          <FiMoon className="text-xl" />
          <FiSun className="text-xl" />
        </div>
        <FiUser className="text-xl" />
      </div>
    </div>
  );
};

export default Navbar;
