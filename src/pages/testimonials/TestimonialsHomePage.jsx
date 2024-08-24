import React from 'react'
import TopPartTestimonial from '../../components/testimonials/TopPartTestimonial'
import TestimonialsContent from '../../components/testimonials/TestimonialsContent'

const TestimonialsHomePage = () => {
  return (
    <div>
      <TopPartTestimonial title={'Testimonials'}/>
      <section className='mt-10'>
        <TestimonialsContent/>
      </section>
    </div>
  )
}

export default TestimonialsHomePage
