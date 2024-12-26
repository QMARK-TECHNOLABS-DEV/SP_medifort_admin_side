import React, { useEffect, useState } from "react";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import VideoCard from "../../components/video/VideoCard";
import AddModal from "../../components/video/AddModal";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { uploadHealthVideos } from "../../utils/Endpoint";
import { toast } from "react-toastify";
import LoadingScreen from "../../components/common/LoadingScreen";
import useHealthVideos from "../../hooks/healthTalkHook/useHealthVideos";

const breadcrumbsItems = [
  { label: "Health Talk", href: "/content-management/health-talk" },
  { label: "Video", href: "/content-management/video" },
];

const VideoPage = () => {
  const [videos, setVideos] = useState([]);
  const { loading, videosItems, fetchVideos } = useHealthVideos();
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [delayedLoading, setDelayedLoading] = useState(true);
  const [newVideo, setNewVideo] = useState({
    title: "",
    date: "",
    ytlink: "",
    isVideo: true,
  });

  useEffect(() => {
    const loadWithDelay = async () => {
      setDelayedLoading(true);
    await fetchVideos();
    setTimeout(() => setDelayedLoading(false), 2000); // Add a 2-second delay
  };
  
  loadWithDelay();
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
      ytlink: video.ytlink,
      isVideo: true,
    });
  };

  const handleDateChange = (e) =>
    setNewVideo((prev) => ({ ...prev, date: e.target.value }));

  const extractYouTubeID = (url) => {
    const regex =
      /(?:youtube\.com\/(?:[^/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const axiosPrivateHook = useAxiosPrivate();

  const handlePostData = async (e) => {
    e.preventDefault();
    const youTubeID = extractYouTubeID(newVideo.ytlink);

    if (youTubeID) {
      const videoData = {
        ...newVideo,
        ytlink: `https://www.youtube.com/embed/${youTubeID}`, // Embed link format
      };

      try {
        let res;
        if (isAdding) {
          res = await axiosPrivateHook.post(uploadHealthVideos, videoData);
        } else if (isEditing && currentVideo) {
          res = await axiosPrivateHook.put(`${uploadHealthVideos}/${currentVideo._id}`, videoData);
        }

        if (res && res.status === 200) {
          toast.success(isAdding ? "Video added successfully" : "Video updated successfully");
          fetchVideos();
          handleCloseModal();
        }
      } catch (error) {
        console.error("Failed to save video:", error);
        toast.error("An error occurred while saving the video.");
      }
    } else {
      toast.error("Invalid YouTube URL");
    }
  };

  const handleDeleteClick = async (id) => {
    try {
      const res = await axiosPrivateHook.delete(`${uploadHealthVideos}/${id}`);
      if (res.status === 200) {
        fetchVideos();
        toast.success("Video deleted successfully");
      }
    } catch (error) {
      console.error("Failed to delete video:", error);
      toast.error("An error occurred while deleting the video.");
    }
  };

  const resetForm = () =>
    setNewVideo({ title: "", date: "", ytlink: "", isVideo: true });

  const handleCloseModal = () => {
    setIsAdding(false);
    setIsEditing(false);
    setCurrentVideo(null);
    resetForm();
  };

  if (delayedLoading) return(
    <div className="h-screen w-full overflow-hidden">

      <LoadingScreen/>
    </div>
  ) 

  return (
    <div className="h-screen w-full overflow-hidden">
      <div className="pb-36 overflow-y-auto h-full scrollbar-hide">
        <div className="flex flex-col mb-6">
          <h1 className="flex text-2xl font-bold text-primaryColor lg:hidden">Video</h1>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center px-4px">
            <Breadcrumbs items={breadcrumbsItems} className="custom-breadcrumbs" />
            <button
              className="p-2 px-4px mr-5px lg:w-[150px] flex items-center justify-center bg-white border border-[#9C2677] text-[#9C2677] hover:text-gray-800 font-medium rounded-lg"
              onClick={handleAddNewClick}
            >
              + Add video
            </button>
          </div>
        </div>
        {videosItems.length === 0 ? (
          <div className="text-center mt-10 text-lg text-gray-500">
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
          onSubmit={handlePostData}
          onClose={handleCloseModal}
          onReset={resetForm}
        />
      )}
    </div>
  );
};

export default VideoPage;
