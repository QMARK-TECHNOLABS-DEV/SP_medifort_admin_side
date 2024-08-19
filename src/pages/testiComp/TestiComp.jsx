import React, { useState } from "react";
import thumbnail from "../../assets/testimonials/Client.mp4"; // Ensure the video path is correct

const TestiComp = () => {
  const [videos, setVideos] = useState([
    { id: 1, name: "Reo George", date: "2024-01-03", src: thumbnail },
    { id: 2, name: "Reo George", date: "2024-01-03", src: thumbnail },
    { id: 3, name: "Reo George", date: "2024-01-03", src: thumbnail },
    { id: 4, name: "Reo George", date: "2024-01-03", src: thumbnail },
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);

  const [newVideo, setNewVideo] = useState({ name: "", date: "", src: "", isYouTube: false });

  const handleAddClick = () => {
    setIsAdding(true);
  };

  const handleAddChange = (e) => {
    const { name, value } = e.target;
    setNewVideo({ ...newVideo, [name]: value });
  };

  const handleDateChange = (e) => {
    setNewVideo({ ...newVideo, date: e.target.value });
  };

  const extractYouTubeID = (url) => {
    const regex = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();

    const youTubeID = extractYouTubeID(newVideo.src);
    const isYouTube = !!youTubeID;

    const newId = videos.length ? videos[videos.length - 1].id + 1 : 1;
    setVideos([...videos, { id: newId, ...newVideo, src: youTubeID ? `https://www.youtube.com/embed/${youTubeID}` : newVideo.src, isYouTube }]);
    setIsAdding(false);
    setNewVideo({ name: "", date: "", src: "", isYouTube: false });
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

    setVideos(
      videos.map((video) =>
        video.id === currentVideo.id ? { ...video, ...newVideo, src: youTubeID ? `https://www.youtube.com/embed/${youTubeID}` : newVideo.src, isYouTube } : video
      )
    );
    setIsEditing(false);
    setCurrentVideo(null);
    setNewVideo({ name: "", date: "", src: "", isYouTube: false });
  };

  const resetForm = () => {
    setNewVideo({ name: "", date: "", src: "", isYouTube: false });
  };

  const handleDelete = (id) => {
    setVideos(videos.filter((video) => video.id !== id));
  };

  return (
    <div className="p-6 w-full">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <h2 className="text-gray-700 text-xl font-semibold">Testimonials</h2>
          <span className="text-gray-700 text-xl font-semibold mx-2">&gt;</span> {/* Add ">" symbol here */}
          <h3 className="text-gray-700 text-xl font-semibold">Video</h3>
        </div>
        <button
          className="bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-600"
          onClick={handleAddClick}
        >
          + Add Video
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {videos.map((video) => (
          <div
            key={video.id}
            className="rounded-lg overflow-hidden shadow-lg bg-white border border-blue-200"
            style={{ width: "300px" }} // Reduce width of video boxes
          >
            <div className="relative">
              {video.isYouTube ? (
                <iframe
                  className="w-full h-32 object-cover"
                  src={video.src}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={video.name}
                ></iframe>
              ) : (
                <video className="w-full h-32 object-cover" src={video.src} controls />
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
            <div className="flex justify-between items-center px-4 py-2"> {/* Adjust padding */}
              <h3 className="font-medium text-md text-left">{video.name}</h3> {/* Align text to the left */}
              <p className="text-sm text-gray-500 text-left">{video.date}</p> {/* Align text to the left */}
            </div>
          </div>
        ))}
      </div>

      {(isAdding || isEditing) && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div
            className="bg-white p-6 rounded-lg"
            style={{
              width: "400px", // Reduced width of modal box
              padding: "20px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h2 className="text-2xl font-semibold mb-4 text-left">
              {isAdding ? "Add New" : "Edit Video"}
            </h2>
            <form
              onSubmit={isAdding ? handleAddSubmit : handleEditSubmit}
              className="flex flex-col"
            >
              <div className="mb-4">
                <label className="block text-gray-700 mb-1 text-left">
                  Patient Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={newVideo.name}
                  onChange={handleAddChange}
                  className="w-full p-2 border border-gray-300 rounded-lg bg-gray-300" // Light gray background
                  placeholder="General health checkup"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-1 text-left flex-grow">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={newVideo.date}
                  onChange={handleDateChange}
                  className="w-full p-2 border border-gray-300 rounded-lg bg-gray-300"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-1 text-left">
                  YouTube Link
                </label>
                <input
                  type="text"
                  name="src"
                  value={newVideo.src}
                  onChange={handleAddChange}
                  className="w-full p-2 border border-gray-300 rounded-lg bg-gray-300" // Light gray background
                  placeholder="https://www.youtube.com/watch?v="
                />
              </div>
              <div className="flex justify-start items-center space-x-4"> {/* Align buttons to left */}
                <button
                  type="submit"
                  className="bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-600"
                >
                  {isAdding ? "Add" : "Save"}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
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
