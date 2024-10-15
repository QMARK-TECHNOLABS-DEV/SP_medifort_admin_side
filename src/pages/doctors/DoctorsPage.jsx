import React, { useEffect, useState } from "react";
import TopPart from "../../components/doctors/TopPart";
import DoctorFilter from "../../components/doctors/DoctorFilter";
import DoctorsPhotos from "../../components/doctors/DoctorsPhotos";
import axios from "../../axios-folder/axios";
import { doc_in_dept_route, doctor_admin_route } from "../../utils/Endpoint";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const DoctorHomePage = () => {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState('')
  const axiosPrivate = useAxiosPrivate()

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

  const getData = async () => {
    try {
      const response = await axiosPrivate.get(`${doctor_admin_route}?search=${search}`)

      console.log(response.data);

      if (response?.status === 200) {
        const data = response.data.result;
        setDoctors(data)
      }

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getData();
  }, [search])

  return (
    <div>
      <header>
        <TopPart title={"Doctor profile"} type={{ name: "search" }} setSearch={setSearch} />
      </header>
      <DoctorFilter onAddDoctor={addNewDoctor} />
      <DoctorsPhotos data={doctors} />
    </div>
  );
};

export default DoctorHomePage;

