import React from "react";

const PatientContent = () => {
  const data = (
    <div className="p-6 border rounded-3xl bg-white text-center pr-10 ">
      <h2 className="text-md mb-2 text-left text-[#424242]">Reo George</h2>
      <p className="text-md mb-4 text-left text-[#424242]">
        I am incredibly grateful for the care
        <br /> I received at SP medifort. From the
        <br />
        moment I walked in, the staff was
        <br />
        attentive and compassionate....read
        <br />
        more{" "}
      </p>
      <div className="flex flex-row">
        <button className="bg-[#F6D6EC] text-primaryColor text-sm p-2 mr-8 rounded-md">
          Add to home
        </button>
        <span className="text-sm p-2 text-[#424242]">Reject</span>
      </div>
    </div>
  );

  return (
    <div className="w-full overflow-hidden h-screen">
      <div className="flex-1 h-full w-full pb-20 overflow-y-auto scrollbar-hidden">
        <div className="flex flex-col min-h-screen w-full pb-20 mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-3  w-full p-4  gap-8  ">
            <div className="w-full">{data}</div>
            <div className="w-full">{data}</div>
            <div className="w-full ">{data}</div>
            <div className="w-full ">{data}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientContent;
