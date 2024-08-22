// import React from 'react';

// const About = () => {
//   return (
//     <div className="w-full h-screen overflow-hidden">
//       <div className="h-full overflow-y-auto p-4">
//         <div className="mb-8">
//           <h1 className="text-left mb-2">About</h1>
//           <p className="bg-[#B0BAC3] bg-opacity-40 p-6 rounded-lg text-justify text-sm">
//             Dr Cherian M Thomas is an experienced orthopaedic surgeon in Mumbai, with over<br />
//             32 years of experience overall. He specialises in hip and knee replacement surgeries,<br />
//             foot injury treatment, and lower extremity wound care. His extensive experience has<br />
//             made him one of the best orthopaedic surgeons in Mumbai.
//           </p>
//         </div>
//         <div>
//           <form className="flex flex-wrap gap-8">
//             <div className="flex flex-col w-full md:w-1/2">
//               <div className="mb-5">
//                 <label htmlFor="experience" className="block mb-2 text-sm font-medium text-left">
//                   Experience
//                 </label>
//                 <input
//                   type="text"
//                   id="experience"
//                   className="bg-[#B0BAC3] bg-opacity-40 w-full border border-gray-300 text-sm rounded-lg p-2.5"
//                   placeholder="32 years"
//                   required
//                 />
//               </div>
//               <div className="mb-5">
//                 <input
//                   type="text"
//                   id="qualification"
//                   className="bg-[#B0BAC3] bg-opacity-40 w-full border border-gray-300 text-sm rounded-lg p-2.5"
//                   placeholder="MBBS, MS (Gen. Surgery), FMAS"
//                   required
//                 />
//               </div>
//               <span className="text-left text-xs">+ Add expertise</span>
//             </div>
//             <div className="flex flex-col w-full md:w-1/2">
//               <div className="mb-5">
//                 <label htmlFor="expertise" className="block mb-2 text-sm font-medium text-left">
//                   Areas of expertise
//                 </label>
//                 <input
//                   type="text"
//                   id="expertise"
//                   className="bg-[#B0BAC3] bg-opacity-40 w-full border border-gray-300 text-sm rounded-lg p-2.5"
//                   placeholder="Hip and knee replacement surgeries"
//                   required
//                 />
//                 <span className="text-left text-xs">+ Add expertise</span>
//               </div>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default About;

import React from 'react';

const About = () => {
  return (
    <div className="w-full h-screen flex flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto p-4">
        <div className="mb-8">
          <h1 className="text-left mb-2">About</h1>
          <p className="bg-[#B0BAC3] bg-opacity-40 p-6 rounded-lg text-justify text-sm">
            Dr Cherian M Thomas is an experienced orthopaedic surgeon in Mumbai, with over<br />
            32 years of experience overall. He specialises in hip and knee replacement surgeries,<br />
            foot injury treatment, and lower extremity wound care. His extensive experience has<br />
            made him one of the best orthopaedic surgeons in Mumbai.
          </p>
        </div>
        <div>
          <form className="flex flex-wrap gap-8">
            <div className="flex flex-col w-full md:w-1/2">
              <div className="mb-5">
                <label htmlFor="experience" className="block mb-2 text-sm font-medium text-left">
                  Experience
                </label>
                <input
                  type="text"
                  id="experience"
                  className="bg-[#B0BAC3] bg-opacity-40 w-full border border-gray-300 text-sm rounded-lg p-2.5"
                  placeholder="32 years"
                  required
                />
              </div>
              <div className="mb-5">
                <input
                  type="text"
                  id="qualification"
                  className="bg-[#B0BAC3] bg-opacity-40 w-full border border-gray-300 text-sm rounded-lg p-2.5"
                  placeholder="MBBS, MS (Gen. Surgery), FMAS"
                  required
                />
              </div>
              <span className="text-left text-xs">+ Add expertise</span>
            </div>
            <div className="flex flex-col w-full md:w-1/2">
              <div className="mb-5">
                <label htmlFor="expertise" className="block mb-2 text-sm font-medium text-left">
                  Areas of expertise
                </label>
                <input
                  type="text"
                  id="expertise"
                  className="bg-[#B0BAC3] bg-opacity-40 w-full border border-gray-300 text-sm rounded-lg p-2.5"
                  placeholder="Hip and knee replacement surgeries"
                  required
                />
                <span className="text-left text-xs">+ Add expertise</span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default About;

