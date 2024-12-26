import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import { HiPencilAlt } from "react-icons/hi";
import NewsPlaceholder from "../../assets/article/images.png";
import { FaTrashAlt } from "react-icons/fa";
import uploadFile from "../../hooks/uploadFile";
import { toast } from "react-toastify";
import { uploadNews } from "../../utils/Endpoint";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const AddNewsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [pdf, setPdf] = useState();
  const axiosPrivateHook = useAxiosPrivate();

  useEffect(() => {
    if (location.state && location.state.isEdit) {
      const { news } = location.state;
      setTitle(news.title);
      setContent(news.description);
      setImage(news.image);
      setPdf(news.file)
      setIsEdit(true);
    }
  }, [location]);

  const breadcrumbsItems = [
    { label: "Content Management", href: "/content-management" },
    { label: isEdit ? "Update news" : "New news", href: "/content-management/news/new-news" },
  ];

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const uploadResponse = await uploadFile(file);
        setImage({
          key: uploadResponse.key,
          name: uploadResponse.name,
          location: uploadResponse.location,
        });
      } catch (error) {
        console.error("Image upload failed", error);
        toast.error("Failed to upload image.");
      }
    }
  };

  const handlePdfUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const uploadResponse = await uploadFile(file);
        setPdf({
          key: uploadResponse.key,
          name: uploadResponse.name,
          location: uploadResponse.location,
        });
      } catch (error) {
        console.error("PDF upload failed", error);
        toast.error("Failed to upload PDF.");
      }
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault(); 

    if (!title || !content) {
      alert("Please fill in all required fields.");
      return;
    }

    const newNews = {
      id: isEdit ? location.state.news.id : Date.now(),
      title,
      description :content,
      image: image,
      file : pdf,
      date: new Date().toLocaleDateString(),
    };

 
      // Send the news data to the server
      const response = await axiosPrivateHook({
        method: isEdit ? "PUT" : "POST",
        url: isEdit
          ? `${uploadNews}/${location.state.news._id}`
          : uploadNews,
        data: newNews,
        headers: { "Content-Type": "application/json" },
      });
      if (response.status === 200) {
        toast.success("Article uploaded successfully");
      }

    navigate("/content-management/news");
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
                  onClick={() => navigate("/content-management/news")}
                >
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
                  src={image?.location ? image.location : NewsPlaceholder}
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
                {/* Show the uploaded PDF file name */}
                {pdf?.name && (
                  <div className="mt-2 text-left text-sm text-gray-600">
                    {pdf.name} {/* Display the PDF file name */}
                  </div>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewsPage;
