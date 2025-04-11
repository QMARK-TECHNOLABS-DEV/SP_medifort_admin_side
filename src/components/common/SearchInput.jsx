import React from "react";
import { CiSearch } from "react-icons/ci";

const SearchInput = ({ setSearch }) => {
  return (
    <div className="relative w-full lg:w-[300px]">
      <input
        type="text"
        name="search"
        onChange={(e) => setSearch(e.target.value)}
        className="w-full rounded-lg text-sm bg-lightGray p-2.5 pl-12 placeholder:text-[#888e97] placeholder:font-[500] placeholder:text-sm focus:outline-none"
        placeholder="Search"
      />
      <CiSearch size={25} className="absolute top-2 left-4" />
    </div>
  );
};

export default SearchInput;
