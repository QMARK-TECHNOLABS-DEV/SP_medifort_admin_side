import React, { useState } from "react";
import { getBlog, uploadBlog } from "../../utils/Endpoint";
import { toast } from "react-toastify";
import useAxiosPrivate from "../useAxiosPrivate";

const useBlog = () => {
  const [blogItems, setBlogItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const axiosPrivateHook = useAxiosPrivate();
  // Fetch all Blog
  const fetchBlog = async () => {
    setLoading(true);
    try {
      const response = await axiosPrivateHook.get(getBlog);

      if(response.status === 200){
        setBlogItems(response.data.blogs);

      }
    } catch (error) {
      setError(error);
      toast.error("Failed to fetch blog");
    } finally {
      setLoading(false);
    }
  };
  // Delete an Blog
  const deleteBlog = async (blogId) => {
    setLoading(true)
    try {
        await axiosPrivateHook.delete(`${uploadBlog}/${blogId}`);
        toast.success('Blog deleted successfully')
        fetchBlog();
    } catch (error) {
        
    }
  }
  return {
    blogItems,
    loading,
    error,
    deleteBlog,
    fetchBlog,
  };
};

export default useBlog;
