import React, { useEffect, useState } from "react";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import { BsFillPlayCircleFill } from "react-icons/bs";
import { LuPencilLine } from "react-icons/lu";
import { GoTrash } from "react-icons/go";
import axios from "../../axios-folder/axios";
import { testimonialAdminRoute, uploadRoute } from "../../utils/Endpoint";
import useAxiosPrivate from "../../hooks/useAxiosPrivate"

const VidTestimonial = () => {
  const [videos, setVideos] = useState([]);

  const breadcrumbsItems = [
    { label: "Testimonials", href: "/testimonials" },
    { label: "Video", href: "/testimonials/video" },
  ];

  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [playingVideoId, setPlayingVideoId] = useState(null);

  const [postData, setPostData] = useState({ name: "", date: "", media: "", thumbnail: "" , isVideo: true});

  const handleAddClick = () => {
    setIsAdding(true);
    setIsEditing(false);
  };

  const handleAddChange = (e) => {
    const { name, value } = e.target;
    setPostData({ ...postData, [name]: value });
  };

  const handleDateChange = (e) => {
    setPostData({ ...postData, date: e.target.value });
  };

  const handleEditClick = (video) => {
    setIsEditing(true);
    setIsAdding(false);
    setCurrentVideo(video);
    setPostData({ name: video.name, date: video.date, src: video.src, isYouTube: video.isYouTube });
  };

  const resetForm = () => {
    setPostData({ name: "", date: "", src: "", isYouTube: false });
  };

  const handleDelete = async(id) => {
    try {
      const res = await axiosPrivateHook.delete(`${testimonialAdminRoute}/${id}`)

      if(res.status === 200){
        setVideos(videos.filter((video) => String(video._id) !== String(id)));
      }
      
    } catch (error) {
      
    }
  };

  const closeModal = () => {
    setIsAdding(false);
    setIsEditing(false);
    resetForm();
  };

  const handleThumbnailClick = (id) => {
    setPlayingVideoId(id === playingVideoId ? null : id);
  };

  const handleUpload = async (e, name) => {
    const file = e.target.files[0]

    if (!file) {
      return
    }
    try {
      const formData = new FormData();
      formData.append('file', file)
      const res = await axios.post(uploadRoute, formData);

      if (res.status === 200) {
        const result = res?.data?.file
        if (result) {
          setPostData((prev) => ({ ...prev, [name]: result }))
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  const axiosPrivateHook = useAxiosPrivate();

  const handlePostData = async (e) => {
    e.preventDefault();
    try {
      let res;

      if (isAdding) {
        res = await axiosPrivateHook.post(testimonialAdminRoute, postData)
      }
      else if (isEditing && currentVideo) {
        res = await axiosPrivateHook.put(`${testimonialAdminRoute}/${currentVideo?._id}`, postData)
      }

      if (isAdding && res.status === 200) {
        setIsAdding(false);
        setVideos([...videos, res.data.result])
      }
      if (isEditing && res.status === 200) {
        setIsEditing(false);
        const newArray = [...videos]?.map((video) => {
          if (String(video?._id) === String(currentVideo?._id)) {
            return res.data.result
          }

          return video;
        })

        setVideos(newArray)
      }

      currentVideo(null)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchTestimonials = async () => {
    try {
      const res = await axiosPrivateHook.get(`${testimonialAdminRoute}?kind=video`)

      if (res.status === 200) {
        setVideos(res.data.result)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchTestimonials()
  }, [])

  return (
    <div className="p-6 w-full">
      <div className="flex flex-col sm:flex-row justify-start items-start sm:justify-between sm:items-center mb-1">
        <h1 className="text-2xl font-bold text-primaryColor lg:hidden sm:mt-[-20px] ml-[-1.5rem] mt-[-40px] text-left">
          Video
        </h1>
        <div className="mt-1 sm:mt-0 sm:ml-4 flex sm:flex-col ml-[-1.5rem] items-start lg:ml-[-1rem] lg:mt-[-2.5rem]">
          <Breadcrumbs items={breadcrumbsItems} />
        </div>

        <button
          className="border-2 py-2 px-4 ml-[-1.5rem] rounded-lg text-primaryColor border-primaryColor mt-1 sm:mt-0 sm:w-auto w-[110%] sm:ml-0 relative lg:top-[-1rem]"
          onClick={handleAddClick}
        >
          + Add Video
        </button>
      </div>

      {/* Scrollable Video Grid */}
      <div
        className="grid grid-cols-2 gap-6 max-h-[70vh] overflow-y-auto mx-auto mt-6 sm:mt-0" // Added margin-top for smaller screens
        style={{
          scrollbarWidth: 'none', // Firefox
          msOverflowStyle: 'none', // IE and Edge
          maxWidth: '150%', // Ensure the grid takes up full width
          marginLeft: '-1.25rem',  // Negative margin to reduce the gap
          marginRight: '-1.25rem', // Adjust the value as needed
        }}
      >
        {videos.map((video) => (
          <div
            key={video._id}
            className="relative rounded-lg overflow-hidden shadow-lg bg-white border border-blue-200"
          >
            <div
              className="relative cursor-pointer"
              onClick={() => handleThumbnailClick(video._id)}
            >
              {playingVideoId === video._id ? (
                video.isYouTube ? (
                  <iframe
                    className="w-full h-40"
                    src={video.media?.location}
                    allowFullScreen
                  ></iframe>
                ) : (
                  <video
                    className="w-full h-40 object-cover"
                    src={video.media?.location}
                    controls
                    autoPlay
                  />
                )
              ) : (
                <img
                  className="w-full h-40 object-cover"
                  src={video.thumbnail?.location}
                  alt="Video Thumbnail"
                />
              )}
              {/* Pause Icon */}
              {playingVideoId !== video._id && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative flex items-center justify-center">
                    <BsFillPlayCircleFill
                      size={32}
                      color="white"
                    />
                  </div>
                </div>
              )}
              <div className="absolute top-2 right-2 flex space-x-2">
                <button
                  className="bg-white rounded-full p-2 shadow-md"
                  onClick={() => handleEditClick(video)}
                >
                  {/* Pencil icon SVG */}
                  <LuPencilLine
                    size={24}
                  />
                </button>
                <button
                  className="bg-white rounded-full p-2 shadow-md"
                  onClick={() => handleDelete(video._id)}
                >
                  {/* Trash icon SVG */}
                  < GoTrash />
                </button>
              </div>
            </div>

            <div className="px-4 py-2">
              <h3 className="text-lg font-semibold">{video.name}</h3>
              <p className="text-sm text-gray-600">{video.date}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {(isAdding || isEditing) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-1/2">
            <h2 className="text-2xl font-bold mb-4">{isAdding ? "Add Video" : "Edit Video"}</h2>
            <form onSubmit={handlePostData}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2 text-left">Name</label>
                <input
                  type="text"
                  name="name"
                  value={postData.name}
                  onChange={handleAddChange}
                  className="border border-gray-300 rounded-lg w-full px-4 py-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2 text-left">Date</label>
                <input
                  type="date"
                  name="date"
                  value={postData.date}
                  onChange={handleDateChange}
                  className="border border-gray-300 rounded-lg w-full px-4 py-2"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2 text-left">Thumbnail</label>
                <input
                  type="file"
                  name="thumbnail"
                  value={postData.thumbnail?.originalname}
                  onChange={(e) => handleUpload(e, 'thumbnail')}
                  className="border border-gray-300 rounded-lg w-full px-4 py-2"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2 text-left">Video File</label>
                <input
                  type="file"
                  name="media"
                  value={postData.media?.originalname}
                  onChange={(e) => handleUpload(e, 'media')}
                  className="border border-gray-300 rounded-lg w-full px-4 py-2"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg mr-2"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-primaryColor text-white px-4 py-2 rounded-lg"
                >
                  {isAdding ? "Add Video" : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default VidTestimonial;
