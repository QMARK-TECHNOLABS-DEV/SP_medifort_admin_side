import React, { useEffect, useState } from 'react'
import DoctorsEditTop from '../../components/doctorsEdit/DoctorsEditTop'
import About from '../../components/doctorsEdit/About'
import DoctorEditContent from '../../components/doctorsEdit/DoctorEditContent'
import axios from '../../axios-folder/axios'
import { doc_in_dept_route, get_doc_to_consult } from '../../utils/Endpoint'
import { useParams } from 'react-router-dom'

const DoctorsEditPage = () => {
  const [data, setData] = useState({});
  const {id} = useParams()

  const getData = async()=>{
    try {
      const deptId = "";

      const response = await axios.post(doc_in_dept_route, {
         "doctor_list": { "department": deptId } 
      })

      console.log(response.data);

      if(response?.data?.status === 'success'){
        const totalData = response.data.data || [];
        const data = totalData?.find((item)=> item.doctor_id === id )
        console.log(data)
        setData(data)
      }

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
getData();
  },[])


  return (
    <div className='pb-20 w-full overflow-hidden relative' style={{ maxHeight: '100vh' }}>
      <div className='h-full w-full overflow-auto scrollbar-hide'>
        <DoctorsEditTop type={{ name: "search" }} data={data} />
        <section className='mt-10 w-full'>
          <DoctorEditContent data={data} />
        </section>
        <section>
          <About />
        </section>
      </div>
    </div>
  )
}

export default DoctorsEditPage
