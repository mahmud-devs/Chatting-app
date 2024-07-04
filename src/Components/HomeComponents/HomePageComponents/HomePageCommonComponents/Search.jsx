import React from "react";
import { FaSearch } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
const Search = ({ className }) => {
  return (
    <>
      <div className={`relative ${className}`}>
        <input
          type="text"
          placeholder="Search"
          id="Search"
          name="Search"
          className={`w-[100%] rounded-2xl   py-4 ps-20 font-popin text-[16px] font-medium shadow-lg`}
        />
        <FaSearch className="absolute left-[23px] top-[50%] -translate-y-[50%] text-[20px]" />
        <BsThreeDotsVertical className="absolute right-[17px] top-[50%] -translate-y-[50%] text-[25px] text-btnColor" />
      </div>
    </>
  );
};

export default Search;
