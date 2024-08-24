
import React,{useState} from 'react';
import { CiSearch } from "react-icons/ci";
import Breadcrumbs from '../common/Breadcrumbs';

const InternationalPatientEnquiryTop = ({ title, type, onSearchChange }) => {
  const [isEdit, setIsEdit] = useState(false);

  const breadcrumbsItems = [
    { label: "Enquiries", href: "/enquiry" },
    { label: isEdit ? "Edit Article" : "International patient enquiry", href: "/enquiry/international-patient-enquiry" },
  ];

  return (
    <main className="flex flex-col lg:flex-row justify-between my-2 p-3">
      <h1 className="flex text-2xl font-bold text-primaryColor mt-[-15px] lg:hidden">
          International Patient Enquiry
        </h1>
       
      <Breadcrumbs items={breadcrumbsItems} />
      <div className="relative flex items-end justify-end">
        <input
          type="text"
          className="w-full rounded-lg text-sm bg-lightGray p-3 px-5 ps-12 placeholder:text-[#475467]
            placeholder:font-[500] placeholder:text-xl focus:outline-none min-w-full sm:min-w-[60px]"
          placeholder="Search"
          onChange={onSearchChange}  // Handle search input changes
        />
        <CiSearch size={30} className="absolute mt-1 pt-1 mb-2 left-3" />
      </div>
    </main>
  );
}

export default InternationalPatientEnquiryTop;

