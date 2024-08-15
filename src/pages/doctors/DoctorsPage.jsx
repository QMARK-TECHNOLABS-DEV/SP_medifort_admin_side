import React from 'react'
import TopPart from '../../components/doctors/TopPart'
import DoctorFilter from '../../components/doctors/DoctorFilter'
import DoctorsPhotos from '../../components/doctors/DoctorsPhotos'


const DoctorsPage = () => {
  return (
    <div>
     <header>
        <TopPart title={"Doctor profile"} type={{ name: "search" }} />
      </header>
      <section>
        <DoctorFilter/>
      </section>
      <section className='mb-10'>
      <DoctorsPhotos/>
      </section>
    </div>
  )
}

export default DoctorsPage
