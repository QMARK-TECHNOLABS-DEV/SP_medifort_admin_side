import React from "react";
import { FiEdit } from "react-icons/fi";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook
import '../../components/page.css';
import DoctorCardSkeleton from "./DoctorCardSkeleton";

const DoctorsPhotos = ({ data,loading }) => {
  const navigate = useNavigate(); // Initialize the navigate function

  const handleEditClick = (id) => {
    navigate(`/doctors/edit/${id}`); // Navigate to the edit page when the icon is clicked
  };

  return (
    <div className="w-full overflow-hidden h-screen">
    <div className="flex-1 h-full pb-32 overflow-y-auto scrollbar-hidden">
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-6 md:grid-cols-3 -mr-3 -ml-3 pb-60">
        {loading
          ? Array.from({ length: 6 }).map((_, index) => (
              <DoctorCardSkeleton key={index} />
            ))
          : data.map((item, index) => (
              <div key={index} className="relative">
                {item?.image?.location ? (
                  <img
                    src={item.image.location}
                    alt={item.image.location}
                    className="w-full h-[350px] rounded-3xl border pb-28 bg-white p-8 object-contain"
                  />
                ) : (
                  <img
                    src={"/avatar.png"}
                    alt={item.doctor_name}
                    className="w-full h-[350px] rounded-3xl border pb-28 bg-white p-8 object-contain"
                  />
                )}
                <FiEdit
                  className="absolute top-12 right-12 w-8 bg-[#FFFFFF] text-primaryColor bg-opacity-90 p-2 rounded-full shadow-lg cursor-pointer"
                  size={35}
                  onClick={() => handleEditClick(item?.doctor_id)}
                />
                <div className="absolute inset-x-0 bottom-0 text-left pl-6 flex flex-col justify-end p-2">
                  <h3 className="text-customRed text-xs pl-3 pb-2">
                    {item?.department_name}
                  </h3>
                  <h2 className="text-primaryColor text-md pl-3 pb-2">
                    {item?.doctor_name}
                  </h2>
                  <p className="text-lg pl-3 pb-2">{item?.location}</p>
                </div>
              </div>
            ))}
      </div>
    </div>
  </div>
  );
};

export default DoctorsPhotos;

