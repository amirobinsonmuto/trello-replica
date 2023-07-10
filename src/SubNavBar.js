import React from "react";
import {
  RiStarLine,
  RiLockLine,
  RiBarChart2Line,
  RiArrowDownSLine,
} from "react-icons/ri";
import {
  IoRocketOutline,
  IoFlashOutline,
  IoFilterOutline,
  IoPersonOutline,
  IoAddCircleOutline,
  IoEllipsisVerticalOutline,
} from "react-icons/io5";

const SubNavBar = () => {
  return (
    <div className="flex items-center justify-between bg-gray-900 bg-opacity-20 text-white px-4 py-2">
      <div className="flex items-center">
        <span className="mr-2 text-lg font-semibold">Sample Board</span>
        <RiStarLine className="text-white" />
        <button className="flex items-center ml-2">
          <RiLockLine className="text-white" />
          <span className="ml-1">Private</span>
        </button>
        <button className="flex items-center ml-2">
          <RiBarChart2Line className="text-white" />
          <span className="ml-1">Board</span>
          <RiArrowDownSLine className="text-white" />
        </button>
      </div>
      <div className="flex items-center">
        <button className="flex items-center mr-2">
          <IoRocketOutline className="text-white" />
          <span className="ml-1">Power-Ups</span>
        </button>
        <button className="flex items-center mr-2">
          <IoFlashOutline className="text-white" />
          <span className="ml-1">Automation</span>
        </button>
        <button className="flex items-center mr-2">
          <IoFilterOutline className="text-white" />
          <span className="ml-1">Filter</span>
        </button>
        <div className="h-6 bg-white bg-opacity-30 mx-4"></div>
        <button className="flex items-center mr-2">
          <IoPersonOutline className="text-white" />
        </button>
        <button className="flex items-center mr-2">
          <IoPersonOutline className="text-white" />
        </button>
        <button className="flex items-center mr-2">
          <IoAddCircleOutline className="text-white" />
          <span className="ml-1">Share</span>
        </button>
        <IoEllipsisVerticalOutline className="text-white" />
      </div>
    </div>
  );
};

export default SubNavBar;
