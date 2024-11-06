import React, { useState } from "react";
import { axiosPrivate } from "../../axios-folder/axios";
import { getVideos } from "../../utils/Endpoint";
import { toast } from "react-toastify";

const useVideos = () => {
  const [videosItems, setVideosItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchVideos = async () => {
    setLoading(true);
    try {
        const response = await axiosPrivate.get(getVideos);
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
