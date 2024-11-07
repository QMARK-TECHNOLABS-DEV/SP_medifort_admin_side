import React, { useEffect, useState } from 'react';
import CaseStudyTopPart from '../../components/caseStudies/CaseStudyTopPart';
import CaseStudyCards from '../../components/caseStudies/CaseStudyCards';
import AddNewModal from '../../components/caseStudies/AddNewModal';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { getCaseStudies } from '../../utils/Endpoint';
import { toast } from 'react-toastify';

const CaseStudyHomePage = () => {
  const [caseStudies, setCaseStudies] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStudy, setCurrentStudy] = useState(null); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const axiosPrivateHook = useAxiosPrivate();

  useEffect(() => {
    const fetchCaseStudies = async () => {
      setLoading(true);
      try {
        const response = await axiosPrivateHook.get(getCaseStudies);
        setCaseStudies(response.data.caseStudies); // Ensure caseStudies is an array
      } catch (err) {
        setError(err);
        toast.error('Failed to fetch case studies');
      } finally {
        setLoading(false);
      }
    };

    fetchCaseStudies();
  }, [axiosPrivateHook]);

  const addNewCaseStudy = (newStudy) => {
    if (currentStudy !== null) {
      // Edit mode
      const updatedStudies = caseStudies.map((study, index) =>
        index === currentStudy ? newStudy : study
      );
      setCaseStudies(updatedStudies);
      setCurrentStudy(null);  // Reset after editing
    } else {
      // Add new study
      setCaseStudies([...caseStudies, newStudy]);
    }
    setIsModalOpen(false);  // Close modal after adding/editing
  };

  const editCaseStudy = (index) => {
    setCurrentStudy(index);  // Set the study to be edited
    setIsModalOpen(true);  // Open modal for editing
  };

  const deleteCaseStudy = (index) => {
    const updatedStudies = caseStudies.filter((_, i) => i !== index);
    setCaseStudies(updatedStudies);
  };

  return (
    <div className="w-full">
      <CaseStudyTopPart title="Content management" />
      <section
        className="mt-5"
        style={{
          marginRight: '5px', // Add a smaller right margin to reduce the gap
        }}
      >
        {caseStudies.length === 0 ? (
          <div className="text-center mt-10 text-lg justify-center items-center text-gray-500">
            No Case Studies available.
          </div>
        ) : (
          <CaseStudyCards
            caseStudies={caseStudies}
            onEdit={editCaseStudy}
            onDelete={deleteCaseStudy}
          />
        )}
      </section>

      {isModalOpen && (
        <AddNewModal
          show={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          addNewCaseStudy={addNewCaseStudy}  // Pass the success handler for adding/editing
          initialStudy={currentStudy !== null ? caseStudies[currentStudy] : null}
        />
      )}
    </div>
  );
};

export default CaseStudyHomePage;
