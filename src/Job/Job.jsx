import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Job = () => {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({
    skills: '',
    location: '',
    salary: '',
  });

  useEffect(() => {
    axios.get(`http://localhost:5000/api/match?skills=${filters.skills}&location=${filters.location}&salary=${filters.salary}`)
      .then((res) => {
        console.log('Filtered jobs:', res.data); // Log response
        setJobs(res.data);
      })
      .catch((err) => {
        console.error('Error:', err);
      });
  }, [filters]); // Re-run the effect when filters change

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleFilter = (e) => {
    e.preventDefault();
    // Trigger the filtering process on form submission
    axios.get(`http://localhost:5000/api/match?skills=${filters.skills}&location=${filters.location}&salary=${filters.salary}`)
      .then((res) => {
        console.log('Filtered jobs:', res.data);
        setJobs(res.data);
      })
      .catch((err) => {
        console.error('Filter error:', err);
      });
  };

  return (
    <div className="ml-60 p-6 min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-10">🚀 Job Listings</h1>

      <form
        onSubmit={handleFilter}
        className="bg-white shadow-md rounded-xl p-6 mb-10 grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        <input
          type="text"
          name="skills"
          placeholder="🔍 Skill (e.g. Frontend)"
          value={filters.skills}
          onChange={handleChange}
          className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="location"
          placeholder="📍 Location"
          value={filters.location}
          onChange={handleChange}
          className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="salary"
          placeholder="💰 Salary (e.g. 100000)"
          value={filters.salary}
          onChange={handleChange}
          className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-amber-700 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition duration-200"
        >
          Filter
        </button>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all border border-gray-100"
          >
            <h2 className="text-xl font-bold text-gray-800 mb-1">{job.title}</h2>
            <p className="text-sm text-gray-500 mb-1">📍 {job.location}</p>
            <p className="text-md font-semibold text-green-600 mb-3">💰 {job.salary}</p>

            <h3 className="text-sm font-medium text-gray-700 mb-2">Skills Required:</h3>
            <div className="flex flex-wrap gap-2">
              {job.skillsRequired.map((skill, idx) => (
                <span key={idx} className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full">
                  {skill}
                </span>
              ))}
            </div>
            <a href={job.link} className="mt-4 inline-block text-blue-600 hover:underline">Apply Now</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Job;
