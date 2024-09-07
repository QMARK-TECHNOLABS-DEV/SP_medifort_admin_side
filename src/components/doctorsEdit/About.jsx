import React, { useState } from 'react';

const About = () => {
  const [experiences, setExperiences] = useState(['']);
  const [expertises, setExpertises] = useState(['']);

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

  const handleExperienceSubmit = () => {
    setExperiences([...experiences, '']);
  };

  const handleExpertiseSubmit = () => {
    setExpertises([...expertises, '']);
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
          <textarea
          rows={6}
          className="w-full max-h-[200px] bg-[#B0BAC3] bg-opacity-40 p-6 rounded-lg text-justify text-sm overflow-y-scroll " />
           
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
                      placeholder='Enter new experience'
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
                      placeholder='Enter new expertise'
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
