import React, { useState } from "react";
import videoImage from "../../assets/testimonials/videoimage.png"; // Default Thumbnail
import clientVideo from "../../assets/testimonials/Client.mp4"; // Local video file
import Breadcrumbs from "../../components/common/Breadcrumbs";

const TestiComp = () => {
  const [videos, setVideos] = useState([
    { id: 1, name: "Reo George", date: "2024-01-03", src: clientVideo, thumb: videoImage, isYouTube: false },
    { id: 2, name: "Reo George", date: "2024-01-03", src: clientVideo, thumb: videoImage, isYouTube: false },
    { id: 3, name: "Reo George", date: "2024-01-03", src: clientVideo, thumb: videoImage, isYouTube: false },
    { id: 4, name: "Reo George", date: "2024-01-03", src: clientVideo, thumb: videoImage, isYouTube: false },
  ]);

  const breadcrumbsItems = [
    { label: "Testimonials", href: "/testimonials" },
    { label: "Video", href: "/testimonials/video" },
  ];

  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [playingVideoId, setPlayingVideoId] = useState(null);

  const [newVideo, setNewVideo] = useState({ name: "", date: "", src: "", isYouTube: false });

  const handleAddClick = () => {
    setIsAdding(true);
    setIsEditing(false);
  };

  const handleAddChange = (e) => {
    const { name, value } = e.target;
    setNewVideo({ ...newVideo, [name]: value });
  };

  const handleDateChange = (e) => {
    setNewVideo({ ...newVideo, date: e.target.value });
  };

  const extractYouTubeId = (url) => {
    const match = url.match(/(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|v\/|e\/|watch\?v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    return match ? match[1] : null;
  };

  const getYouTubeThumbnailUrl = (videoId) => `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const newId = videos.length ? videos[videos.length - 1].id + 1 : 1;
    const isYouTube = newVideo.src.includes("youtube.com") || newVideo.src.includes("youtu.be");
    const videoSrc = isYouTube ? `https://www.youtube.com/embed/${extractYouTubeId(newVideo.src)}` : clientVideo;
    const videoThumb = isYouTube ? getYouTubeThumbnailUrl(extractYouTubeId(newVideo.src)) : videoImage;
    setVideos([...videos, { id: newId, ...newVideo, src: videoSrc, thumb: videoThumb, isYouTube }]);
    setIsAdding(false);
    resetForm();
  };

  const handleEditClick = (video) => {
    setIsEditing(true);
    setIsAdding(false);
    setCurrentVideo(video);
    setNewVideo({ name: video.name, date: video.date, src: video.src, isYouTube: video.isYouTube });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const isYouTube = newVideo.src.includes("youtube.com") || newVideo.src.includes("youtu.be");
    const videoSrc = isYouTube ? `https://www.youtube.com/embed/${extractYouTubeId(newVideo.src)}` : clientVideo;
    const videoThumb = isYouTube ? getYouTubeThumbnailUrl(extractYouTubeId(newVideo.src)) : videoImage;
    setVideos(
      videos.map((video) =>
        video.id === currentVideo.id ? { ...video, ...newVideo, src: videoSrc, thumb: videoThumb, isYouTube } : video
      )
    );
    setIsEditing(false);
    setCurrentVideo(null);
    resetForm();
  };

  const resetForm = () => {
    setNewVideo({ name: "", date: "", src: "", isYouTube: false });
  };

  const handleDelete = (id) => {
    setVideos(videos.filter((video) => video.id !== id));
  };

  const closeModal = () => {
    setIsAdding(false);
    setIsEditing(false);
    resetForm();
  };

  const handleThumbnailClick = (id) => {
    setPlayingVideoId(id === playingVideoId ? null : id);
  };

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
            key={video.id}
            className="relative rounded-lg overflow-hidden shadow-lg bg-white border border-blue-200"
          >
            <div
              className="relative cursor-pointer"
              onClick={() => handleThumbnailClick(video.id)}
            >
              {playingVideoId === video.id ? (
                video.isYouTube ? (
                  <iframe
                    className="w-full h-40"
                    src={video.src}
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <video
                    className="w-full h-40 object-cover"
                    src={video.src}
                    controls
                    autoPlay
                  />
                )
              ) : (
                <img
                  className="w-full h-40 object-cover"
                  src={video.thumb}
                  alt="Video Thumbnail"
                />
              )}
              {/* Pause Icon */}
              {playingVideoId !== video.id && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-black bg-white p-2 rounded-full"
                      viewBox="0 0 24 24"
                      fill=""
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ width: '2rem', height: '2rem' }} // Increase the icon size
                    >
                      <path d="M6 19L17 12L6 5V19Z" />
                    </svg>
                  </div>
                </div>
              )}
              <div className="absolute top-2 right-2 flex space-x-2">
                <button
                  className="bg-white rounded-full p-2 shadow-md"
                  onClick={() => handleEditClick(video)}
                >
                  {/* Pencil icon SVG */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-600"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 20h9" />
                    <path d="M16.5 3.5a2.121 2.121 0 113 3L7 19l-4 1 1-4L16.5 3.5z" />
                  </svg>
                </button>
                <button
                  className="bg-white rounded-full p-2 shadow-md"
                  onClick={() => handleDelete(video.id)}
                >
                  {/* Trash icon SVG */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-600"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6l-.867 12.142A2 2 0 0116.134 20H7.866a2 2 0 01-1.999-1.858L5 6m5-4h4a2 2 0 012 2v2H8V4a2 2 0 012-2z" />
                  </svg>
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
            <form onSubmit={isAdding ? handleAddSubmit : handleEditSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={newVideo.name}
                  onChange={handleAddChange}
                  className="border border-gray-300 rounded-lg w-full px-4 py-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Date</label>
                <input
                  type="date"
                  name="date"
                  value={newVideo.date}
                  onChange={handleDateChange}
                  className="border border-gray-300 rounded-lg w-full px-4 py-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Video URL</label>
                <input
                  type="text"
                  name="src"
                  value={newVideo.src}
                  onChange={handleAddChange}
                  className="border border-gray-300 rounded-lg w-full px-4 py-2"
                  required
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

export default TestiComp;
