import React, { useState } from "react";
import thumbnail from "../../assets/testimonials/Client.mp4"; // Ensure the video path is correct

const TestiComp = () => {
  const [videos, setVideos] = useState([
    { id: 1, name: "Reo George", date: "3rd Jan, 2024", src: thumbnail },
    { id: 2, name: "Reo George", date: "3rd Jan, 2024", src: thumbnail },
    { id: 3, name: "Reo George", date: "3rd Jan, 2024", src: thumbnail },
    { id: 4, name: "Reo George", date: "3rd Jan, 2024", src: thumbnail },
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [newVideo, setNewVideo] = useState({ name: "", date: "", src: "" });

  const convertYouTubeUrl = (url) => {
    try {
      const regExp = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
      if (regExp.test(url)) {
        const videoId =
          url.split("v=")[1]?.split("&")[0] || url.split("youtu.be/")[1];
        if (videoId) {
          return `https://www.youtube.com/embed/${videoId}`;
        }
      }
    } catch (error) {
      console.error("Invalid YouTube URL");
    }
    return url; // Return the original URL if not a valid YouTube link
  };

  const handleEditClick = (video) => {
    setCurrentVideo(video);
    setIsEditing(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setCurrentVideo({ ...currentVideo, [name]: value });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setVideos(
      videos.map((video) =>
        video.id === currentVideo.id ? currentVideo : video
      )
    );
    setIsEditing(false);
  };

  const handleDelete = (id) => {
    const updatedVideos = videos.filter((video) => video.id !== id);
    setVideos(updatedVideos);
  };

  const handleAddClick = () => {
    setIsAdding(true);
  };

  const handleAddChange = (e) => {
    const { name, value } = e.target;
    setNewVideo({ ...newVideo, [name]: value });
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const newId = videos.length ? videos[videos.length - 1].id + 1 : 1;
    const videoSrc = convertYouTubeUrl(newVideo.src); // Convert YouTube URL if needed
    setVideos([...videos, { id: newId, ...newVideo, src: videoSrc }]);
    setIsAdding(false);
    setNewVideo({ name: "", date: "", src: "" });
  };

  const resetForm = () => {
    setNewVideo({ name: "", date: "", src: "" });
  };

  const isYouTubeLink = (url) => {
    return url.includes("youtube.com") || url.includes("youtu.be");
  };

  return (
    <div className="p-6 w-full">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <h2 className="text-gray-700 text-xl font-semibold">Testimonials</h2>
          <span className="text-gray-800 text-xl"></span>
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
          >
            <div className="relative">
              {isYouTubeLink(video.src) ? (
                <iframe
                  className="w-full h-32"
                  src={video.src}
                  title={video.name}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video
                  className="w-full h-32 object-cover"
                  src={video.src}
                  controls
                />
              )}
              <div className="absolute top-2 right-2 flex space-x-2">
                <button
                  className="bg-gray-200 p-2 rounded-full hover:bg-gray-300"
                  onClick={() => handleEditClick(video)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.232 5.232l3.536 3.536m-2.036-5.232a2.121 2.121 0 113.001 3.001L6.343 21.414a8.528 8.528 0 01-3.897 2.065 0.4 0.4 0 01-.514-.513 8.528 8.528 0 012.065-3.897L16.732 3.732z"
                    />
                  </svg>
                </button>
                <button
                  className="bg-gray-200 p-2 rounded-full hover:bg-gray-300"
                  onClick={() => handleDelete(video.id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-600"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 3v1H4v2h16V4h-5V3H9zM5 8v12a2 2 0 002 2h10a2 2 0 002-2V8H5zm7 10H9v-6h2v6zm4 0h-2v-6h2v6z" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="flex justify-between items-center px-6 py-4">
              <h3 className="font-medium text-md">{video.name}</h3>
              <span className="flex-grow"></span>{" "}
              {/* This will push the date to the right */}
              <p className="text-sm text-gray-500">{video.date}</p>
            </div>
          </div>
        ))}
      </div>

      {isEditing && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Edit Video</h2>
            <form onSubmit={handleEditSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Patient name</label>
                <input
                  type="text"
                  name="name"
                  value={currentVideo.name}
                  onChange={handleEditChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Date</label>
                <input
                  type="text"
                  name="date"
                  value={currentVideo.date}
                  onChange={handleEditChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-600"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isAdding && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Add New Video</h2>
            <form onSubmit={handleAddSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={newVideo.name}
                  onChange={handleAddChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Date</label>
                <input
                  type="text"
                  name="date"
                  value={newVideo.date}
                  onChange={handleAddChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Video URL</label>
                <input
                  type="text"
                  name="src"
                  value={newVideo.src}
                  onChange={handleAddChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
                >
                  Reset
                </button>
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-600"
                >
                  Add Video
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
