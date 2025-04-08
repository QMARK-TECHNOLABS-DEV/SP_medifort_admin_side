import React, { useEffect, useState } from 'react'
import useAxiosPrivate from '../useAxiosPrivate';
import { departmentsRoute } from '../../utils/Endpoint';

const useGetAllDepartment = () => {
      const [department, setDepartment] = useState([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);
      const axiosPrivateHook = useAxiosPrivate();
      const getDepartment = async () => {
        setLoading(true)
        try {
            const res = await axiosPrivateHook.get(departmentsRoute);
            if (res.status === 200) {
                const result =  res.data?.result || [];
                setDepartment(result);
                console.log(result);
              }
        } catch (error) {
            console.log(error);
            setError(error); 
        }finally {
            setLoading(false);  // Set loading to false once the request is completed
          }
      }
        useEffect(() => {
            getDepartment();
        }, []);
  return {department ,loading ,error}
}

export default useGetAllDepartment
