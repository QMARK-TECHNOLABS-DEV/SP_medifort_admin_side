import React, { useState } from 'react'
import { toast } from 'react-toastify';
import uploadFile from '../../hooks/uploadFile';
import { useNavigate } from 'react-router-dom';
import { uploadBrochures } from '../../utils/Endpoint';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const BrochureAlt = ({ data, setData, mode, setIsOpen, getData }) => {
    const navigate = useNavigate();

    const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50 MB

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file && file.size < MAX_FILE_SIZE) {
            try {
                const uploadResponse = await uploadFile(file);
                setData((prev) => ({
                    ...prev,
                    attachment: uploadResponse,
                }));
            } catch (error) {
                toast.error("Failed to upload file. Please try again.");
                console.error("Upload error:", error);
            }
        }
    };

    const handleCancelClick = () => {
        setData(null);
        setIsOpen(false)
    };

    const axiosPrivateHook = useAxiosPrivate();

    const handleSave = async (e) => {
        e.preventDefault();
        if (data?.attachment) {
            try {
                let res;

                if (mode === 'edit' && data?._id) {
                    res = await axiosPrivateHook.put(`${uploadBrochures}/${data?._id}`, data);
                }
                else {
                    res = await axiosPrivateHook.post(uploadBrochures, data);
                }

                if (res.status === 200) {
                    toast.success("success");
                    getData()
                    setIsOpen(false)
                }
            } catch (error) {
                console.error("Failed to submit content", error);
                toast.error("An error occurred while saving the content.");
            }
        } else {
            toast.error("Please add a title and upload a file first.");
        }
    };

    console.log({data})

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-md shadow-md relative w-80">
                <h3 className="text-lg mb-4 capitalize ">{mode} brochure</h3>
                <input
                    type="text"
                    value={data?.title}
                    onChange={(e) => setData(prev => ({ ...prev, title: e.target.value }))}
                    className="border p-2 mb-4 w-full"
                    placeholder="Title"
                />

                <input
                    type="file"
                    onChange={handleFileChange}
                    className="mb-4"
                />

                <div className="flex justify-end space-x-2">
                    <button
                        onClick={handleSave}
                        className="bg-primaryColor text-white px-4 py-2 rounded"
                    >
                        Save
                    </button>
                    <button
                        onClick={handleCancelClick}
                        className="text-gray-500 px-4 py-2 rounded hover:text-gray-700"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}

export default BrochureAlt