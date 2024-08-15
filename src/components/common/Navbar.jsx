import React from "react";
import { IoIosSearch } from "react-icons/io";
import { MdMenu } from "react-icons/md";
import { CgMenuGridR } from "react-icons/cg";

const Navbar = () => {
  return (
    <main className="max-w-screen-2xl mx-auto p-3 lg:p-5 flex items-center justify-between">
      {/* logo side */}
      <div className="flex items-center gap-2">
        <img
          src={require("../../assets/nav/logoNav.png")}
          alt="Logo"
          className="w-10"
        />
        <h1 className="font-[500] text-2xl object-contain">SP Medifort Admin</h1>
      </div>

      {/*Profile and search option  */}
      <div className="flex items-center gap-5">
        <IoIosSearch size={28} />
        <CgMenuGridR size={28} />
        <div>
          <img
            src={require("../../assets/nav/bumy1.png")}
            alt="profile"
            className="rounded-full w-10 h-10"
          />
        </div>
      </div>
    </main>
  );
};

export default Navbar;
