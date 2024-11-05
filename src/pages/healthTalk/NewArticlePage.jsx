import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import { HiPencilAlt } from "react-icons/hi";
import Article1 from "../../assets/article/images.png";
import { FaTrashAlt } from "react-icons/fa";
import { axiosPrivate } from "../../axios-folder/axios";
import { uploadArticles } from "../../utils/Endpoint";

const NewArticlePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [pdf, setPdf] = useState(null); // New state for PDF
  const [articleItems, setArticleItems] = useState(
    location.state?.articleItems || []
  );

  useEffect(() => {
    if (location.state && location.state.isEdit) {
      const { article } = location.state;
      setTitle(article.title);
      setContent(article.content);
      setImage(article.imageUrl);
      setIsEdit(true);
    }
  }, [location]);

  const breadcrumbsItems = [
    { label: "Health Talk", href: "/content-management/health-talk" },
    {
      label: isEdit ? "Update Article" : "New Article",
      href: "/content-management/article/new-article",
    },
  ];

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(file); // Set file directly for uploading
    }
  };

  const handlePdfUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPdf(file); // Set PDF file directly for uploading
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content || !pdf) {
      alert("Please fill in all required fields and upload a PDF.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("image", image || Article1); // Append image if available
    formData.append("pdf", pdf); // Append PDF file
    formData.append("author", "Reo George");
    formData.append("date", new Date().toLocaleDateString());

    try {
      console.log(formData,"data from from")
      const response = await axiosPrivate({
        method: isEdit ? "PUT" : "POST",
        url: isEdit
          ? `${uploadArticles}/${location.state.article.id}`
          : uploadArticles,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Redirect to the article list page with updated data
      navigate("/article", { state: { updatedArticles: response.data } });
    } catch (error) {
      console.error("Failed to submit article", error);
      alert("An error occurred while saving the article.");
    }
  };

  return (
    <div className="h-screen w-full overflow-hidden">
      <div className="pb-36 overflow-y-auto h-full px-6 scrollbar-hide">
        <div className="flex flex-col mb-6">
          <h1
            className={`text-2xl font-bold text-primaryColor mb-2 text-left -ml-4 ${
              isEdit ? "-ml-4 md:-ml-6 lg:-ml-8 -mt-1 md:-mt-2 lg:-mt-1" : ""
            }`}
          >
            {isEdit ? "Update Article" : "New Article"}
          </h1>
          <div
            className={`flex flex-col sm:flex-row sm:justify-between -ml-4 sm:items-center ${
              isEdit ? "-ml-4 md:-ml-6 lg:-ml-8" : ""
            }`}
          >
            <Breadcrumbs items={breadcrumbsItems} />
            <div className="flex flex-col sm:flex-row gap-4 mt-4 sm:mt-0">
              <button
                type="submit"
                form="article-form"
                className="w-full sm:w-auto py-2 lg:w-[150px] inline-flex items-center justify-center bg-[#F8F9FA] border border-[#9C2677] text-[#9C2677] hover:text-gray-800 font-medium rounded-lg"
              >
                Save and submit
              </button>
              {isEdit && (
                <button
                  type="button"
                  className="p-2 px-6 lg:w-[150px] flex items-center justify-center bg-[#F8F9FA] border border-[#9C2677] text-[#9C2677] hover:text-gray-800 font-medium rounded-lg"
                  onClick={() => navigate("/article")}
                >
                  <FaTrashAlt className="mr-2" />
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>
        <form id="article-form" onSubmit={handleSubmit}>
          <div className="p-6">
            <div className="flex flex-col lg:flex-row mb-6 gap-4">
              <div className="relative w-[300px] h-[300px]">
                <img
                  src={image ? URL.createObjectURL(image) : Article1}
                  alt="Article"
                  className="w-full h-full object-cover rounded-2xl"
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
              <div className="lg:flex-1 flex flex-col justify-end">
                <label className="block text-sm text-left font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  className="w-full sm:w-1/2 h-12 p-2 border bg-[#B0BAC366] border-gray-300 rounded-lg"
                  placeholder="Nourishing Recovery Amidst Medical Challenges"
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
                  rows="5"
                  className="w-full p-4 border bg-[#B0BAC366] border-gray-300 rounded-lg"
                  placeholder="Content here..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                ></textarea>
              </div>
              <div className="flex flex-col mb-6">
                <label
                  className="block text-sm text-left font-medium text-gray-700 mb-2 cursor-pointer"
                  htmlFor="pdf-upload"
                >
                 + Upload Content as PDF
                </label>
                <input
                  id="pdf-upload"
                  type="file"
                  accept="application/pdf"
                  className="hidden"
                  onChange={handlePdfUpload}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewArticlePage;
