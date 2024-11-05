import React,{useState} from 'react'
import { MdChevronRight } from "react-icons/md";
import Breadcrumbs from '../common/Breadcrumbs';

const PatientContentTopPart = () => {

  const [isEdit, setIsEdit] = useState(false);

  const breadcrumbsItems = [
    { label: "Testimonials", href: "/testimonials" },
    { label: isEdit ? "Edit Article" : "Patient", href: "/testimonials/patient" },
  ];

  return (
    
    <main className="flex flex-col lg:flex-row justify-between ">
       <h1 className="text-2xl font-bold text-primaryColor lg:hidden mt-[-10px] sm:mt-[-20px] text-left -ml:1">
        Patient
      </h1>
      <Breadcrumbs items={breadcrumbsItems} />
    </main>
  )
}

export default PatientContentTopPart
