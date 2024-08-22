import React,{useState} from 'react'
import { MdChevronRight } from "react-icons/md";
import Breadcrumbs from '../common/Breadcrumbs';

const DoctorsEditTop = ({title}) => {

  const [isEdit, setIsEdit] = useState(false);

  const breadcrumbsItems = [
    { label: "Doctor profile", href: "/doctors" },
    { label: isEdit ? "Edit Article" : "Dr.Cherian M Thomas", href: "/doctors/doctor-edit" },
  ];

  return (
    <main className="flex flex-col lg:flex-row justify-between  p-3 min:flex-col ">
      <Breadcrumbs items={breadcrumbsItems} />
      <div className="flex items-center ml-auto min:items-center"> {/* ml-auto pushes the content to the right end */}
        <button className="flex items-center border border-primaryColor mr-8 p-2 w-full rounded-lg min:w-full">
          <span className="text-sm text-primaryColor">Save and submit</span>
        </button>
        <span className='text-gray-700'>Delete</span>
      </div>
    </main>
  )
}

export default DoctorsEditTop
