import { toast } from 'react-toastify';
// import useAxiosPrivate from '../hooks/useAxiosPrivate'

import { uploadRoute } from '../utils/Endpoint';
import { axiosPrivate } from '../axios-folder/axios';

const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axiosPrivate.post(uploadRoute, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    // Extracting the file data from the response
    const { name, key, location } = response.data.file;
    
    // Success toast notification
    toast.success("File uploaded successfully!");

    return { name, key, location };
  } catch (error) {
    // Error toast notification
    toast.error("File upload failed. Please try again.");
    console.error("File upload failed", error);
    throw error;
  }
};

export default uploadFile;