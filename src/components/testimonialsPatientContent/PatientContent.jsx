import React, { useEffect, useState } from "react";
import '../../components/page.css'
import PatientTCard from "./PatientTCard";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { testimonialAdminRoute } from "../../utils/Endpoint";

const PatientContent = () => {
  const [testimonials, setTestimonials] = useState([]);
  const axiosPrivateHook = useAxiosPrivate();

  const getTestimonials = async () => {
    try {
      const res = await axiosPrivateHook.get(`${testimonialAdminRoute}?kind=text`)

      if (res.status === 200) {
        setTestimonials(res.data.result)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getTestimonials()
  }, [])

  return (
    <div className="w-full overflow-hidden h-screen">
      <div className="flex-1 h-full w-full pb-20 overflow-y-auto scrollbar-hidden">
        <div className="flex flex-col min-h-screen w-full pb-20 mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2  w-full mt-5  gap-6  ">
            {
              testimonials?.map((item, index) => (
                <PatientTCard key={index} data={item} />

              ))
            }


          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientContent;
