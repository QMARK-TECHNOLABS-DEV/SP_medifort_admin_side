import React from "react";
import { FiEdit } from "react-icons/fi";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook
import '../../components/page.css';
import grayLogo from "../../assets/logo/gray_logo.png";
import avatar from "../../assets/logo/avatar.png";
import DoctorCardSkeleton from "./DoctorCardSkeleton";
import NoData from "../common/NoData";

const DoctorsPhotos = ({ data, loading }) => {
  const navigate = useNavigate(); // Initialize the navigate function

  const handleEditClick = (id) => {
    navigate(`/doctors/edit/${id}`); // Navigate to the edit page when the icon is clicked
  };

  if (data.length > 0) {
    return <NoData text={"No Data Available"} />
  }

  return (
    <div className="w-full overflow-hidden h-screen">
      <div className="flex-1 h-full pb-32 overflow-y-auto scrollbar-hidden">
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-6 lg:grid-cols-4 md:grid-cols-3 -mr-3 -ml-3 ">
          {loading
            ? Array.from({ length: 8 }).map((_, index) => (
              <DoctorCardSkeleton key={index} />
            ))
            : data.map((item, index) => (
              <div key={index} className="h-[300px] relative">
                <div className="h-full w-full relative flex items-end justify-center">
                  {/* Background Card */}
                  <div className="h-[300px] w-full bg-primaryColor rounded-[2rem] relative">
                    <img
                      className="w-auto h-[280px] absolute scale-x-[-1] top-0 right-0 opacity-40"
                      src={grayLogo}
                      alt="bg"
                    />
                  </div>

                  {/*  doctor image */}
                  <div
                    className="absolute w-full h-full"
                  >
                    <img
                      className="w-full h-full object-contain"
                      src={item?.image?.location || avatar}
                      alt={item.doctor_name}
                    />
                  </div>

                  {/* Edit Icon */}
                  <FiEdit
                    className="absolute top-4 right-4 w-8 h-8 bg-white text-primaryColor bg-opacity-90 p-2 rounded-full shadow-md cursor-pointer"
                    onClick={() => handleEditClick(item?.doctor_id)}
                  />

                  {/* Info Bar */}
                  <div className="absolute bottom-5 right-0 w-11/12 bg-primaryColor bg-opacity-55 backdrop-blur-sm rounded-l-full px-6 py-2 z-10 flex flex-col items-start text-white">
                    <h2 className="text-base font-medium leading-5">
                      {item.doctor_name}
                    </h2>
                    <h3 className="text-sm font-light leading-5">
                      {item.department_name}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorsPhotos;

