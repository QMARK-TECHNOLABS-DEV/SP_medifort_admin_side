import React, { useState } from "react";
import videoImage from "../../assets/testimonials/videoimage.png"; // Thumbnail image
import clientVideo from "../../assets/testimonials/Client.mp4"; // Local video file

const TestiComp = () => {
  const [videos, setVideos] = useState([
    { id: 1, name: "Reo George", date: "2024-01-03", src: clientVideo, thumb: videoImage, isYouTube: false },
    { id: 2, name: "Reo George", date: "2024-01-03", src: clientVideo, thumb: videoImage, isYouTube: false },
    { id: 3, name: "Reo George", date: "2024-01-03", src: clientVideo, thumb: videoImage, isYouTube: false },
    { id: 4, name: "Reo George", date: "2024-01-03", src: clientVideo, thumb: videoImage, isYouTube: false },
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [playingVideoId, setPlayingVideoId] = useState(null);

  const [newVideo, setNewVideo] = useState({ name: "", date: "", src: "", thumb: videoImage, isYouTube: false });

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

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const newId = videos.length ? videos[videos.length - 1].id + 1 : 1;
    const isYouTube = newVideo.src.includes("youtube.com") || newVideo.src.includes("youtu.be");
    const videoSrc = isYouTube ? `https://www.youtube.com/embed/${extractYouTubeId(newVideo.src)}` : clientVideo;
    setVideos([...videos, { id: newId, ...newVideo, src: videoSrc, isYouTube }]);
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
    setVideos(
      videos.map((video) =>
        video.id === currentVideo.id ? { ...video, ...newVideo, src: videoSrc, isYouTube } : video
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
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <h2 className="text-gray-500 text-xl font-semibold">Testimonials</h2>
          <span className="text-gray-500 text-xl font-semibold mx-2">&gt;</span>
          <h3 className="text-gray-700 text-xl font-semibold">Video</h3>
        </div>
        <button
          className="border-2 border-pink-500 text-pink-500 py-2 px-4 rounded-lg hover:border-pink-600 hover:text-pink-600"
          onClick={handleAddClick}
        >
          + Add Video
        </button>
      </div>

      {/* Scrollable Video Grid */}
      <div className="grid grid-cols-2 gap-4 max-h-[70vh] overflow-y-auto">
        {videos.map((video) => (
          <div
            key={video.id}
            className="rounded-lg overflow-hidden shadow-lg bg-white border border-blue-200"
          >
            <div className="relative">
              {playingVideoId === video.id ? (
                video.isYouTube ? (
                  <iframe
                    className="w-full h-40"
                    src={video.src}
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <video className="w-full h-40 object-cover" src={video.src} controls autoPlay />
                )
              ) : (
                <img
                  className="w-full h-40 object-cover cursor-pointer"
                  src={video.thumb}
                  alt="Video Thumbnail"
                  onClick={() => handleThumbnailClick(video.id)}
                />
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
                    <path d="M3 6h18" />
                    <path d="M8 6v-2c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2v2" />
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                    <path d="M10 11v6" />
                    <path d="M14 11v6" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="flex justify-between items-center px-4 py-2">
              <h3 className="font-medium text-md text-left">{video.name}</h3>
              <p className="text-sm text-gray-500 text-left">{video.date}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Adding/Editing Video */}
      {(isAdding || isEditing) && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative overflow-auto max-h-[90vh]">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={closeModal}
            >
              {/* Close button */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <h2 className="text-lg font-semibold mb-4 text-left">
              {isAdding ? "Add New" : "Edit Video"}
            </h2>
            <form onSubmit={isAdding ? handleAddSubmit : handleEditSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2 text-left">Patient Name</label>
                <input
                  type="text"
                  name="name"
                  value={newVideo.name}
                  onChange={handleAddChange}
                  className="w-full px-3 py-2 bg-gray-300 border rounded-md"
                  placeholder="General health checkup"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2 text-left">Date</label>
                <input
                  type="date"
                  name="date"
                  value={newVideo.date}
                  onChange={handleDateChange}
                  className="w-full bg-gray-300 px-3 py-2 border rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2 text-left">YouTube Link</label>
                <input
                  type="text"
                  name="src"
                  value={newVideo.src}
                  onChange={handleAddChange}
                  className="w-full bg-gray-300 px-3 py-2 border rounded-md"
                  placeholder="https://www.youtube.com/watch?v="
                  required
                />
              </div>
              <div className="flex justify-start space-x-2">
                <button
                  type="submit"
                  className="bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-600"
                >
                  {isAdding ? "Add " : "Save Changes"}
                </button>
                <button
                  type="button"
                  className="bg-gray-300 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-400"
                  onClick={resetForm}
                >
                  Reset
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
