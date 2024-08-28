import React, { useState } from 'react';

const About = () => {
  const [experiences, setExperiences] = useState(['']);
  const [expertises, setExpertises] = useState(['']);
  const [educations, setEducations] = useState(['']);

  const handleExperienceChange = (index, e) => {
    const newExperiences = [...experiences];
    newExperiences[index] = e.target.value;
    setExperiences(newExperiences);
  };

  const handleExpertiseChange = (index, e) => {
    const newExpertises = [...expertises];
    newExpertises[index] = e.target.value;
    setExpertises(newExpertises);
  };

  const handleEducationChange = (index, e) => {
    const newEducations = [...educations];
    newEducations[index] = e.target.value;
    setEducations(newEducations);
  };

  const handleExperienceSubmit = () => {
    setExperiences([...experiences, '']);
  };

  const handleExpertiseSubmit = () => {
    setExpertises([...expertises, '']);
  };

  const handleEducationSubmit = () => {
    setEducations([...educations, '']);
  };

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden', // Hide scrollbar
      }}
    >
      <div
        style={{
          flex: 1,
          overflowY: 'scroll', // Allow scrolling
          padding: '16px',
          msOverflowStyle: 'none', // Hide scrollbar in Internet Explorer and Edge
          scrollbarWidth: 'none', // Hide scrollbar in Firefox
        }}
      >
        <div className="mb-8">
          <h1 className="text-left mb-2">About</h1>
          <p className="bg-[#B0BAC3] bg-opacity-40 p-6 rounded-lg text-justify text-sm">
            Dr Cherian M Thomas is an experienced orthopaedic surgeon in Mumbai, with over<br />
            32 years of experience overall. He specialises in hip and knee replacement surgeries,<br />
            foot injury treatment, and lower extremity wound care. His extensive experience has<br />
            made him one of the best orthopaedic surgeons in Mumbai.
          </p>
        </div>
        <div>
          <form className="flex flex-wrap gap-8">
            <div className="flex flex-col w-full md:w-1/2">
              {/* Experience Section */}
              <div className="mb-5">
                <label htmlFor="experience" className="block mb-2 text-sm font-medium text-left">
                  Experience
                </label>
                {experiences.map((exp, index) => (
                  <div key={index} className="mb-2">
                    <input
                      type="text"
                      className="bg-[#B0BAC3] bg-opacity-40 w-full border border-gray-300 text-sm rounded-lg p-2.5 mb-2"
                      placeholder={index === 0 ? '32 years' : 'Enter new experience'}
                      value={exp}
                      onChange={(e) => handleExperienceChange(index, e)}
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleExperienceSubmit}
                  className="text-xs text-blue-500 hover:underline"
                >
                  Add experience
                </button>
              </div>

              {/* Education Section */}
              <div className="mb-5">
                <label htmlFor="education" className="block mb-2 text-sm font-medium text-left">
                  Education
                </label>
                {educations.map((edu, index) => (
                  <div key={index} className="mb-2">
                    <input
                      type="text"
                      className="bg-[#B0BAC3] bg-opacity-40 w-full border border-gray-300 text-sm rounded-lg p-2.5 mb-2"
                      placeholder={index === 0 ? 'MBBS, MS (Gen. Surgery), FMAS' : 'Enter new education'}
                      value={edu}
                      onChange={(e) => handleEducationChange(index, e)}
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleEducationSubmit}
                  className="text-xs text-blue-500 hover:underline"
                >
                  Add education
                </button>
              </div>

              {/* Expertise Section */}
              <div className="mb-5">
                <label htmlFor="expertise" className="block mb-2 text-sm font-medium text-left">
                  Areas of Expertise
                </label>
                {expertises.map((exp, index) => (
                  <div key={index} className="mb-2">
                    <input
                      type="text"
                      className="bg-[#B0BAC3] bg-opacity-40 w-full border border-gray-300 text-sm rounded-lg p-2.5 mb-2"
                      placeholder={index === 0 ? 'Hip and knee replacement surgeries' : 'Enter new expertise'}
                      value={exp}
                      onChange={(e) => handleExpertiseChange(index, e)}
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleExpertiseSubmit}
                  className="text-xs text-blue-500 hover:underline"
                >
                  Add expertise
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default About;
