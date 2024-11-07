import React, { useState } from "react";
import { getVideos } from "../../utils/Endpoint";
import { toast } from "react-toastify";
import useAxiosPrivate from "../useAxiosPrivate";

const useVideos = () => {
  const [videosItems, setVideosItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const axiosPrivateHook = useAxiosPrivate();

  const fetchVideos = async () => {
    setLoading(true);
    try {
        const response = await axiosPrivateHook.get(getVideos);
        console.log(response.data);
        setVideosItems(response.data.video);
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

export default useVideos;
