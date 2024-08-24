import React from 'react'
import { Link } from 'react-router-dom';

const EnquiriesCards = () => {
    const galleryItems = [
        { id: 1, imageSrc: '/enquiries/enquiriescard1.png', title: 'Home care ', path:"/enquiry/homecare"},
        { id: 2, imageSrc: '/enquiries/enquiriescard2.png', title: 'Insurance', path:"/enquiry/insurance"},
        { id: 1, imageSrc: '/enquiries/enquiriescard3.png', title: 'Contact Us ', path:"/enquiry/contact-us"},
        { id: 2, imageSrc: '/enquiries/enquiriescard4.png', title: 'International Patient Enquiry', path:"/enquiry/international-patient-enquiry"}
      ];
      
  return (
    <div className=" w-full overflow-hidden h-screen pb-30">
      <div className="flex-1 h-full pb-32 overflow-y-auto">
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:grid-cols-3 mt-8">
      {galleryItems.map(item => (
        <Link to={item?.path} key={item.id} className="relative " >
          <img 
            src={item.imageSrc} 
            alt={item.title} 
            className="w-full h-auto rounded-3xl border pb-10 bg-white object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 text-left pl-6  flex flex-col justify-end p-2  ">
            <h3 className=" text-md text-[#424242] pl-3 pt-1 ">{item.title}</h3>
        </div>
        </Link>
      ))}
    </div>
    </div>
    </div>
  )
}

export default EnquiriesCards
