import React, { useState } from "react";
import { getSpecialities, uploadSpecialities } from "../../utils/Endpoint";
import { toast } from "react-toastify";
import useAxiosPrivate from "../useAxiosPrivate";



const useSpecialities = () => {
    const [specialitiesItems, setSpecialitiesItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const axiosPrivateHook = useAxiosPrivate();
     // Fetch all Specialities
      const fetchSpecialities = async () => {
        setLoading(true);
        try {
          const response = await axiosPrivateHook.get(getSpecialities);
    
          if(response.status === 200){
            setSpecialitiesItems(response.data.specialities);
            console.log(response.data)
          }
        } catch (error) {
          setError(error);
          toast.error("Failed to fetch blog");
        } finally {
          setLoading(false);
        }
      };

        // Delete an Blog
        const deleteSpeciality = async (Id) => {
          setLoading(true)
          try {
              await axiosPrivateHook.delete(`${uploadSpecialities}/${Id}`);
              toast.success('Speciality deleted successfully')
              fetchSpecialities();
          } catch (error) {
              
          }
        }
  return{
    specialitiesItems,
fetchSpecialities,
deleteSpeciality,
loading,
error
  }
}

export default useSpecialities
