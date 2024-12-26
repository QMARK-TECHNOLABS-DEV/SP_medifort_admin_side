import React, { useEffect, useState } from 'react'
import Breadcrumbs from '../../components/common/Breadcrumbs'
import VideoCardMedia from '../../components/media-video/VideoCardMedia';
import AddMediaVid from '../../components/media-video/AddMediaVid';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { toast } from 'react-toastify';
import { getVideos, uploadVideos } from '../../utils/Endpoint';

const breadcrumbsItems = [
  { label: "Media", href: "/content-management/media" },
  { label: "Video", href: "/content-management/media/video" },
];

const MediaVideoPage = () => {
  const axiosPrivateHook = useAxiosPrivate();

  const [videos, setVideos] = useState([]);
  // const { loading, videosItems, fetchVideos } = useVideos();
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);

  const newVidInitialState = {
    title: "",
    date: "",
    ytlink: "",
    attachment: null,

  }

  const [newVideo, setNewVideo] = useState(newVidInitialState);

  const [loading, setLoading] = useState(false);


  const handleAddNewClick = () => {
    console.log("Add button clicked"); // Check if this logs on click
    setIsAdding(true);
    setIsEditing(false);
    console.log("isAdding:", isAdding, "isEditing:", isEditing); // Check if states are updating
  };
  
  const handleAddChange = (e) => {
    const { name, value } = e.target;
    
    if(name === "ytlink" && value){
      setNewVideo((prev) => ({ ...prev, [name]: value, attachment: null }));
    }
    else{
      setNewVideo((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleEditClick = (video) => {
    setIsEditing(true);
    setCurrentVideo(video);
    setNewVideo({
      title: video.title,
      date: video.date,
      ytlink: video.ytlink,
      attachment: video.attachment,
    });
  };

  const handleDateChange = (e) => {
    setNewVideo((prev) => ({ ...prev, date: e.target.value }));

  }

  const handleDeleteClick = async (id) => {
    try {
      const res = await axiosPrivateHook.delete(`${uploadVideos}/${id}`);
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
    setNewVideo(newVidInitialState);
  const handleCloseModal = () => {
    setIsAdding(false);
    setIsEditing(false);
    setCurrentVideo(null);
    resetForm();
  };

  const fetchVideos = async () => {
    setLoading(true);
    try {
      const response = await axiosPrivateHook.get(getVideos);
      console.log(response.data);
      setVideos(response.data?.result ?? []);
    } catch (error) {
      toast.error('Failed to fetch Videos');
    }
    finally {
      setLoading(false);
    }
  };

  const extractYouTubeID = (url) => {
    const regex =
      /(?:youtube\.com\/(?:[^/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };


  const handlePostData = async (e) => {
    e.preventDefault();

    if (!(newVideo?.ytlink?.trim() || newVideo?.attachment?.location?.trim())) {
      return toast.info('Please Add a video')
    }

    let videoData;
    if (newVideo?.ytlink?.trim()) {
      const youTubeID = extractYouTubeID(newVideo.ytlink);
      videoData = {
        ...newVideo,
        ytlink: `https://www.youtube.com/embed/${youTubeID}`, // Embed link format
      };
    } else {
      videoData = newVideo
    }

    try {
      let res;
      if (isAdding) {
        res = await axiosPrivateHook.post(uploadVideos, videoData);
      } else if (isEditing && currentVideo) {
        res = await axiosPrivateHook.put(`${uploadVideos}/${currentVideo._id}`, videoData);
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

  };

  useEffect(() => {
    fetchVideos()
  }, [])

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
        {videos?.length === 0 ? (
          <div className="text-center mt-10 text-lg text-gray-500">
            No videos available.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-1">
            {videos.map((video) => (
              <VideoCardMedia
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
        <AddMediaVid
          isAdding={isAdding}
          isEditing={isEditing}
          newVideo={newVideo}
          setNewVideo={setNewVideo}
          onAddChange={handleAddChange}
          onDateChange={handleDateChange}
          onSubmit={handlePostData}
          onClose={handleCloseModal}
          onReset={resetForm}
        />
      )}
    </div>
  )
}

export default MediaVideoPage
