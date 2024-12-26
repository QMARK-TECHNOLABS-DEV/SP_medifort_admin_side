import React, { useState } from "react";
import { getHealthVideos } from "../../utils/Endpoint";
import { toast } from "react-toastify";
import useAxiosPrivate from "../useAxiosPrivate";

const useHealthVideos = () => {
  const [videosItems, setVideosItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const axiosPrivateHook = useAxiosPrivate();

  const fetchVideos = async () => {
    setLoading(true);
    try {
        const response = await axiosPrivateHook.get(getHealthVideos);
        console.log(response.data);
        setVideosItems(response.data.result ?? []);
    } catch (error) {
        setError(error);
        toast.error('Failed to fetch Videos');
    }
    finally {
        setLoading(false);
    }
  };



  return{
    videosItems,
    loading,
    error,
    fetchVideos
  }
  ;
};

export default useHealthVideos;
