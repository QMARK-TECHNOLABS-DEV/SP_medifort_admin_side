import React from 'react'
import DoctorsEditTop from '../../components/doctorsEdit/DoctorsEditTop'
import About from '../../components/doctorsEdit/About'
import DoctorEditContent from '../../components/doctorsEdit/DoctorEditContent'

const DoctorsEditPage = () => {
  return (
    <div className='ml-10 pb-20'>
        <DoctorsEditTop title={"Doctor profile"} type={{ name: "search" }}/>
      <section className='mt-10'>
        <DoctorEditContent/>
      </section>
      <section>
        <About/>
      </section>
    </div>
  )
}

export default DoctorsEditPage
