import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { getResearch, uploadResearch } from '../../utils/Endpoint';
import useAxiosPrivate from '../useAxiosPrivate';

const useResearch = () => {
    const [researchItems ,setResearchItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const axiosPrivateHook = useAxiosPrivate();
    

    const fetchResearch = async ()=>{
        setLoading(true);
        try {
            const response = await axiosPrivateHook.get(getResearch);
            console.log("Fetched :", response.data); // Log the fetched data
            setResearchItems(response.data.research)
        } catch (error) {
            toast.error('Failed to fetch articles');
        } finally {
            setLoading(false);
        }
    }

const deleteResearch = async (researchId) => {
    setLoading(true);
    try {
        await axiosPrivateHook.delete(`${uploadResearch}/${researchId}`);
        toast.success('Research deleted successfully');
        fetchResearch();
    } catch (error) {
        toast.error('Failed to delete Research');
    } finally {
        setLoading(false);
      }
}

  return {
    fetchResearch,
    loading,
    researchItems,
    error,
    deleteResearch,

  }
}

export default useResearch
