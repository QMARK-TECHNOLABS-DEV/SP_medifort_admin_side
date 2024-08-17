import React from "react";
import { FiEdit } from "react-icons/fi";

const DoctorsPhotos = () => {
  const galleryItems = [
    {
      id: 1,
      imageSrc: "/doctorEditimage.png",
      title: "MBBS, MS (Gen. Surgery), FMAS",
      name: "Dr.Cherian M Thomas",
      description: "Orthopaedic",
    },
    {
      id: 2,
      imageSrc: "/doctorEditimage.png",
      title: "MBBS, MS (Gen. Surgery), FMAS",
      name: "Dr.Cherian M Thomas",
      description: "Orthopaedic",
    },
    {
      id: 3,
      imageSrc: "/doctorEditimage.png",
      title: "MBBS, MS (Gen. Surgery), FMAS",
      name: "Dr.Cherian M Thomas",
      description: "Orthopaedic",
    },
    {
      id: 4,
      imageSrc: "/doctorEditimage.png",
      title: "MBBS, MS (Gen. Surgery), FMAS",
      name: "Dr.Cherian M Thomas",
      description: "Orthopaedic",
    },
    {
      id: 5,
      imageSrc: "/doctorEditimage.png",
      title: "MBBS, MS (Gen. Surgery), FMAS",
      name: "Dr.Cherian M Thomas",
      description: "Orthopaedic",
    },
    {
      id: 6,
      imageSrc: "/doctorEditimage.png",
      title: "MBBS, MS (Gen. Surgery), FMAS",
      name: "Dr.Cherian M Thomas",
      description: "Orthopaedic",
    },
  ];

  return (
    <div className=" w-full overflow-hidden h-screen">
      <div className="flex-1 h-full pb-32 overflow-y-auto">
        <div className="p-4 grid grid-cols-1  sm:grid-cols-2  gap-6 md:grid-cols-3 pb-60">
          {galleryItems.map((item) => (
            <div key={item.id} className="relative ">
              <img
                src={item.imageSrc}
                alt={item.title}
                className="w-full h-auto rounded-3xl border pb-28 bg-white p-8 object-cover "
              />
              <FiEdit
                className="absolute top-12 right-12 w-8  bg-[#FFFFFF] text-primaryColor bg-opacity-90 p-2 rounded-full text-sm flex items-center mr-2"
                size={35}
              />
              <div className="absolute inset-x-0 bottom-0 text-left pl-6  flex flex-col justify-end p-2  ">
                <h3 className="text-customRed text-xs pl-3  pb-2 ">
                  {item.title}
                </h3>
                <h2 className="text-primaryColor text-md pl-3  pb-2 ">
                  {item.name}
                </h2>
                <p className=" text-lg pl-3 pb-2">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorsPhotos;
