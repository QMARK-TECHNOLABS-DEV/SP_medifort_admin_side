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
import useGetAllDoctors from "../../hooks/doctor/useGetAllDoctors";
import imageCompression from "browser-image-compression";

const AddBlogPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isEdit, setIsEdit] = useState(false);
  const [isCustomAuthor, setIsCustomAuthor] = useState(false);
  const axiosPrivateHook = useAxiosPrivate();
  const { doctors, loading, error } = useGetAllDoctors();

  const initialState = {
    title: '',
    kind: '',
    author: '',
    image: ''
  };

  const [blog, setBlog] = useState(initialState);
  const [content, setContent] = useState('');

  useEffect(() => {
    if (location.state && location.state.isEdit === true) {
      const { blog } = location.state;
      const { content, author, ...rest } = blog;
      
      // Check if the author is a doctor ID
      const doctorExists = doctors.some(doctor => doctor._id === author);
      if (doctorExists) {
        setBlog({ ...rest, author: author }); // Set doctor ID as author
      } else {
        setIsCustomAuthor(true); // Set custom author
        setBlog({ ...rest, author: author }); // Set custom author name
      }
      
      setContent(content);
      setIsEdit(true);
    }
  }, [location, doctors]); // Added doctors as dependency to handle changes in doctors list
  

  const breadcrumbsItems = [
    { label: "Content Management", href: "/content-management" },
    { label: isEdit ? "Update Blog" : "New Blog", href: "/content-management/blog/new-blog" },
  ];

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
       if (file.size > 5 * 1024 * 1024) {
              toast.error("File size exceeds 5MB. Please upload a smaller file.");
              return;
            }
      try {
           // Compression options
                const options = {
                  maxSizeMB: 1, // Target file size
                  maxWidthOrHeight: 1024, // Resize if needed
                  useWebWorker: true,
                };
          
                const compressedFile = await imageCompression(file, options);
        const uploadResponse = await uploadFile(compressedFile);
        setBlog((prev) => ({ ...prev, image: uploadResponse }));
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
      url: isEdit ? `${uploadBlog}/${location.state.blog._id}` : uploadBlog,
      data: { ...blog, content },
      headers: { "Content-Type": "application/json" },
    });

    if (response.status === 200) {
      toast.success("Blog uploaded successfully");
    }

    setBlog(initialState);
    setContent("");
    navigate("/content-management/blogs");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setBlog((prev) => ({
      ...prev,
      [name]: value
    }));
  };

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
                  className="w-full h-full bg-[#B0BAC366] object-contain rounded-lg"
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

              <div className="lg:w-1/2 sm:mt-32 flex flex-col gap-2">
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

                <div className="mt-5">
                  <label className="block text-sm text-left font-medium text-gray-700 mb-2">
                    Author
                  </label>
                  <div className="flex flex-col gap-4">
                    <select
                      className="w-full  h-12 p-2 border bg-[#B0BAC366] border-gray-300 rounded-lg"
                      value={isCustomAuthor ? "Other" : blog.author}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value === "Other") {
                          setIsCustomAuthor(true);
                          setBlog({ ...blog, author: "" });
                        } else {
                          setIsCustomAuthor(false);
                          setBlog({ ...blog, author: value });
                        }
                      }}
                    >
                      <option value="" disabled>
                        Select Doctor
                      </option>
                      {loading && <option>Loading doctors...</option>}
                      {error && <option>Error loading doctors</option>}
                      {!loading && !error && (
                        <>
                          {doctors.map((doctor) => (
                            <option key={doctor.id} value={doctor._id}>
                              {doctor.doctor_name}
                            </option>
                          ))}
                          <option value="Other">Other</option>
                        </>
                      )}
                    </select>

                    {isCustomAuthor && (
                      <input
                        type="text"
                        className="w-full  h-12 p-2 border bg-[#B0BAC366] border-gray-300 rounded-lg"
                        placeholder="Enter Author Name"
                        value={blog.author}
                        onChange={(e) => setBlog({ ...blog, author: e.target.value })}
                      />
                    )}
                  </div>
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
