import React, { useState } from 'react'
import Breadcrumbs from '../../components/common/Breadcrumbs'
import VideoCard from '../../components/video/VideoCard';
import AddModal from '../../components/video/AddModal';
const breadcrumbsItems = [
    { label: "Media", href: "/content-management/media" },
    { label: "Video", href: "/content-management/media/video" },
  ];
  
const MediaVideoPage = () => {
    const [videos, setVideos] = useState([]);
    // const { loading, videosItems, fetchVideos } = useVideos();
    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentVideo, setCurrentVideo] = useState(null);
    const [newVideo, setNewVideo] = useState({
      title: "",
      date: "",
      ytlink: "",
      isVideo: true,
    });
    const handleAddNewClick = () => {
      console.log("Add button clicked"); // Check if this logs on click
      setIsAdding(true);
      setIsEditing(false);
      console.log("isAdding:", isAdding, "isEditing:", isEditing); // Check if states are updating
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

      const handleDeleteClick = async (id) => {
        // try {
        //   const res = await axiosPrivateHook.delete(`${uploadVideos}/${id}`);
        //   if (res.status === 200) {
        //     fetchVideos();
        //     toast.success("Video deleted successfully");
        //   }
        // } catch (error) {
        //   console.error("Failed to delete video:", error);
        //   toast.error("An error occurred while deleting the video.");
        // }
      };
      const resetForm = () =>
        setNewVideo({ title: "", date: "", ytlink: "", isVideo: true });
    const handleCloseModal = () => {
        setIsAdding(false);
        setIsEditing(false);
        setCurrentVideo(null);
        resetForm();
      };
    
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
      {videos.length === 0 ? (
        <div className="text-center mt-10 text-lg text-gray-500">
          No videos available.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-1">
          {videos.map((video) => (
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
        // onSubmit={handlePostData}
        onClose={handleCloseModal}
        onReset={resetForm}
      />
    )}
  </div>
  )
}

export default MediaVideoPage
