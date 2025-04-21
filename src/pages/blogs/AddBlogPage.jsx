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
import PageHeaderpart from "../../components/common/PageHeaderpart";

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
    image: '',
    metadata: {
      metaTitle: "",
      metaDescription: "",
      metaKeywords: "",
      headerTitle: "",
      route: "",
    },
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
    { label: "Our Blogs", href: "/content-management/blogs" },
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
      <header>
        <PageHeaderpart
          items={breadcrumbsItems}
          pageTitle={isEdit ? "Update Blog" : "New Blog"}
        >
          <div className="flex flex-col md:flex-row md:items-end w-full items-start justify-start ">
            <div className="flex w-full gap-3 mt-3 md:mt-0">
              <button
                type="submit"
                form="Blog-form"
                className="py-2 w-full lg:w-[150px] inline-flex items-center justify-center bg-[#F8F9FA] border border-[#9C2677] text-xs md:text-[15px] text-[#9C2677] hover:text-gray-800 font-medium rounded-lg"
              >
                Save and submit
              </button>

              <button
                type="button"
                className="p-2 px-6 w-full lg:w-[150px] flex items-center justify-center bg-[#F8F9FA] border border-[#9C2677] text-xs md:text-[15px] text-[#9C2677] hover:text-gray-800 font-medium rounded-lg"
                onClick={() => navigate("/content-management/blogs")}
              >
                Cancel
              </button>

            </div>

          </div>
        </PageHeaderpart>
      </header>
      <div className="pb-[100%] md:pb-80 overflow-y-auto h-full scrollbar-hide ">
        <form id="Blog-form" onSubmit={handleSubmit}>
          <div className="">
            <div className="flex flex-col lg:flex-row gap-6 mb-6">
              <div className="relative lg:w-1/2 lg:h-full">
                <img
                  src={blog?.image?.location ? blog?.image.location : BlogPlaceholder}
                  alt="Blog"
                  className="w-full h-full bg-[#B0BAC366] object-cover rounded-lg"
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

              <div className="lg:w-1/2 flex flex-col gap-2">
                <div className="">
                  <label className="block text-sm text-left font-medium text-gray-700 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border bg-[#ffffff66] border-gray-300 rounded-lg text-sm"
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
                    className="w-full p-2 border bg-[#ffffff66] border-gray-300 rounded-lg text-sm"
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
                  <div className="flex flex-col gap-4">
                    <select
                      className="w-full  h-12 p-2 border bg-[#ffffff] border-gray-300 rounded-lg text-sm"
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
                        className="w-full  h-12 p-2 border bg-[#ffffff] border-gray-300 rounded-lg text-sm capitalize"
                        placeholder="Enter Author Name"
                        value={blog.author}
                        onChange={(e) => setBlog({ ...blog, author: e.target.value })}
                      />
                    )}
                  </div>
                </div>

                <div className="w-full border-t border-gray-300 pt-5 mt-5">
                  <h2 className="text-lg md:text-2xl  font-semibold text-gray-800 mb-2">
                    Meta Data
                  </h2>
                  <div className="flex flex-col lg:flex-row gap-4 mb-4 mt-5">
                    {/* Meta Title */}
                    <div className="w-full lg:w-1/2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Meta Title
                      </label>
                      <input
                        type="text"
                        name="metaTitle"
                        className="w-full p-2 border bg-[#ffffff] border-gray-300 rounded-lg text-sm"
                        placeholder="Enter Meta Title"
                        value={blog?.metadata?.metaTitle}
                        onChange={(e) =>
                          setBlog((prev) => ({
                            ...prev,
                            metadata: {
                              ...prev.metadata,
                              metaTitle: e.target.value,
                            },
                          }))
                        }
                      />
                    </div>

                    {/* Meta Description */}
                    <div className="w-full lg:w-1/2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Meta Description
                      </label>
                      <input
                        type="text"
                        name="metaDescription"
                        className="w-full p-2 border bg-[#ffffff] border-gray-300 rounded-lg text-sm"
                        placeholder="Enter Meta Description"
                        value={blog?.metadata?.metaDescription}
                        onChange={(e) =>
                          setBlog((prev) => ({
                            ...prev,
                            metadata: {
                              ...prev.metadata,
                              metaDescription: e.target.value,
                            },
                          }))
                        }
                      />
                    </div>
                  </div>

                  <div className="flex flex-col lg:flex-row gap-4 mb-4">
                    {/* Meta Keywords */}
                    <div className="w-full">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Meta Keywords
                      </label>
                      <input
                        type="text"
                        name="metaKeywords"
                        className="w-full p-2 border bg-[#ffffff] border-gray-300 rounded-lg text-sm"
                        placeholder="Enter Meta Keywords"
                        value={blog?.metadata?.metaKeywords}
                        onChange={(e) =>
                          setBlog((prev) => ({
                            ...prev,
                            metadata: {
                              ...prev.metadata,
                              metaKeywords: e.target.value,
                            },
                          }))
                        }
                      />
                    </div>

                    {/* Header Title */}
                    {/* <div className="w-full ">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Header Title
                      </label>
                      <input
                        type="text"
                        name="headerTitle"
                        className="w-full p-2 border bg-[#ffffff] border-gray-300 rounded-lg text-sm"
                        placeholder="Enter Header Title"
                        value={blog?.metadata?.headerTitle}
                        onChange={(e) =>
                          setBlog((prev) => ({
                            ...prev,
                            metadata: {
                              ...prev.metadata,
                              headerTitle: e.target.value,
                            },
                          }))
                        }
                      />
                    </div> */}

                    {/* Route */}
                    {/* <div className="w-full">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Route
                      </label>
                      <input
                        type="text"
                        name="route"
                        className="w-full p-2 border bg-[#ffffff] border-gray-300 rounded-lg text-sm"
                        placeholder="Enter Route"
                        value={blog?.metadata?.route}
                        onChange={(e) =>
                          setBlog((prev) => ({
                            ...prev,
                            metadata: {
                              ...prev.metadata,
                              route: e.target.value,
                            },
                          }))
                        }
                      />
                    </div> */}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-lg md:text-2xl text-left font-semibold text-gray-700 mb-2">
                Content
              </label>
              <ReactQuill theme="snow" value={content} onChange={setContent} className="h-[40vh] bg-white" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBlogPage;
