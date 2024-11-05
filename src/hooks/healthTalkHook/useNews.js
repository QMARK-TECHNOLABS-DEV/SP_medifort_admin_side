import React, { useState } from "react";
import { axiosPrivate } from "../../axios-folder/axios";
import { getNews, uploadNews } from "../../utils/Endpoint";
import { toast } from "react-toastify";

const useNews = () => {
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all News
  const fetchNews = async () => {
    setLoading(true);
    try {
      const response = await axiosPrivate.get(getNews);
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
        await axiosPrivate.delete(`${uploadNews}/${NewsId}`);
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
