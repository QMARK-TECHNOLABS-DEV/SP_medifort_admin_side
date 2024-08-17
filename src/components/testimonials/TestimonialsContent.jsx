import React from 'react'

const TestimonialsContent = () => {
    const galleryItems = [
        { id: 1, imageSrc: '/testiimage1.png', title: 'Paitient '},
        { id: 2, imageSrc: '/testiimage2.png', title: 'Video'}
        
      ];
      
  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4 md:grid-cols-3">
      {galleryItems.map(item => (
        <div key={item.id} className="relative " >
          <img 
            src={item.imageSrc} 
            alt={item.title} 
            className="w-full h-auto rounded-3xl border pb-10 bg-white object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 text-left pl-6  flex flex-col justify-end p-2  ">
            <h3 className=" text-md text-[#424242] pl-3 pt-1 ">{item.title}</h3>
        </div>
        </div>
      ))}
    </div>
  )
}

export default TestimonialsContent
