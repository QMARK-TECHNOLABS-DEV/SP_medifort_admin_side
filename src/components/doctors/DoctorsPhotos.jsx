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

  if (data.length < 0) {
    return <NoData text={"No Data Available"} />
  }

  return (
    <div className="w-full h-screen overflow-hidden">
      <div className="flex-1 h-full overflow-y-auto scrollbar-hidden pb-[90%] md:pb-[40%] lg:pb-[25%]">
        <div className="p-4 grid grid-cols-2 sm:grid-cols-2 gap-6 lg:grid-cols-4 md:grid-cols-3 -mr-3 -ml-3 ">
          {loading
            ? Array.from({ length: 8 }).map((_, index) => (
              <DoctorCardSkeleton key={index} />
            ))
            : data.map((item, index) => (
              <div key={index} className="h-[150px] md:h-[300px] overflow-hidden">
                <div className="h-full w-full relative flex items-end justify-center bg-primaryColor rounded md:rounded-[1rem] overflow-hidden">
                  {/* Background Card */}
                  <div className="h-full md:h-[300px] w-full bg-primaryColor rounded md:rounded-[1rem] relative">
                    <img
                      className="w-auto h-[280px] absolute scale-x-[-1] top-0 right-0 opacity-40"
                      src={grayLogo}
                      alt="bg"
                    />
                  </div>

                  {/*  doctor image */}
                  <div className="absolute w-full h-full bottom-0" >
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
                  <div className="absolute bottom-1 md:bottom-5 right-0 w-full md:w-11/12 bg-primaryColor bg-opacity-55 backdrop-blur-sm md:rounded-l-full p-1 px-2 md:px-6 md:py-2 z-10 flex flex-col items-start text-white">
                    <h2 className="text-[11px] md:text-base truncate font-medium md:leading-5">
                      {item.doctor_name}
                    </h2>
                    <h3 className="text-[10px] truncate md:text-sm font-light leading-5">
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

