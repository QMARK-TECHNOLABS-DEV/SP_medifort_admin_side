import React, { useState } from 'react'
import PatientContentTopPart from '../../components/testimonialsPatientContent/PatientContentTopPart'
import PatientContent from '../../components/testimonialsPatientContent/PatientContent'
import PageHeaderpart from '../../components/common/PageHeaderpart'
import SearchInput from '../../components/common/SearchInput'


const TestimonialsPatientContentPage = () => {
   const [search, setSearch] = useState('')
    const [isEdit, setIsEdit] = useState(false);
  
    const breadcrumbsItems = [
      { label: "Testimonials", href: "/testimonials" },
      { label: isEdit ? "Edit Article" : "Patient", href: "/testimonials/patient" },
    ];
  return (
    <div className='mb-20 w-full'>

      {/* <PatientContentTopPart title={'Testimonials'}/> */}
      <header>
          <PageHeaderpart
            items={breadcrumbsItems}
            pageTitle={"Patient"}
          >
            <div className="flex md:flex-row flex-col md:items-end  gap-4 w-full items-start justify-start ">
              <SearchInput
                setSearch={setSearch}
              />

            </div>
          </PageHeaderpart>
        </header>
      <section>
        <PatientContent className='mb-20'/>
      </section>
    </div>
  )
}

export default TestimonialsPatientContentPage
