import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import { HiPencilAlt } from "react-icons/hi";
import Article1 from "../../assets/article/images.png";
import { FaTrashAlt } from "react-icons/fa";

const breadcrumbsItems = [
  { label: "Health Talk", href: "/health-talk" },
  { label: "New Article", href: "/new-article" },
];

const NewArticlePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [image, setImage] = useState(Article1);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (location.state && location.state.isEdit) {
      const { article } = location.state;
      setTitle(article.title);
      setContent(article.content);
      setImage(article.imageUrl);
      setIsEdit(true);
    }
  }, [location]);

  // Handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  const handleSubmit = () => {
    const newArticle = {
      title,
      content,
      imageUrl: image,
      author: "Reo George",
      date: new Date().toLocaleDateString(), // Current date
    };

    if (isEdit) {
      console.log("Updating article...", newArticle);
    } else {
      console.log("Adding new article...", newArticle);
    }
    navigate("/article");
  };

  return (
    <div className="h-screen w-full overflow-hidden">
      <div className="pb-36 overflow-y-auto h-full px-6">
        <div className="flex flex-col mb-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
            <Breadcrumbs items={breadcrumbsItems} />
            <div className="flex flex-row gap-4 mt-4 sm:mt-0">
              <button
                className="py-2 lg:w-[150px] inline-flex items-center justify-center bg-[#F8F9FA] border border-[#9C2677] text-[#9C2677] hover:text-gray-800 font-medium rounded-lg"
                onClick={handleSubmit}
              >
                Save and submit
              </button>
              <button className="p-2 px-6 lg:w-[150px] flex items-center justify-center bg-[#F8F9FA] border border-[#9C2677] text-[#9C2677] hover:text-gray-800 font-medium rounded-lg">
                <FaTrashAlt className="mr-2" />
                Delete
              </button>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="flex flex-col lg:flex-row mb-6 gap-4">
            <div className="relative w-[300px] h-[300px]">
              <img
                src={image}
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
                className="w-1/2 h-12 p-2 border bg-[#B0BAC366] border-gray-300 rounded-lg"
                placeholder="Nourishing Recovery Amidst Medical Challenges"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
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
              ></textarea>
            </div>
            <div className="text-left text-sm text-gray-500">
              + upload content as PDF
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewArticlePage;
