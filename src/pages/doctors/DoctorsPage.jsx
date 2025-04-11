import React, { useEffect, useState } from "react";
import DoctorFilter from "../../components/doctors/DoctorFilter";
import DoctorsPhotos from "../../components/doctors/DoctorsPhotos";
import { doctor_admin_route } from "../../utils/Endpoint";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import PageHeaderpart from "../../components/common/PageHeaderpart";
import SearchInput from "../../components/common/SearchInput";

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
    } finally {
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


  const breadcrumbsItems = [
    { label: "Home", href: "/" },
    { label: "Doctor", href: "/doctors" },
  ];

  return (
    <div className="w-full">
      <header>
        <PageHeaderpart items={breadcrumbsItems} pageTitle="Our Doctors" >
          <div className="flex md:flex-row flex-col md:items-end gap-4 w-full items-start justify-start ">
            {/* Doctor Filter */}
            <DoctorFilter
              onAddDoctor={addNewDoctor}
              setDeptId={setDeptId}
              setSort={setSort}
            />
            {/* Search Input */}
            <SearchInput
              setSearch={setSearch}
            />
          </div>
        </PageHeaderpart>
      </header>

      <DoctorsPhotos data={doctors} loading={loading} />
    </div>
  );
};

export default DoctorHomePage;

