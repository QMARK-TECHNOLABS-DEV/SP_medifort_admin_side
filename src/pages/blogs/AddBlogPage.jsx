import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import { HiPencilAlt } from "react-icons/hi";
import BlogPlaceholder from "../../assets/article/images.png";
import uploadFile from "../../hooks/uploadFile";
import { toast } from "react-toastify";
import { uploadBlog } from "../../utils/Endpoint";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

const AddBlogPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isEdit, setIsEdit] = useState(false);
  const axiosPrivateHook = useAxiosPrivate();

  const initialState = {
    title: '',
    kind: '',
    author: '',
    image: ''
  }
  const [blog, setBlog] = useState(initialState)

  const [content, setContent] = useState('')

  useEffect(() => {
    if (location.state && location.state.isEdit === true) {
      const { blog } = location.state;
      const { content, ...rest } = blog;
      setBlog(rest)
      setContent(content)
      setIsEdit(true)
    }
  }, [location]);

  const breadcrumbsItems = [
    { label: "Content Management", href: "/content-management" },
    { label: isEdit ? "Update Blog" : "New Blog", href: "/content-management/blog/new-blog" },
  ];

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const uploadResponse = await uploadFile(file);

        setBlog((prev) => ({ ...prev, image: uploadResponse }))
      } catch (error) {
        console.error("Image upload failed", error);
        toast.error("Failed to upload image.");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!blog?.title || !content) {
      alert("Please fill in all required fields.");
      return;
    }

    // Send the Blog data to the server
    const response = await axiosPrivateHook({
      method: isEdit ? "PUT" : "POST",
      url: isEdit
        ? `${uploadBlog}/${location.state.blog._id}`
        : uploadBlog,
      data: { ...blog, content },
      headers: { "Content-Type": "application/json" },
    });
    if (response.status === 200) {
      toast.success("Blog uploaded successfully");
    }

    setBlog(initialState)
    setContent("")
    navigate("/content-management/blogs");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setBlog((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className="h-screen w-full overflow-hidden">
      <div className="pb-36 overflow-y-auto h-full px-6 scrollbar-hide">
        <div className="flex flex-col -ml-4 mb-6">
          <h1 className="flex text-2xl font-bold text-primaryColor lg:hidden">
            {isEdit ? "Update Blog" : "New Blog"}
          </h1>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
            <Breadcrumbs items={breadcrumbsItems} />
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-4 mt-4 sm:mt-0">
              <button
                type="submit"
                form="Blog-form"
                className="py-2 lg:w-[150px] inline-flex items-center justify-center bg-[#F8F9FA] border border-[#9C2677] text-[#9C2677] hover:text-gray-800 font-medium rounded-lg"
              >
                Save and submit
              </button>
              {isEdit && (
                <button
                  type="button"
                  className="p-2 px-6 lg:w-[150px] flex items-center justify-center bg-[#F8F9FA] border border-[#9C2677] text-[#9C2677] hover:text-gray-800 font-medium rounded-lg"
                  onClick={() => navigate("/content-management/blogs")}
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>
        <form id="Blog-form" onSubmit={handleSubmit}>
          <div className="p-6">
            <div className="flex flex-col lg:flex-row gap-6 mb-6">
              <div className="relative lg:w-1/2">
                <img
                  src={blog?.image?.location ? blog?.image.location : BlogPlaceholder}
                  alt="Blog"
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

              <div className="lg:w-1/2 mt-32 flex flex-col gap-2">
                <div className="">
                  <label className="block text-sm text-left font-medium text-gray-700 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border bg-[#B0BAC366] border-gray-300 rounded-lg"
                    placeholder="Enter Blog title"
                    name="title"
                    value={blog?.title}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="">
                  <label className="block text-sm text-left font-medium text-gray-700 mb-2">
                    Type
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border bg-[#B0BAC366] border-gray-300 rounded-lg"
                    placeholder="Enter Blog Type"
                    name="kind"
                    value={blog?.kind}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="">
                  <label className="block text-sm text-left font-medium text-gray-700 mb-2">
                    Author
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border bg-[#B0BAC366] border-gray-300 rounded-lg"
                    placeholder="Enter author name"
                    name="author"
                    value={blog?.author}
                    onChange={handleChange}
                  />
                </div>
              </div>

            </div>

            <ReactQuill theme="snow" value={content} onChange={setContent} className="h-[40vh] bg-white" />

          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBlogPage;
