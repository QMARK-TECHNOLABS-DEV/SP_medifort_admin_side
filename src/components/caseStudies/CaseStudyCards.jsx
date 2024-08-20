import React from 'react'
import { FiEdit } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";

const CaseStudyCards = () => {
    const data1 = (
        <div className="p-6 border rounded-3xl bg-white pr-16 pl-10  ">
          <p className="text-lg mb-2  text-justify ">
          Nourishing Recovery Amidst Medical<br/> Challenges
          </p>
          <span className='text-left pr-32 text-lg  text-[#424242]'>Reo George 03/01/24</span>
          <div className="flex flex-row mr-auto pr-42  pt-2 gap-2">
          <FiEdit className='w-8 h-8  text-[#424242] rounded-full border p-1.5'/>
          <RiDeleteBinLine className='w-8 h-8 text-[#424242] rounded-full border p-1.5' />
          </div>
        </div>
      );
      const data2 = (
        <div className="p-6 border rounded-3xl bg-white pr-16 pl-10   ">
          <p className="text-lg mb-2 text-justify  ">
          Innovative Solutions for Sustainable<br/> Living
          </p>
          <span className='text-left text-lg pr-32  text-[#424242]'>Alice Smith 03/15/24</span>
          <div className="flex flex-row text-left justify-start  pt-2 gap-2">
          <FiEdit className='w-8 h-8  text-[#424242] rounded-full border p-1.5'/>
          <RiDeleteBinLine className='w-8 h-8 text-[#424242] rounded-full border p-1.5' />
          </div>
        </div>
      );
      const data3 = (
        <div className="p-6 border rounded-3xl bg-white pr-16 pl-10   ">
          <p className="text-lg mb-2 text-justify  ">
          Empowering Communities Through<br/> Technology
          </p>
          <span className='text-left pr-32 text-lg text-[#424242]'>Sam Patel 03/29/24</span>
          <div className="flex flex-row text-left justify-start  pt-2 gap-2">
          <FiEdit className='w-8 h-8  text-[#424242] rounded-full border p-1.5'/>
          <RiDeleteBinLine className='w-8 h-8 text-[#424242] rounded-full border p-1.5' />
          </div>
        </div>
      );
    
      return (
        <div className="w-full overflow-hidden h-screen ">
      <div className="flex-1 h-full w-full pb-20 overflow-y-auto scrollbar-hidden">
        <div className="flex flex-col min-h-screen w-full pb-20 mt-4 mb-40">
          <div className="grid grid-cols-1 sm:grid-cols-2 pr-20 w-full p-4  gap-6  ">
                
                <div className="w-full">{data1}</div>
                <div className="w-full">{data1}</div>
                <div className="w-full">{data2}</div>
                <div className="w-full">{data2}</div>
                <div className="w-full">{data3}</div>
                <div className="w-full">{data3}</div>
        
          </div>
        </div>
        </div>
        </div>
    
      );
    };

export default CaseStudyCards
