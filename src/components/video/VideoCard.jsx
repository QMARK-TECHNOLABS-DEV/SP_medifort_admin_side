import React from "react";

const VideoCard = ({ video, onEditClick, onDeleteClick }) => {
  return (
    <div
      className="rounded-lg overflow-hidden shadow-lg bg-white border border-blue-200"
      style={{ width: "full" }} 
    >
      <div className="relative h-52"> 
     
          <video className="w-full h-full object-cover" src={video.attachment?.location}  
          autoPlay
           controls />
       
        <div className="absolute top-2 right-2 flex space-x-2">
          <button
            className="bg-white rounded-full p-2 shadow-md"
            onClick={() => onEditClick(video)}
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
            onClick={() => onDeleteClick(video._id)}
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
        <h3 className="font-medium text-md text-left">{video?.title}</h3>
        <p className="text-sm text-gray-500 text-left">{video?.date}</p>
      </div>
    </div>
  );
};

export default VideoCard;
