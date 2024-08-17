import React from 'react'

const EnquiryTopPart = ({title}) => {
  return (
    <main className="flex flex-col lg:flex-row justify-between lg:items-center md:my-4 my-2 p-3">
      <h1 className=" text-xl sm:text-2xl md:text-3xl lg:text-4xl text-[#424242] font-semibold md:font-medium mb-3 lg:mb-0 ">
      {title}
      </h1>
        
    </main>
  )
}

export default EnquiryTopPart
