import React, { useEffect, useState } from 'react'
import DoctorsEditTop from '../../components/doctorsEdit/DoctorsEditTop'
import About from '../../components/doctorsEdit/About'
import DoctorEditContent from '../../components/doctorsEdit/DoctorEditContent'
import axios from '../../axios-folder/axios'
import { doctor_admin_route } from '../../utils/Endpoint'
import { useParams } from 'react-router-dom'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import { useNavigate } from 'react-router-dom';

const DoctorsEditPage = () => {
  const [updateObj, setUpdateObj] = useState({})

  const { id } = useParams();
  const axiosPrivate = useAxiosPrivate();

  const getData = async () => {
    try {

      const response = await axiosPrivate.get(`${doctor_admin_route}/${id}`)

      console.log(response.data);

      if (response?.status === 200) {
        const data = response?.data?.result

        setUpdateObj({
          doctor_id: data?.doctor_id,
          doctor_name: data?.doctor_name,
          department_id: data?.department_id,
          department_name: data?.department_name,
          title: data?.title,
          qualification: data?.qualification,
          about: data?.about,
          experiences: data?.experiences || [''],
          areas_of_expertise: data?.areas_of_expertise || [''],
          opd_timings: data?.opd_timings,
          image: data?.image,
        })
      }

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getData();
  }, [])

  const navigate = useNavigate()


  const handleChange = (e) => {
    const { name, value } = e.target;

    setUpdateObj((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const submitHandler = async () => {
    try {
      const response = await axiosPrivate.put(`${doctor_admin_route}/${updateObj?.doctor_id}`, updateObj)
      if (response.status === 200) {
        navigate("/doctors")
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='pb-20 w-full overflow-hidden relative' style={{ maxHeight: '100vh' }}>
      <div className='h-full w-full overflow-auto scrollbar-hide'>
        <DoctorsEditTop type={{ name: "search" }} updateObj={updateObj} submitHandler={submitHandler} />
        <section className='mt-10 w-full'>
          <DoctorEditContent updateObj={updateObj} handleChange={handleChange} />
        </section>
        <section>
          <About updateObj={updateObj} setUpdateObj={setUpdateObj} handleChange={handleChange} />
        </section>
      </div>
    </div>
  )
}

export default DoctorsEditPage
