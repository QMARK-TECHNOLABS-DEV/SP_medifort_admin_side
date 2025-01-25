import { useState, useEffect } from 'react';

import useAxiosPrivate from '../useAxiosPrivate';
import { doctorsRoute } from '../../utils/Endpoint';

const useGetAllDoctors = (doctorId = null) => {
  // State to hold the doctors' data
  const [doctors, setDoctors] = useState([]);
  // State to handle loading state
  const [loading, setLoading] = useState(true);
  // State to handle any errors
  const [error, setError] = useState(null);
  const axiosPrivateHook = useAxiosPrivate();

  const getDoctors = async () => {
    setLoading(true);
    try {
      let res;
      if (doctorId) {
        // Fetch specific doctor by ID
        res = await axiosPrivateHook.get(`${doctorsRoute}/${doctorId}`);
      } else {
        // Fetch all doctors
        res = await axiosPrivateHook.get(doctorsRoute);
      }

      if (res.status === 200) {
        const result = doctorId ? res.data?.result : res.data?.result || [];
        setDoctors(result);
        console.log(result);
      }
    } catch (error) {
      console.log(error);
      setError(error);  // Store the error to show if needed
    } finally {
      setLoading(false);  // Set loading to false once the request is completed
    }
  };

  // useEffect to fetch data when any of the dependencies change
  useEffect(() => {
    getDoctors();
  }, [doctorId]);

  return { doctors, loading, error };
};

export default useGetAllDoctors;
