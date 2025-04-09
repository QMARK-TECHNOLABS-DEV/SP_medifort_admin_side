import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import { HiPencilAlt } from "react-icons/hi";
import ResearchPlaceholder from "../../assets/article/images.png";
import { FaTrashAlt } from "react-icons/fa";
import uploadFile from "../../hooks/uploadFile";
import { toast } from "react-toastify";
import { uploadResearch } from "../../utils/Endpoint";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useImageCompression from "../../hooks/useImageCompression";
import PageHeaderpart from "../../components/common/PageHeaderpart";

const NewResearchPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [image, setImage] = useState({ file: null, location: ResearchPlaceholder });
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [pdf, setPdf] = useState({ file: null, name: "" });
  const [isEdit, setIsEdit] = useState(false);
  const [researchItems, setResearchItems] = useState(location.state?.researchItems || []);
  const axiosPrivateHook = useAxiosPrivate();
  const { compressImage } = useImageCompression()

  useEffect(() => {
    if (location.state && location.state.isEdit) {
      const { research } = location.state;
      setTitle(research.title);
      setContent(research.journal);
      setAuthor(research.authors)
      setImage(research.image);
      setPdf(research.file);
      setIsEdit(true);
    }
  }, [location]);

  const breadcrumbsItems = [
    { label: "our Research", href: "/content-management/research" },
    { label: isEdit ? "Update Research" : "Add Research", href: "/content-management/research/new-research" },
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
        const compressedFile = await compressImage(file);
        const uploadResponse = await uploadFile(compressedFile);
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

    const newResearch = {

      title,
      journal: content,
      image: image,
      file: pdf,
      authors: author,
      publishedDate: new Date().toLocaleDateString(),
    };
    console.log(newResearch)
    try {
      const response = await axiosPrivateHook({
        method: isEdit ? "PUT" : "POST",
        url: isEdit
          ? `${uploadResearch}/${location.state.research._id}`
          : uploadResearch,
        data: newResearch,
        headers: { "Content-Type": "application/json" },
      });
      if (response.status === 200) {
        toast.success("Article uploaded successfully");
      }
      // Redirect with the updated articles data
      navigate("/content-management/research", {
        state: { updatedArticles: response.data },
      });
    } catch (error) {
      console.error("Failed to submit article", error);
      toast.error("An error occurred while saving the article.");
    }
  };

  return (
    <div className="h-screen w-full overflow-hidden">
      <header>
        <PageHeaderpart
          items={breadcrumbsItems}
          pageTitle={isEdit ? "Update Research" : "New Research"}
        >
          <div className="flex md:flex-row flex-col md:items-end  gap-4 w-full items-start justify-start ">
          <div className="flex flex-col sm:flex-row gap-4 mt-4 sm:mt-0 w-full sm:w-auto">
              <button
                type="submit"
                form="research-form"
                className="w-full sm:w-auto py-2 lg:w-[150px] lr:2 inline-flex items-center justify-center bg-[#F8F9FA] border border-[#9C2677] text-[#9C2677] hover:text-gray-800 font-medium rounded-lg"
              >
                Save and submit
              </button>
              
                <button
                  type="button"
                  className="w-full sm:w-auto py-2 lg:w-[150px] flex items-center justify-center bg-[#F8F9FA] border border-[#9C2677] text-[#9C2677] hover:text-gray-800 font-medium rounded-lg"
                  onClick={() => navigate("/content-management/research")}
                >
                  Cancel
                </button>
             
            </div>

          </div>
        </PageHeaderpart>
      </header>
      <div className="pb-80 overflow-y-auto h-full px-6 scrollbar-hide">
        {/* <div className="flex flex-col mb-6">
          <div className="flex flex-col sm:flex-row sm:justify-between items-start w-full">
            <div className="flex flex-col w-full -ml-4 sm:w-auto">
              <h1 className="text-2xl -ml-60 font-bold text-primaryColor lg:hidden">
                {isEdit ? "Update Research" : "New Research"}
              </h1>
              <Breadcrumbs items={breadcrumbsItems} />
            </div>
           
          </div>
        </div> */}
        <form id="research-form" onSubmit={handleSubmit}>
          <div className="p-6">
            <div className="flex flex-col lg:flex-row gap-6 mb-6">
              <div className="relative lg:w-1/2">
                <img
                  src={image.location}
                  alt="Research"
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
              <div className="lg:flex-1 flex flex-col justify-end">
                <label className="block text-sm text-left font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  className="w-full sm:w-1/2 h-12 p-2 border bg-[#B0BAC366] border-gray-300 rounded-lg"
                  placeholder="Title"
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
                  rows="10"
                  className="w-full p-2 border bg-[#B0BAC366] border-gray-300 rounded-lg"
                  placeholder="Enter research content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
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

export default NewResearchPage;
