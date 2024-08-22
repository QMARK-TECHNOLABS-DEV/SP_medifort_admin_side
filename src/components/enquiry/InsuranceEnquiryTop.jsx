
import React,{useState} from 'react';
import { CiSearch } from "react-icons/ci";
import Breadcrumbs from '../common/Breadcrumbs';

const InsuranceEnquiryTop = ({ title, type, onSearchChange }) => {
  const [isEdit, setIsEdit] = useState(false);

  const breadcrumbsItems = [
    { label: "Enquiries", href: "/enquiry" },
    { label: isEdit ? "Edit Article" : "Insurance enquiry", href: "/enquiry/insurance" },
  ];

  return (
    <main className="flex flex-col lg:flex-row justify-between ">
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

export default InsuranceEnquiryTop;

