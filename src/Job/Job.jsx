import React, { useState, useEffect } from 'react';

const Job = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    // Fetch data from your api
    fetch('/api/jobs')
      .then((response) => response.json())
      .then((data) => setJobs(data))
      .catch((error) => console.error('Error fetching jobs:', error));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6">Job Listings</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 transition-all hover:shadow-xl"
          >
            <h2 className="text-xl font-bold mb-2">{job.title}</h2>
            <p className="text-gray-600 mb-2">{job.location}</p>
            <p className="text-lg font-semibold text-green-600 mb-4">{job.salary}</p>
            
            <h3 className="text-md font-semibold mb-2">Skills Required:</h3>
            <ul className="list-disc list-inside">
              {job.skills.map((skill, idx) => (
                <li key={idx} className="text-gray-600">
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Job;
