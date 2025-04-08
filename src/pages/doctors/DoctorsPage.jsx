import React, { useEffect, useState } from "react";
import TopPart from "../../components/doctors/TopPart";
import DoctorFilter from "../../components/doctors/DoctorFilter";
import DoctorsPhotos from "../../components/doctors/DoctorsPhotos";
import axios from "../../axios-folder/axios";
import { doc_in_dept_route, doctor_admin_route } from "../../utils/Endpoint";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import PageHeaderpart from "../../components/common/PageHeaderpart";
import { CiSearch } from "react-icons/ci";

const DoctorHomePage = () => {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState('')
  const [deptId, setDeptId] = useState('')
  const [sort, setSort] = useState('asc')
  const [loading, setLoading] = useState(true);
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
      setLoading(true); 
      const response = await axiosPrivate.get(`${doctor_admin_route}?search=${search}&deptId=${deptId}`)

      console.log(response.data);

      if (response?.status === 200) {
        let data = [...response.data.result];
        if (sort === 'asc') {
          data = data?.sort((a, b) => a.doctor_name.localeCompare(b.doctor_name))
        }
        else if (sort === 'desc') {
         data = data?.sort((a, b) => b.doctor_name.localeCompare(a.doctor_name))
        }
        setDoctors(data)
      }

    } catch (error) {
      console.log(error)
    }finally {
      setLoading(false); 
    }
  }

  useEffect(() => {
    getData();
  }, [search, deptId])

  useEffect(() => {
    let data = [...doctors]
    if (sort === 'asc') {
      data = data?.sort((a, b) => a.doctor_name.localeCompare(b.doctor_name))
    }
    else if (sort === 'desc') {
     data = data?.sort((a, b) => b.doctor_name.localeCompare(a.doctor_name))
    }
    setDoctors(data)
  }, [sort])

  console.log({sort})

  const breadcrumbsItems = [
    { label: "Home", href: "/" },
    { label: "Doctor", href: "/doctors" },
  ];

  return (
    <div className="w-full">
<header>
  <PageHeaderpart
    items={breadcrumbsItems}
    pageTitle="Doctor page"
    setSearch={setSearch}
  >
    <div className="flex flex-col  items-end D gap-4 w-full justify-end">
      {/* Search Input */}
      <div className="relative w-full lg:w-[300px]">
        <input
          type="text"
          name="search"
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg text-sm bg-lightGray p-3 px-5 pl-12 placeholder:text-[#475467] placeholder:font-[500] placeholder:text-xl focus:outline-none"
          placeholder="Search"
        />
        <CiSearch size={25} className="absolute top-2 left-4" />
      </div>

      {/* Doctor Filter */}
      <DoctorFilter
        onAddDoctor={addNewDoctor}
        setDeptId={setDeptId}
        setSort={setSort}
      />
    </div>
  </PageHeaderpart>
</header>



        {/* <TopPart title={"Doctor profile"} type={{ name: "search" }} setSearch={setSearch} /> */}
      {/* <DoctorFilter onAddDoctor={addNewDoctor} setDeptId={setDeptId} setSort={setSort} /> */}
      <DoctorsPhotos data={doctors} loading={loading} />
    </div>
  );
};

export default DoctorHomePage;

