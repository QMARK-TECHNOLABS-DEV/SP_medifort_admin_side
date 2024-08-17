import React from 'react'
import PatientContentTopPart from '../../components/testimonialsPatientContent/PatientContentTopPart'
import PatientContent from '../../components/testimonialsPatientContent/PatientContent'

const TestimonialsPatientContentPage = () => {
  return (
    <div className='mb-20 w-full'>
      <PatientContentTopPart title={'Testimonials'}/>
      <section>
        <PatientContent className='mb-20'/>
      </section>
    </div>
  )
}

export default TestimonialsPatientContentPage
