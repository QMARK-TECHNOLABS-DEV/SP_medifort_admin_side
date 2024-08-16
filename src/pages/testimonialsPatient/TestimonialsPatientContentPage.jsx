import React from 'react'
import PatientContentTopPart from '../../components/testimonialsPatientContent/PatientContentTopPart'
import PatientContent from '../../components/testimonialsPatientContent/PatientContent'

const TestimonialsPatientContentPage = () => {
  return (
    <div className='mb-20 ml-12'>
      <PatientContentTopPart title={'Testimonials'}/>
      <section>
        <PatientContent className='mb-20'/>
      </section>
    </div>
  )
}

export default TestimonialsPatientContentPage
