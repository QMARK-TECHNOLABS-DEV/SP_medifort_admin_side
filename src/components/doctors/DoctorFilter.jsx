import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { department_admin_route } from "../../utils/Endpoint";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const DoctorFilter = ({ onAddDoctor, setDeptId, setSort }) => {
  const axiosPrivate = useAxiosPrivate()
  const [departments, setDepartments] = useState([])

  const getData = async () => {
    try {
      const response = await axiosPrivate.get(department_admin_route)
      if (response?.status === 200) {
        const depts = response?.data?.result
        setDepartments(depts)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getData()
  }, [])


  return (
    <main className="flex flex-row justify-center items-center lg:gap-6 gap-2">
      {/* Department Dropdown */}
      <div className="flex flex-col gap-1 w-full md:w-[200px]">
        {/* <label className="text-xs text-gray-500 pl-1">Department</label> */}
        <select
          onChange={(e) => setDeptId(e.target.value)}
          className="border-2 border-gray-300 rounded-md px-4 text-gray-500 py-2 bg-white text-sm w-full focus:outline-none"
        >
          <option value="">Select Department</option>
          {departments?.map((item, index) => (
            <option key={index} value={item?.dept_id} className="capitalize">
              {item?.dept_name}
            </option>
          ))}
        </select>
      </div>

      {/* Sort Dropdown */}
      <div className="flex flex-col gap-1 w-full md:w-[200px]">
        {/* <label className="text-xs text-gray-500 pl-1">Sort</label> */}
        <select
          onChange={(e) => setSort(e.target.value)}
          className="border-2 border-gray-300 rounded-md px-4 py-2 bg-white text-sm text-gray-500 w-full focus:outline-none"
        >
          <option value="asc">Alphabetic (A-Z)</option>
          <option value="desc">Alphabetic (Z-A)</option>
        </select>
      </div>

    </main>
  );
};

export default DoctorFilter;

