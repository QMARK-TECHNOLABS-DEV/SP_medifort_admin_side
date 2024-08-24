import React, { useState } from "react";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import VideoCard from "../../components/video/VideoCard";
import AddModal from "../../components/video/AddModal";
import thumbnail from "../../assets/testimonials/Client.mp4";

const breadcrumbsItems = [
  { label: "Health Talk", href: "/content-management/health-talk" },
  { label: "Video", href: "/content-management/video" },
];

const VideoPage = () => {
  const [videos, setVideos] = useState([
    { id: 1, name: "Reo George", date: "2024-01-03", src: thumbnail, isYouTube: false },
    { id: 2, name: "Reo George", date: "2024-01-03", src: thumbnail, isYouTube: false },
    { id: 3, name: "Reo George", date: "2024-01-03", src: thumbnail, isYouTube: false },
  ]);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [newVideo, setNewVideo] = useState({ name: "", date: "", src: "", isYouTube: false });

  const handleAddNewClick = () => setIsAdding(true);

  const handleAddChange = (e) => {
    const { name, value } = e.target;
    setNewVideo((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (e) => setNewVideo((prev) => ({ ...prev, date: e.target.value }));

  const extractYouTubeID = (url) => {
    const regex = /(?:youtube\.com\/(?:[^/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const youTubeID = extractYouTubeID(newVideo.src);
    const isYouTube = !!youTubeID;

    const newId = videos.length ? videos[videos.length - 1].id + 1 : 1;
    setVideos((prev) => [...prev, {
      id: newId,
      ...newVideo,
      src: youTubeID ? `https://www.youtube.com/embed/${youTubeID}` : newVideo.src,
      isYouTube,
    }]);
    setIsAdding(false);
    resetForm();
  };

  const handleEditClick = (video) => {
    setIsEditing(true);
    setCurrentVideo(video);
    setNewVideo({ name: video.name, date: video.date, src: video.src, isYouTube: video.isYouTube });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const youTubeID = extractYouTubeID(newVideo.src);
    const isYouTube = !!youTubeID;

    setVideos((prev) => prev.map((video) =>
      video.id === currentVideo.id
        ? { ...video, ...newVideo, src: youTubeID ? `https://www.youtube.com/embed/${youTubeID}` : newVideo.src, isYouTube }
        : video
    ));
    setIsEditing(false);
    setCurrentVideo(null);
    resetForm();
  };

  const handleDeleteClick = (id) => setVideos((prev) => prev.filter((video) => video.id !== id));

  const resetForm = () => setNewVideo({ name: "", date: "", src: "", isYouTube: false });

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
        <h1 className="flex text-2xl font-bold text-primaryColor lg:hidden">
          Video
        </h1>
       
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-1">
          {videos.map((video) => (
            <VideoCard
              key={video.id}
              video={video}
              onEditClick={handleEditClick}
              onDeleteClick={handleDeleteClick}
            />
          ))}
        </div>
      </div>
      {(isAdding || isEditing) && (
        <AddModal
          isAdding={isAdding}
          isEditing={isEditing}
          newVideo={newVideo}
          onAddChange={handleAddChange}
          onDateChange={handleDateChange}
          onSubmit={isAdding ? handleAddSubmit : handleEditSubmit}
          onClose={handleCloseModal}
          onReset={resetForm}
        />
      )}
    </div>
  );
};

export default VideoPage;
