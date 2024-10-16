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
    <main className="flex flex-col lg:flex-row md:items-center justify-between p-3">
      <div className="flex flex-col lg:flex-row md:items-center md:justify-center 
      md:gap-6 min:flex-row xs:flex-row sm:flex-row">
        <div className="text-sm flex gap-6 flex-row">
          Department
          <div className="flex">
            <ul className="list-disc">
              <li className="text-sm text-black">

                <select
                  onChange={(e) => setDeptId(e.target.value)}
                  className="text-primaryColor bg-transparent focus:outline-none ">
                  <option value="">Select a Department</option>
                  {
                    departments?.map((item, index) => (
                      <option key={index} value={item?.dept_id}>{item?.dept_name}</option>
                    ))
                  }

                </select>

              </li>
            </ul>
          </div>
        </div>

        <div className="text-sm flex gap-6 flex-row">
          Sort
          <div className="flex">
            <ul className="list-disc">
              <li className="text-sm text-black">
                {/* <span className="text-primaryColor">Alphabetic(A-Z)</span> */}

                <select
                  onChange={(e) => setSort(e.target.value)}
                  className="text-primaryColor bg-transparent focus:outline-none ">
                  <option value="asc">Alphabetic(A-Z)</option>
                  <option value="desc">Alphabetic(Z-A)</option>

                </select>

              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* <div className="flex items-end justify-end">
        <button
          onClick={onAddDoctor}
          className="flex items-center border border-primaryColor justify-center gap-2 p-2  
          lg:w-fit rounded-lg sm:w-full xs:min-w-full min-w-full"
        >
          <FaPlus className="text-primaryColor text-xs" />
          <span className="text-sm text-primaryColor">Add a doctor</span>
        </button>
      </div> */}
    </main>
  );
};

export default DoctorFilter;

