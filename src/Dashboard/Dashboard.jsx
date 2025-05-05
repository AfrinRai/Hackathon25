import React, { useState } from 'react';

const Dashboard = () => {
  const [cgpa, setCgpa] = useState(3.25); // Default CGPA
  const [newCgpa, setNewCgpa] = useState(cgpa); // New CGPA input state
  const [isEditable, setIsEditable] = useState(false); // Flag to toggle CGPA input

  const handleCgpaChange = (e) => {
    setNewCgpa(parseFloat(e.target.value));
  };

  const handleUpdateClick = () => {
    setIsEditable(true); // Make CGPA input editable when clicked
  };

  const handleCgpaSubmit = () => {
    setCgpa(newCgpa); // Update the CGPA to the new value
    setIsEditable(false); // Disable editing after submission
  };

  return (
    <div className="ml-60 p-6 min-h-screen bg-gradient-to-br from-[#101b28] to-[#0f172a] text-white font-sans">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* Profile Card */}
        <div className="bg-opacity-20 backdrop-blur-xl rounded-3xl p-8 shadow-lg text-center border border-[#2d3b45]">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <img
                src="https://i.ibb.co.com/7NSv1jTj/hablu.jpg"
                alt="Hablu"
                className="w-32 h-32 md:w-36 md:h-36 rounded-full border-4 border-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 shadow-xl object-cover"
              />
              <div className="absolute -bottom-2 right-2 bg-cyan-500 text-white px-3 py-1 text-sm rounded-full animate-bounce">
                Hablu
              </div>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-100">Hablu</h2>
          
          {/* CGPA Section with Update Button */}
          <div className="mt-4">
            <p className="text-gray-300 text-lg">Current CGPA:</p>
            <div className="flex items-center justify-center gap-4 mt-2">
              <p className="text-2xl text-cyan-400 font-semibold">{cgpa}</p>
              <button
                onClick={handleUpdateClick}
                className="text-cyan-400 hover:text-cyan-600 transition duration-300"
              >
                ✏️ {/* Emoji for Edit */}
              </button>
            </div>
            
            {isEditable && (
              <div className="mt-4 flex items-center justify-center gap-4">
                <input
                  type="number"
                  step="0.01"
                  value={newCgpa}
                  onChange={handleCgpaChange}
                  className="mt-2 bg-gray-800 text-cyan-400 border-2 border-cyan-600 rounded-md p-3 w-full md:w-72"
                />
                <button
                  onClick={handleCgpaSubmit}
                  className="bg-cyan-600 text-white px-6 py-3 rounded-md hover:bg-cyan-500 transition duration-300"
                >
                  Update
                </button>
              </div>
            )}
            {!isEditable && (
              <p className="mt-2 text-sm text-gray-400">Click the ✏️ icon to change your CGPA</p>
            )}
          </div>
        </div>

        {/* Skills Section */}
        <div className="bg-opacity-20 backdrop-blur-xl rounded-3xl p-8 shadow-lg border border-[#2d3b45]">
          <h3 className="text-2xl font-semibold border-b border-cyan-500 pb-2 mb-4 text-gray-200">Skills</h3>
          <div className="flex flex-wrap gap-4">
            {['React', 'Tailwind CSS', 'JavaScript', 'Figma', 'Teamwork'].map(skill => (
              <span key={skill} className="bg-gradient-to-r from-cyan-600 to-blue-500 text-white px-4 py-2 rounded-full text-md shadow-md">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Interested Jobs Section */}
        <div className="bg-opacity-20 backdrop-blur-xl rounded-3xl p-8 shadow-lg border border-[#2d3b45]">
          <h3 className="text-2xl font-semibold border-b border-cyan-500 pb-2 mb-4 text-gray-200">Interested Jobs</h3>
          <ul className="list-disc list-inside text-gray-300 text-lg space-y-3">
            <li>Frontend Developer</li>
            <li>UI/UX Designer</li>
            <li>Product Manager</li>
          </ul>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
