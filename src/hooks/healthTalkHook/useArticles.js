import { useState, useEffect } from 'react';
import { axiosPrivate } from '../../axios-folder/axios';
import { uploadArticles } from '../../utils/Endpoint';
import { toast } from 'react-toastify';

const useArticles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all articles
  const fetchArticles = async () => {
    setLoading(true);
    try {
      const response = await axiosPrivate.get('/articles');
      setArticles(response.data);
    } catch (err) {
      setError(err);
      toast.error('Failed to fetch articles');
    } finally {
      setLoading(false);
    }
  };

  // Add a new article
  const addArticle = async (articleData) => {
    setLoading(true);
    try {
      const response = await axiosPrivate.post(uploadArticles, articleData);
      console.log(response.data)
      setArticles((prevArticles) => [...prevArticles, response.data]);
      toast.success('Article added successfully');
    } catch (err) {
      setError(err);
      toast.error('Failed to add article');
    } finally {
      setLoading(false);
    }
  };

  // Edit an article
  const editArticle = async (articleId, updatedData) => {
    setLoading(true);
    try {
      const response = await axiosPrivate.put(`${uploadArticles}/${articleId}`, updatedData);
      setArticles((prevArticles) =>
        prevArticles.map((article) =>
          article.id === articleId ? response.data : article
        )
      );
      toast.success('Article updated successfully');
    } catch (err) {
      setError(err);
      toast.error('Failed to update article');
    } finally {
      setLoading(false);
    }
  };

  // Delete an article
  const deleteArticle = async (articleId) => {
    setLoading(true);
    try {
      await axiosPrivate.delete(`${uploadArticles}/${articleId}`);
      setArticles((prevArticles) =>
        prevArticles.filter((article) => article.id !== articleId)
      );
      toast.success('Article deleted successfully');
    } catch (err) {
      setError(err);
      toast.error('Failed to delete article');
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch of articles
  useEffect(() => {
    fetchArticles();
  }, []);

  return {
    articles,
    loading,
    error,
    addArticle,
    editArticle,
    deleteArticle,
    fetchArticles,
  };
};

export default useArticles;
