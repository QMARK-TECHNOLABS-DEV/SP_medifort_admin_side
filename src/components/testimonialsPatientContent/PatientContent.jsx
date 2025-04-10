import React, { useEffect, useState } from "react";
import '../../components/page.css'
import PatientTCard from "./PatientTCard";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { testimonialAdminRoute } from "../../utils/Endpoint";
import LoadingScreen from "../common/LoadingScreen";

const PatientContent = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
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
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [])

  if (loading) return(
    <div className="h-screen w-full overflow-hidden">

      <LoadingScreen/>
    </div>
  ) 
  return (
    <div className="w-full overflow-hidden h-screen">
      <div className="flex-1 h-full w-full pb-80 overflow-y-auto scrollbar-hidden">
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
