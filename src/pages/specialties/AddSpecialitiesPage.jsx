import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import ReactQuill, { Quill } from 'react-quill';
import "react-quill/dist/quill.snow.css";
import {  uploadSpecialities } from '../../utils/Endpoint';
import { toast } from 'react-toastify';
import BlogPlaceholder from "../../assets/article/images.png";
import { HiPencilAlt } from "react-icons/hi";
import useImageCompression from '../../hooks/useImageCompression';
import uploadFile from '../../hooks/uploadFile';
import ImageDropAndPaste from "quill-image-drop-and-paste";
import imageResizeMin from "quill-image-resize-module-react";
import useGetAllDepartment from '../../hooks/departmentHook/useGetAllDepartment';

// Register the image resize module
Quill.register('modules/imageResize', imageResizeMin);
Quill.register("modules/imageDrop", ImageDropAndPaste);
const AddSpecialitiesPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isEdit, setIsEdit] = useState(false);
    const axiosPrivateHook = useAxiosPrivate();
    const initialState = {
        name: '',
        description: '',
        content: '',
        image: '',
        department: '',
        bannerBtnTxt: ''
    };
    const [specialities, setSpecialities] = useState(initialState);
    const [uploading, setUploading] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const quillRef = useRef(null);
    const { compressImage } = useImageCompression()
    const { department, loading, error } = useGetAllDepartment()
    const breadcrumbsItems = [
        { label: "Specialties", href: "/content-management/specialities" },
        { label: isEdit ? "Update specialities" : "New specialities", href: "/content-management/specialities/new-speciality" },
    ];
    useEffect(() => {
        if (location.state?.isEdit && location.state?.speciality) {
          setIsEdit(true);
          setSpecialities(location.state.speciality);
        }
      }, [location.state]);
      
    const handleChange = (e) => {
        const { name, value } = e.target;
        setSpecialities(prev => ({ ...prev, [name]: value }));
    };
    const handleEditorChange = (value) => {
        setSpecialities(prev => ({ ...prev, content: value }));
    };
    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                toast.error("File size exceeds 5MB. Please upload a smaller file.");
                return;
            }
            try {

                const compressedFile = await compressImage(file);
                const uploadResponse = await uploadFile(compressedFile);
                setSpecialities((prev) => ({ ...prev, image: uploadResponse }));
            } catch (error) {
                console.error("Image upload failed", error);
                toast.error("Failed to upload image.");
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("clecked")
        if (!specialities?.name || !specialities?.content) {
            alert("Please fill in all required fields.");
            return;
        }
        console.log(specialities)
        // Send the Blog data to the server
        const response = await axiosPrivateHook({
            method: isEdit ? "PUT" : "POST",
            url: isEdit ? `${uploadSpecialities}/${specialities._id}` : uploadSpecialities,
            data: specialities ,
            headers: { "Content-Type": "application/json" },
        });

        if (response.status === 200) {
            toast.success("Blog uploaded successfully");
        }

        setSpecialities(initialState);
        navigate("/content-management/specialities");
    };
    const handleEditorImageUpload = () => {
        const input = document.createElement("input");

        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
        input.click();

        input.onchange = async () => {
            const file = input.files[0];
            if (file) {
                try {
                    setUploading(true);

                    const compressedFile = await compressImage(file);
                    const uploadResponse = await uploadFile(compressedFile); // This should return just the image URL

                    const imageUrl = uploadResponse?.location || uploadResponse; // fallback if only URL is returned

                    if (quillRef.current) {
                        const quill = quillRef.current.getEditor();
                        const range = quill.getSelection(true);
                        quill.insertEmbed(range.index, "image", imageUrl);
                        quill.setSelection(range.index + 1);
                    }

                } catch (error) {
                    toast.error("Image upload failed.");
                    console.error("Image upload error:", error);
                } finally {
                    setUploading(false);
                }
            }
        };
    };

    const modules = useMemo(() => ({
        toolbar: {
            container: [
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                ['link', 'image', "video"],
                ['clean'],
            ],
            handlers: {
                image: handleEditorImageUpload
            }
        },
        history: {},
        clipboard: {},
        imageResize: {
            parchment: Quill.import('parchment'),
            modules: ['Resize', 'DisplaySize', 'Toolbar']
        },
        imageDrop: true
    }), []);

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet',
        'link', 'image', 'video'
    ];


    return (
        <div className="h-screen w-full overflow-hidden">
            <div className="pb-36 overflow-y-auto h-full px-6 scrollbar-hide">
                <div className="flex flex-col -ml-4 mb-6">
                    <h1 className="flex text-2xl font-bold text-primaryColor lg:hidden">
                        {isEdit ? "Update Blog" : "New Blog"}
                    </h1>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                        <Breadcrumbs items={breadcrumbsItems} />
                        <div className="flex flex-col lg:flex-row gap-4 lg:gap-4 mt-4 sm:mt-0">
                            <button
                                type="submit"
                                form="Specialities-form"
                                className="py-2 lg:w-[150px] inline-flex items-center justify-center bg-[#F8F9FA] border border-[#9C2677] text-[#9C2677] hover:text-gray-800 font-medium rounded-lg"
                            >
                                Save and submit
                            </button>
                            {isEdit && (
                                <button
                                    type="button"
                                    className="p-2 px-6 lg:w-[150px] flex items-center justify-center bg-[#F8F9FA] border border-[#9C2677] text-[#9C2677] hover:text-gray-800 font-medium rounded-lg"
                                    onClick={() => navigate("/content-management/specialities")}
                                >
                                    Cancel
                                </button>
                            )}
                        </div>
                    </div>
                </div>
                <form id="Specialities-form" onSubmit={handleSubmit}>
                    <div className="p-6">
                        <div className="flex flex-col lg:flex-row gap-6 mb-6">
                            <div className="relative  lg:w-1/2">
                                <img
                                    src={specialities?.image?.location ? specialities?.image.location : BlogPlaceholder}
                                    alt="Blog"
                                    className="w-full h-full bg-[#B0BAC366] object-cover rounded-lg"
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <label htmlFor="image-upload" className="cursor-pointer">
                                        <HiPencilAlt className="text-white text-6xl bg-black bg-opacity-50 rounded-full p-2" />
                                    </label>
                                    <input
                                        id="image-upload"
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleImageUpload}
                                    />
                                </div>
                            </div>

                            <div className="lg:w-1/2 sm:mt-32 flex flex-col gap-2">
                                <div className="">
                                    <label className="block text-sm text-left font-medium text-gray-700 mb-2">
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full p-2 border bg-[#B0BAC366] border-gray-300 rounded-lg"
                                        placeholder="Enter Blog title"
                                        name="name"
                                        value={specialities?.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="">
                                    <label className="block text-sm text-left font-medium text-gray-700 mb-2">
                                        Description
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full p-2 border bg-[#B0BAC366] border-gray-300 rounded-lg"
                                        placeholder="Enter Description"
                                        name="description"
                                        value={specialities?.description}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="">
                                    <label className="block text-sm text-left font-medium text-gray-700 mb-2">
                                        Department
                                    </label>
                                    <div className="flex flex-col gap-4">
                                        <select
                                            className="w-full  h-12 p-2 border bg-[#B0BAC366] border-gray-300 rounded-lg"
                                            value={specialities?.department}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                setSpecialities({ ...specialities, department: value });

                                            }}
                                        >
                                            <option value="" disabled>
                                                Select Department
                                            </option>
                                            {loading && <option>Loading doctors...</option>}
                                            {error && <option>Error loading doctors</option>}
                                            {!loading && !error && (
                                                <>
                                                    {department.map((dep) => (
                                                        <option key={dep._id} value={dep._id}>
                                                            {dep.dept_name}
                                                        </option>
                                                    ))}

                                                </>
                                            )}
                                        </select>
                                    </div>
                                </div>
                                <div className="">
                                    <label className="block text-sm text-left font-medium text-gray-700 mb-2">
                                        Banner Button Name
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full p-2 border bg-[#B0BAC366] border-gray-300 rounded-lg"
                                        placeholder="Enter  Banner Button Name"
                                        name="bannerBtnTxt"
                                        value={specialities?.bannerBtnTxt}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="quill-container relative">
                            <label className="block text-lg text-left font-semibold text-gray-700 mb-2">
                                Content
                            </label>
                            <ReactQuill
                                ref={quillRef}
                                modules={modules}
                                formats={formats}
                                theme="snow"
                                value={specialities.content}
                                onChange={handleEditorChange}
                                placeholder="Write your speciality content here..."
                                className="min-h-[500px] mb-12 [&_.ql-editor]:min-h-[500px]"
                            />
                            {uploading && (
                                <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center z-10">
                                    <div className="flex flex-col items-center">
                                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-2"></div>
                                        <span className="text-gray-700">Uploading image...</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default AddSpecialitiesPage
