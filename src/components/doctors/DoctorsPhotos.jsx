import React from 'react'
import { FiEdit } from "react-icons/fi";

const DoctorsPhotos = () => {
    const galleryItems = [
        { id: 1, imageSrc: '/doctorEditimage.png', title: 'MBBS, MS (Gen. Surgery), FMAS', name: 'Dr.Cherian M Thomas', description: 'Orthopaedic' },
        { id: 2, imageSrc: '/doctorEditimage.png', title: 'MBBS, MS (Gen. Surgery), FMAS', name: 'Dr.Cherian M Thomas', description: 'Orthopaedic' },
        { id: 3, imageSrc: '/doctorEditimage.png', title: 'MBBS, MS (Gen. Surgery), FMAS', name: 'Dr.Cherian M Thomas', description: 'Orthopaedic' },
        { id: 4, imageSrc: '/doctorEditimage.png', title: 'MBBS, MS (Gen. Surgery), FMAS', name: 'Dr.Cherian M Thomas', description: 'Orthopaedic' },
        { id: 5, imageSrc: '/doctorEditimage.png', title: 'MBBS, MS (Gen. Surgery), FMAS', name: 'Dr.Cherian M Thomas', description: 'Orthopaedic' },
        { id: 6, imageSrc: '/doctorEditimage.png', title: 'MBBS, MS (Gen. Surgery), FMAS', name: 'Dr.Cherian M Thomas', description: 'Orthopaedic' },
        
      ];
      
  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 rounded-lg border border-gray gap-6 md:grid-cols-3">
      {galleryItems.map(item => (
        <div key={item.id} className="relative " >
          <img 
            src={item.imageSrc} 
            alt={item.title} 
            className="w-full h-auto rounded-3xl border pb-20 bg-white p-8 object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 text-left pl-6  flex flex-col justify-end p-2  ">
            <FiEdit className='absolute inset-0 bg-white w-8  rounded-full p-1.5  mr-2 flex items-center float-right text-primaryColor' size={30} />
            <h3 className="text-customRed text-xs pl-3 pt-1 ">{item.title}</h3>
            <h2 className="text-primaryColor text-xs pl-3 pt-1 ">{item.name}</h2>
            <p className=" text-lg pl-3 pb-2">{item.description}</p>
        </div>
        </div>
      ))}
    </div>
  )
}

export default DoctorsPhotos