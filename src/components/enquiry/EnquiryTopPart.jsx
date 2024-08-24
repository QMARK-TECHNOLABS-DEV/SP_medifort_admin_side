import React from "react";

const EnquiryTopPart = ({ title }) => {
  return (
    <main className="flex flex-col lg:flex-row justify-between lg:items-center ">
      <h1 className="text-2xl md:text-4xl text-[#424242] md:font-[350] mb-3 text-left lg:mb-0 ">
        {title}
      </h1>
    </main>
  );
};

export default EnquiryTopPart;
