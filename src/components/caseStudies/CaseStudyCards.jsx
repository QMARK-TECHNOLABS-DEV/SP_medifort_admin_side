import React from 'react';
import { FiEdit } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import '../../components/page.css';

const CaseStudyCards = ({ caseStudies, onEdit, onDelete }) => {
  return (
    <div className="w-full h-screen overflow-hidden">
      <div className="flex-1 h-full w-full overflow-y-auto scrollbar-hidden">
        <div className="flex flex-col min-h-screen w-full mt-2 mb-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 -ml-4 -mr-4 px-4 lg:px-2">
            {caseStudies.map((study, index) => (
              <div key={index} className="p-6 border rounded-3xl bg-white">
                <p className="text-lg mb-2 text-left">
                  {study.title}
                </p>
                <span className='text-left text-lg text-[#424242]'>
                  {study.author} {study.date}
                </span>
                <div className="flex flex-row pt-2 gap-2">
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
