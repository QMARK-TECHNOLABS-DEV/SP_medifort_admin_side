import React, { useState } from "react";
import { getNews, uploadNews } from "../../utils/Endpoint";
import { toast } from "react-toastify";
import useAxiosPrivate from "../useAxiosPrivate";

const useNews = () => {
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const axiosPrivateHook = useAxiosPrivate();
  // Fetch all News
  const fetchNews = async () => {
    setLoading(true);
    try {
      const response = await axiosPrivateHook.get(getNews);
      console.log(response.data);
      setNewsItems(response.data.news);
    } catch (error) {
      setError(error);
      toast.error("Failed to fetch articles");
    } finally {
      setLoading(false);
    }
  };
  // Delete an News
  const deleteNews = async (NewsId) => {
    setLoading(true)
    try {
        await axiosPrivateHook.delete(`${uploadNews}/${NewsId}`);
        toast.success('News deleted successfully')
        fetchNews();
    } catch (error) {
        
    }
  }
  return {
    newsItems,
    loading,
    error,
    deleteNews,
    fetchNews,
  };
};

export default useNews;
