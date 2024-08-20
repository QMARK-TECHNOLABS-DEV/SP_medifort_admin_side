
import React from 'react';
import { FiEdit } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import '../../components/page.css'

const CaseStudyCards = ({ caseStudies, onEdit, onDelete }) => {
  return (
    <div className="w-full overflow-hidden h-screen">
      <div className="flex-1 h-full w-full pb-20 overflow-y-auto scrollbar-hidden">
        <div className="flex flex-col min-h-screen w-full pb-20 mt-4 mb-40">
          <div className="grid grid-cols-1 sm:grid-cols-2 pr-20 w-full p-4 gap-6">
            {caseStudies.map((study, index) => (
              <div key={index} className="p-6 border rounded-3xl bg-white pr-16 pl-10">
                <p className="text-lg mb-2 text-left">
                  {study.title}
                </p>
                <span className='text-left pr-32  text-lg text-[#424242]'>
                  {study.author} {study.date}
                </span>
                <div className="flex flex-row mr-auto pr-42 pt-2 gap-2">
                  <FiEdit
                    className='w-8 h-8 text-[#424242] rounded-full border p-1.5 cursor-pointer'
                    onClick={() => onEdit(index)}
                  />
                  <RiDeleteBinLine
                    className='w-8 h-8 text-[#424242] rounded-full border p-1.5 cursor-pointer'
                    onClick={() => onDelete(index)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseStudyCards;

