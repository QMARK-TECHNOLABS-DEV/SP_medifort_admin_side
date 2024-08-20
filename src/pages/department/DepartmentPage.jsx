import React, { useEffect, useState } from 'react';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import DepartmentCard from '../../components/department/DepartmentCard';
import departmentimg1 from '../../assets/department/Department1.jpeg';
import departmentimg2 from '../../assets/department/Department2.jpeg';
import departmentimg3 from '../../assets/department/Department3.jpeg';
import { useLocation, useNavigate } from 'react-router-dom';
import DeleteModal from '../../components/common/DeleteModal';

const breadcrumbsItems = [
    { label: "Content Management", href: "/content-management" },
    { label: "Manage Department", href: "/department" },
];

const DepartmentPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [departmentItems, setDepartmentItems] = useState([
        {
            id: 1,
            name: "Cardiology",
            imageUrl: departmentimg1,
            description: "Sample content for the department.",
        },
        {
            id: 2,
            name: "Nephrology",
            imageUrl: departmentimg2,
            description: "Another sample content.",
        },
        {
            id: 3,
            name: "Neurology",
            imageUrl: departmentimg3,
            description: "Another sample content.",
        },
        {
            id: 4,
            name: "Cardiology",
            imageUrl: departmentimg1,
            description: "Sample content for the department.",
        },
        {
            id: 5,
            name: "Nephrology",
            imageUrl: departmentimg2,
            description: "Another sample content.",
        },
        {
            id: 6,
            name: "Neurology",
            imageUrl: departmentimg3,
            description: "Another sample content.",
        }        
    ]);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedDepartment, setSelectedDepartment] = useState(null);

    useEffect(() => {
        if (location.state?.updatedDepartments) {
            setDepartmentItems(location.state.updatedDepartments);
        }
    }, [location.state?.updatedDepartments]);

    const handleAddNewClick = () => {
        navigate('/add-department', { state: { isEdit: false, departmentItems } });
    };

    const handleEditClick = (department) => {
        navigate('/add-department', { state: { isEdit: true, department, departmentItems } });
    };

    const handleDeleteClick = (department) => {
        setSelectedDepartment(department);
        setShowDeleteModal(true);
    };

    const handleDeleteConfirm = () => {
        const updatedDepartments = departmentItems.filter(item => item.id !== selectedDepartment.id);
        setDepartmentItems(updatedDepartments);
        setShowDeleteModal(false);
        setSelectedDepartment(null);
    };

    const handleCloseModal = () => {
        setShowDeleteModal(false);
        setSelectedDepartment(null);
    };

    return (
        <div className="h-screen w-full overflow-hidden mx-auto">
            <div className="pb-36 overflow-y-auto h-full">
                <div className="flex flex-col mb-6">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                        <Breadcrumbs items={breadcrumbsItems} />
                        <div className="flex flex-col lg:flex-row gap-2 lg:gap-2">
                            <button
                                className="p-2 px-4 mr-5 lg:w-[150px] flex items-center justify-center bg-white border border-[#9C2677] text-[#9C2677] hover:text-gray-800 font-medium rounded-lg"
                                onClick={handleAddNewClick}
                            >
                                + Add new
                            </button>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-6">
                    {departmentItems.map((item, index) => (
                        <DepartmentCard
                            key={item.id}
                            imageUrl={item.imageUrl}
                            name={item.name}
                            onEditClick={() => handleEditClick(item)}
                            onDeleteClick={() => handleDeleteClick(item)}
                        />
                    ))}
                </div>
            </div>
            <DeleteModal
                show={showDeleteModal}
                onClose={handleCloseModal}
                onConfirm={handleDeleteConfirm}
            />
        </div>
    );
}

export default DepartmentPage;
