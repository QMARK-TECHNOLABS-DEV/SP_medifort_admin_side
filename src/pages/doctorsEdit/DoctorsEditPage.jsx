import React from 'react'
import DoctorsEditTop from '../../components/doctorsEdit/DoctorsEditTop'
import About from '../../components/doctorsEdit/About'
import DoctorEditContent from '../../components/doctorsEdit/DoctorEditContent'

const DoctorsEditPage = () => {
  return (
    <div className='pb-20 w-full'>
        <DoctorsEditTop title={"Doctor profile"} type={{ name: "search" }}/>
      <section className='mt-10 w-full'>
        <DoctorEditContent/>
      </section>
      <section>
        <About/>
      </section>
    </div>
  )
}

export default DoctorsEditPage
