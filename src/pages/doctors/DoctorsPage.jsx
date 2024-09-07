import React, { useEffect, useState } from "react";
import TopPart from "../../components/doctors/TopPart";
import DoctorFilter from "../../components/doctors/DoctorFilter";
import DoctorsPhotos from "../../components/doctors/DoctorsPhotos";
import axios from "../../axios-folder/axios";
import { doc_in_dept_route } from "../../utils/Endpoint";

const DoctorHomePage = () => {
  const [doctors, setDoctors] = useState([]);

  const addNewDoctor = () => {
    const newDoctor = {
      id: doctors.length + 1,
      imageSrc: "/doctorEditimage.png",
      title: "MBBS, MD (General Medicine)",
      name: `Dr. New Doctor`,
      description: "Cardiology",
    };
    setDoctors([...doctors, newDoctor]);
  };

  const getData = async()=>{
    try {
      const deptId = "";

      const response = await axios.post(doc_in_dept_route, {
         "doctor_list": { "department": deptId } 
      })

      console.log(response.data);

      if(response?.data?.status === 'success'){
        const data = response.data.data;
        setDoctors(data)
      }

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
getData();
  },[])

  return (
    <div>
      <header>
         <TopPart title={"Doctor profile"} type={{ name: "search" }} />
      </header>
      <DoctorFilter onAddDoctor={addNewDoctor} />
      <DoctorsPhotos data={doctors} />
    </div>
  );
};

export default DoctorHomePage;

