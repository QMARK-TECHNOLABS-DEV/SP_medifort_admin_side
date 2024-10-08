import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import { HiPencilAlt } from "react-icons/hi";
import NewsPlaceholder from "../../assets/article/images.png";
import { FaTrashAlt } from "react-icons/fa";

const AddNewsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [image, setImage] = useState(NewsPlaceholder);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [newsItems, setNewsItems] = useState(location.state?.newsItems || []);

  useEffect(() => {
    if (location.state && location.state.isEdit) {
      const { news } = location.state;
      setTitle(news.title);
      setContent(news.content);
      setImage(news.imageUrl);
      setIsEdit(true);
    }
  }, [location]);

  const breadcrumbsItems = [
    { label: "Content Management", href: "/content-management" },
    { label: isEdit ? "Update news" : "New news", href: "/content-management/news/new-news" },
  ];

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 

    if (!title || !content) {
      alert("Please fill in all required fields.");
      return;
    }

    const newNews = {
      id: isEdit ? location.state.news.id : Date.now(),
      title,
      content,
      imageUrl: image || NewsPlaceholder,
      author: "Reo George",
      date: new Date().toLocaleDateString(),
    };

    let updatedNews;
    if (isEdit) {
      updatedNews = newsItems.map(item => 
        item.id === newNews.id ? newNews : item
      );
    } else {
      updatedNews = [...newsItems, newNews];
    }

    navigate("/news", { state: { updatedNews } });
  };

  return (
    <div className="h-screen w-full overflow-hidden">
      <div className="pb-36 overflow-y-auto h-full px-6 scrollbar-hide">
        <div className="flex flex-col -ml-4 mb-6">
          <h1 className="flex text-2xl font-bold text-primaryColor lg:hidden">
            {isEdit ? "Update News" : "New News"}
          </h1>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
            <Breadcrumbs items={breadcrumbsItems} />
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-4 mt-4 sm:mt-0">
              <button
                type="submit"
                form="news-form"
                className="py-2 lg:w-[150px] inline-flex items-center justify-center bg-[#F8F9FA] border border-[#9C2677] text-[#9C2677] hover:text-gray-800 font-medium rounded-lg"
              >
                Save and submit
              </button>
              {isEdit && (
                <button
                  type="button"
                  className="p-2 px-6 lg:w-[150px] flex items-center justify-center bg-[#F8F9FA] border border-[#9C2677] text-[#9C2677] hover:text-gray-800 font-medium rounded-lg"
                  onClick={() => navigate("/news")}
                >
                  <FaTrashAlt className="mr-2" />
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>
        <form id="news-form" onSubmit={handleSubmit}>
          <div className="p-6">
            <div className="flex flex-col lg:flex-row gap-6 mb-6">
              <div className="relative lg:w-1/2">
                <img
                  src={image}
                  alt="News"
                  className="w-full h-[200px] bg-[#B0BAC366] object-cover rounded-lg"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <HiPencilAlt className="text-white text-6xl bg-black bg-opacity-50 rounded-full p-2" />
                  </label>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </div>
              </div>
              <div className="lg:w-1/2 mt-32">
                <label className="block text-sm text-left font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  className="w-full p-2 border bg-[#B0BAC366] border-gray-300 rounded-lg"
                  placeholder="Enter news title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <div>
                <label className="block text-sm text-left font-medium text-gray-700 mb-2">
                  Content
                </label>
                <textarea
                  rows="10"
                  className="w-full p-2 border bg-[#B0BAC366] border-gray-300 rounded-lg"
                  placeholder="Enter news content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>
              <div className="text-left text-sm text-gray-500">
                + upload content as PDF
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewsPage;
