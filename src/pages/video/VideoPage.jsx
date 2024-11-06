import React, { useEffect, useState } from "react";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import VideoCard from "../../components/video/VideoCard";
import AddModal from "../../components/video/AddModal";
import useVideos from "../../hooks/healthTalkHook/useVideos";
import { axiosPrivate } from "../../axios-folder/axios";
import { uploadRoute, uploadVideos } from "../../utils/Endpoint";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import uploadFile from "../../hooks/uploadFile";
import { toast } from "react-toastify";

const breadcrumbsItems = [
  { label: "Health Talk", href: "/content-management/health-talk" },
  { label: "Video", href: "/content-management/video" },
];

const VideoPage = () => {
  const [videos, setVideos] = useState([]);
  const { loading, videosItems, fetchVideos } = useVideos();
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [newVideo, setNewVideo] = useState({
    title: "",
    date: "",
    attachment: "",
    isVideo: false,
  });

  useEffect(() => {
    fetchVideos();
    
  }, []);

  const handleAddNewClick = () => {
    setIsAdding(true);
    setIsEditing(false);
  };

  const handleAddChange = (e) => {
    const { name, value } = e.target;
    setNewVideo((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditClick = (video) => {
    setIsEditing(true);
    setCurrentVideo(video);
    setNewVideo({
      title: video.title,
      date: video.date,
      attachment: video.attachment,
      isVideo: true,
    });
  };

  const handleDateChange = (e) =>
    setNewVideo((prev) => ({ ...prev, date: e.target.value }));

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    try {
      const uploadResponse = await uploadFile(file);
      console.log(uploadResponse);
      setNewVideo((prev) => ({ ...prev,attachment: uploadResponse }))
  
  
    } catch (error) {
      console.error("File upload failed:", error);
    }
  };
  const axiosPrivateHook = useAxiosPrivate();

  const handlePostData = async (e) => {
    e.preventDefault();
    try {
      let res;

      if (isAdding) {
        console.log(newVideo ,"data")
        res = await axiosPrivateHook.post(uploadVideos, newVideo);
      } else if (isEditing && currentVideo) {
        res = await axiosPrivateHook.put(`${uploadVideos}/${currentVideo?._id}`, newVideo);
      }

      if (isAdding && res.status === 200) {
        setIsAdding(false);
        fetchVideos()
        toast.success("Video Added Successfully ")
      }
      if (isEditing && res.status === 200) {
        setIsEditing(false);
        const updatedVideos = videos.map((video) =>
          String(video._id) === String(currentVideo._id) ? res.data.result : video
        );
        fetchVideos()
        setVideos(updatedVideos);
      }

      setCurrentVideo(null);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteClick = async (id) =>{
    try {
      const res = await axiosPrivateHook.delete(`${uploadVideos}/${id}`)

      if (res.status === 200) {
        fetchVideos()
      }

    } catch (error) {

    }
  };
  const resetForm = () =>
    setNewVideo({ title: "", date: "", attachment: "", isVideo: false });

  const handleCloseModal = () => {
    setIsAdding(false);
    setIsEditing(false);
    setCurrentVideo(null);
    resetForm();
  };

  if (loading) return <div>Loading videos...</div>;

  return (
    <div className="h-screen w-full overflow-hidden">
      <div className="pb-36 overflow-y-auto h-full scrollbar-hide">
        <div className="flex flex-col mb-6">
          <h1 className="flex text-2xl font-bold text-primaryColor lg:hidden">Video</h1>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center px-4px">
            <Breadcrumbs items={breadcrumbsItems} className="custom-breadcrumbs" />
            <div className="flex flex-col lg:flex-row gap-2 lg:gap-2">
              <button
                className="p-2 px-4px mr-5px lg:w-[150px] flex items-center justify-center bg-white border border-[#9C2677] text-[#9C2677] hover:text-gray-800 font-medium rounded-lg"
                onClick={handleAddNewClick}
              >
                + Add video
              </button>
            </div>
          </div>
        </div>
        {videosItems.length === 0 ? (
          <div className="text-center mt-10 text-lg justify-center items-center text-gray-500">
            No videos available.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-1">
            {videosItems.map((video) => (
              <VideoCard
                key={video._id}
                video={video}
                onEditClick={handleEditClick}
                onDeleteClick={handleDeleteClick}
              />
            ))}
          </div>
        )}
      </div>
      {(isAdding || isEditing) && (
        <AddModal
          isAdding={isAdding}
          isEditing={isEditing}
          newVideo={newVideo}
          onAddChange={handleAddChange}
          onDateChange={handleDateChange}
          onUpload={handleUpload}
          onSubmit={handlePostData} 
          onClose={handleCloseModal}
          onReset={resetForm}
        />
      )}
    </div>
  );
};

export default VideoPage;
