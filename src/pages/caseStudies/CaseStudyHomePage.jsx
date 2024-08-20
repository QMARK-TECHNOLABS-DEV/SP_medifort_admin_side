
import React, { useState } from 'react';
import CaseStudyTopPart from '../../components/caseStudies/CaseStudyTopPart';
import CaseStudyCards from '../../components/caseStudies/CaseStudyCards';
import AddNewModal from '../../components/caseStudies/AddNewModal';

const CaseStudyHomePage = () => {
  const [caseStudies, setCaseStudies] = useState([
    { title: "Nourishing Recovery Amidst Medical Challenges", author: "Reo George", date: "03/01/24" },
    { title: "Innovative Solutions for Sustainable Living", author: "Alice Smith", date: "03/15/24" },
    { title: "Empowering Communities Through Technology", author: "Sam Patel", date: "03/29/24" }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStudy, setCurrentStudy] = useState(null); // Track which study is being edited
  
  const addNewCaseStudy = (newStudy) => {
    if (currentStudy !== null) {
      // Edit mode
      const updatedStudies = caseStudies.map((study, index) => 
        index === currentStudy ? newStudy : study
      );
      setCaseStudies(updatedStudies);
      setCurrentStudy(null);
    } else {
      // Add new study
      setCaseStudies([...caseStudies, newStudy]);
    }
    setIsModalOpen(false); // Close modal after adding/editing
  };

  const editCaseStudy = (index) => {
    setCurrentStudy(index); // Set the study to be edited
    setIsModalOpen(true); // Open modal for editing
  };

  const deleteCaseStudy = (index) => {
    const updatedStudies = caseStudies.filter((_, i) => i !== index);
    setCaseStudies(updatedStudies);
  };

  return (
    <div className='ml-10 mr-4'>
      <CaseStudyTopPart addNewCaseStudy={() => setIsModalOpen(true)} />
      <section>
        <CaseStudyCards caseStudies={caseStudies} onEdit={editCaseStudy} onDelete={deleteCaseStudy} />
      </section>
      {isModalOpen && (
        <AddNewModal
          show={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          addNewCaseStudy={addNewCaseStudy}
          initialStudy={currentStudy !== null ? caseStudies[currentStudy] : null}
        />
      )}
    </div>
  );
};

export default CaseStudyHomePage;



