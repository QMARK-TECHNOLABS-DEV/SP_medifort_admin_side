import React, { useState } from 'react';
import { FaTrashAlt } from "react-icons/fa";

const About = ({ updateObj, setUpdateObj, handleChange }) => {

  const handleMultiChange = (kind, index, e) => {
    const newItems = [...updateObj?.[kind]];
    newItems[index] = e.target.value;

    setUpdateObj((prev) => ({
      ...prev,
      [kind]: newItems
    }))

  }

  const handleObjectChange = (kind, field, index, e) => {
    const newItems = [...updateObj?.[kind]];
    newItems[index][field] = e.target.value;

    setUpdateObj((prev) => ({
      ...prev,
      [kind]: newItems
    }))

  }

  const handleAdd = (kind) => {
    setUpdateObj((prev) => ({
      ...prev,
      [kind]: [...updateObj?.[kind], '']
    }))
  }

  const handleAddObject = (kind) => {
    setUpdateObj((prev) => ({
      ...prev,
      [kind]: [...updateObj?.[kind], {}]
    }))
  }

  const handleDelete = (kind, index) => {
    const newItems = updateObj?.[kind]?.filter((item, i) => i !== index)
    setUpdateObj((prev) => ({
      ...prev,
      [kind]: newItems
    }))

  }


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
            name='about'
            value={updateObj?.about}
            onChange={handleChange}
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
                {updateObj?.experiences?.map((exp, index) => (
                  <div key={index} className="mb-2 flex items-center gap-4">
                    <input
                      type="text"
                      className="bg-[#B0BAC3] bg-opacity-40 w-full border border-gray-300 text-sm rounded-lg p-2.5 mb-2"
                      placeholder='Enter new experience'
                      value={exp}
                      onChange={(e) => handleMultiChange('experiences', index, e)}
                    />

                    <FaTrashAlt color='red'
                      onClick={() => handleDelete('experiences', index)}
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => handleAdd('experiences')}
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
                {updateObj?.areas_of_expertise?.map((exp, index) => (
                  <div key={index} className="mb-2 flex items-center gap-4">
                    <input
                      type="text"
                      className="bg-[#B0BAC3] bg-opacity-40 w-full border border-gray-300 text-sm rounded-lg p-2.5 mb-2"
                      placeholder='Enter new expertise'
                      value={exp}
                      onChange={(e) => handleMultiChange('areas_of_expertise', index, e)}
                    />

                    <FaTrashAlt color='red'
                      onClick={() => handleDelete('areas_of_expertise', index)}
                    />

                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => handleAdd('areas_of_expertise')}
                  className="text-xs text-blue-500 hover:underline"
                >
                  Add expertise
                </button>
              </div>

              {/* Add Opd timings input here eg: opd_timings: [{ days: "Mon - Sat", time: "9 am-3 pm" }] */}

              {/* OPD Timings Section */}
              <div className="mb-5">
                <label htmlFor="timing" className="block mb-2 text-sm font-medium text-left">
                  OPD Timings
                </label>
                {updateObj?.opd_timings?.map((exp, index) => (
                  <div key={index} className="mb-2 flex items-center gap-4">
                    <input
                      type="text"
                      className="bg-[#B0BAC3] bg-opacity-40 w-full border border-gray-300 text-sm rounded-lg p-2.5 mb-2"
                      placeholder='Enter new day/s'
                      value={exp?.['days']}
                      onChange={(e) => handleObjectChange('opd_timings', 'days', index, e)}
                    />
                    
                    <input
                      type="text"
                      className="bg-[#B0BAC3] bg-opacity-40 w-full border border-gray-300 text-sm rounded-lg p-2.5 mb-2"
                      placeholder='Enter new times'
                      value={exp?.['time']}
                      onChange={(e) => handleObjectChange('opd_timings', 'time', index, e)}
                    />

                    <FaTrashAlt color='red' size={32}
                      onClick={() => handleDelete('opd_timings', index)}
                    />

                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => handleAddObject('opd_timings')}
                  className="text-xs text-blue-500 hover:underline"
                >
                  Add opd timings
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
