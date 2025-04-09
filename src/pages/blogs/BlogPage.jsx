import React, { useEffect, useState } from "react";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import CommonCard from "../../components/healthTalk/CommonCard";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../../components/common/DeleteModal";
import useBlog from "../../hooks/healthTalkHook/useBlog";
import SkeletonCard from "../../components/healthTalk/SkeletonCard";
import useGetAllDoctors from "../../hooks/doctor/useGetAllDoctors";
import PageHeaderpart from "../../components/common/PageHeaderpart";

const breadcrumbsItems = [
  { label: "Content Management", href: "/content-management" },
  { label: "Our Blogs", href: "/content-management/blog" },
];

const BlogPage = () => {
  const navigate = useNavigate();
  const { loading, blogItems, fetchBlog, deleteBlog } = useBlog();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [delayedLoading, setDelayedLoading] = useState(true);
  const { doctors } = useGetAllDoctors();
  const [blogWithAuthors, setBlogWithAuthors] = useState([]);

  useEffect(() => {
    const loadWithDelay = async () => {
      setDelayedLoading(true);
      await fetchBlog();
      setTimeout(() => setDelayedLoading(false), 2000); // Add a 2-second delay
    };
    loadWithDelay();
  }, []);

  useEffect(() => {
    // Set the blogItems with author names by fetching the doctor name based on the doctorId
    const fetchBlogAuthors = () => {
      const updatedBlogs = blogItems.map((blogItem) => {
        const authorDoctor = doctors.find((doctor) => doctor._id === blogItem.author);
        return {
          ...blogItem,
          author: authorDoctor ? authorDoctor.doctor_name : blogItem.author, // Fallback if no doctor is found
        };
      });
      setBlogWithAuthors(updatedBlogs);
    };

    if (blogItems.length > 0) {
      fetchBlogAuthors();
    }
  }, [blogItems, doctors]);

  const handleAddNewClick = () => {
    navigate("/content-management/blog/new-blog", {
      state: { isEdit: false, blogItems },
    });
  };

  const handleEditClick = (blog) => {
    navigate("/content-management/blog/new-blog", {
      state: { isEdit: true, blog },
    });
  };

  const handleDeleteClick = (Blog) => {
    setSelectedBlog(Blog);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedBlog) {
      await deleteBlog(selectedBlog._id);
    }
    setShowDeleteModal(false);
    setSelectedBlog(null);
  };

  const handleCloseModal = () => {
    setShowDeleteModal(false);
    setSelectedBlog(null);
  };

  return (
    <div className="h-screen w-full overflow-hidden mx-auto p-2">
      <header>
        <PageHeaderpart
          items={breadcrumbsItems}
          pageTitle={"Our Blogs"}
        >
          <div className="flex md:flex-row flex-col md:items-end  gap-4 w-full items-start justify-start ">
            {/* <SearchInput
                setSearch={setSearch}
              /> */}
            <button
             className="w-full sm:w-auto p-2 px-4 lg:w-[150px] flex items-center justify-center bg-white border border-primaryColor text-primaryColor font-medium rounded-lg"
              onClick={handleAddNewClick}
            >
              + Add new
            </button>
          </div>
        </PageHeaderpart>
      </header>
      <div className="pb-80 overflow-y-auto h-full scrollbar-hide">
        {/* ----- Mobile view only--------- */}
        {/* <h1 className="flex text-2xl font-bold text-primaryColor lg:hidden">Blog</h1>
        <div className="flex flex-col space-y-2">
          <Breadcrumbs items={breadcrumbsItems} />
          <div className="flex justify-between items-center mt-2">
            <div className="flex flex-col sm:flex-row sm:items-center"></div>

          </div>
        </div> */}
        {delayedLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 lg:gap-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        ) : blogWithAuthors.length === 0 ? (
          <div className="text-center mt-10 text-lg justify-center items-center text-gray-500">
            No articles available.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-2px py-1px">
            {blogWithAuthors.map((item) => (
              <CommonCard
                key={item.id}
                imageUrl={item.image?.location}
                title={item.title}
                author={item.author} // Author will now be the doctor's name
                date={item.updatedAt}
                onEditClick={() => handleEditClick(item)}
                onDeleteClick={() => handleDeleteClick(item)}
              />
            ))}
          </div>
        )}
      </div>
      <DeleteModal show={showDeleteModal} onClose={handleCloseModal} onConfirm={handleDeleteConfirm} />
    </div>
  );
};

export default BlogPage;
