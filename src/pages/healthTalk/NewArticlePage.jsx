import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import { HiPencilAlt } from "react-icons/hi";
import Article1 from "../../assets/article/images.png";
import { FaTrashAlt } from "react-icons/fa";
import uploadFile from "../../hooks/uploadFile";
import { uploadArticles } from "../../utils/Endpoint";
import { toast } from "react-toastify";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const NewArticlePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [image, setImage] = useState({ file: null, location: Article1 });
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [pdf, setPdf] = useState({ file: null, name: "" });
  const axiosPrivateHook = useAxiosPrivate();
  const [articleItems, setArticleItems] = useState(
    location.state?.articleItems || []
  );

  useEffect(() => {
    if (location.state && location.state.isEdit) {
      const { article } = location.state;
      setTitle(article.title);
      setAuthor(article.author);
      setContent(article.content);
      setImage(article.image);
      setPdf(article.file);
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
    if (!title || !content || !pdf) {
      toast.error("Please fill in all required fields and upload a PDF.");
      return;
    }

    try {
      // Upload image if a new file was selected

      // Prepare article data with uploaded file URLs
      const articleData = {
        title,
        content,
        image: image,
        file: pdf,
        author,
        date: new Date().toLocaleDateString(),
      };
      console.log(articleData);

      // Send the article data to the server
      const response = await axiosPrivateHook({
        method: isEdit ? "PUT" : "POST",
        url: isEdit
          ? `${uploadArticles}/${location.state.article._id}`
          : uploadArticles,
        data: articleData,
        headers: { "Content-Type": "application/json" },
      });
      if (response.status === 200) {
        toast.success("Article uploaded successfully");
      }
      // Redirect with the updated articles data
      navigate("/content-management/article", {
        state: { updatedArticles: response.data },
      });
    } catch (error) {
      console.error("Failed to submit article", error);
      toast.error("An error occurred while saving the article.");
    }
  };

  return (
    <div className="h-screen w-full overflow-hidden">
      <div className="pb-36 overflow-y-auto h-full px-6 scrollbar-hide">
        <div className="flex flex-col mb-6">
          <h1
            className={`text-2xl font-bold text-primaryColor mb-2 text-left ${
              isEdit ? "-ml-4 md:-ml-6 lg:-ml-8 -mt-1 md:-mt-2 lg:-mt-1" : ""
            }`}
          >
            {isEdit ? "Update Article" : "New Article"}
          </h1>
          <div
            className={`flex flex-col sm:flex-row sm:justify-between ${
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
                  onClick={() => navigate("/content-management/article")}
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
            <div className="flex flex-col lg:flex-row mb-4 gap-4">
              <div className="relative w-[300px] h-[300px]">
                <img
                  src={image.location}
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
                <label className="block text-sm text-left font-medium text-gray-700 mt-5 mb-2">
                  Author
                </label>
                <input
                  type="text"
                  className="w-full sm:w-1/2 h-12 p-2 border bg-[#B0BAC366] border-gray-300 rounded-lg"
                  placeholder="Author Name"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
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
                {/* Show the uploaded PDF file name */}
                {pdf.name && (
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

export default NewArticlePage;
