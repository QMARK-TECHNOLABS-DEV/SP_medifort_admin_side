import React,{useState} from 'react'
import { MdChevronRight } from "react-icons/md";
import Breadcrumbs from '../common/Breadcrumbs';

const PatientContentTopPart = () => {

  const [isEdit, setIsEdit] = useState(false);

  const breadcrumbsItems = [
    { label: "Testimonials", href: "/testimonials" },
    { label: isEdit ? "Edit Article" : "Paitient", href: "/testimonials/patient" },
  ];

  return (
    <main className="flex flex-col lg:flex-row justify-between ">
      <Breadcrumbs items={breadcrumbsItems} />
    </main>
  )
}

export default PatientContentTopPart
