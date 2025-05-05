import React, { useState } from 'react';
import axios from 'axios';

const ImproveCGPA = () => {
  const [cgpa, setCgpa] = useState('');
  const [course, setCourse] = useState('');
  const [plan, setPlan] = useState([]); // Initialize as an array
  const [tasks, setTasks] = useState([]);
  const [points, setPoints] = useState(0);
  const [notes, setNotes] = useState('');
  const [reminders, setReminders] = useState([]);
  const [newReminder, setNewReminder] = useState({ title: '', datetime: '' });
  const [newTask, setNewTask] = useState('');
  const [moodImage, setMoodImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [aiPlan, setAiPlan] = useState('');

  const handleCgpaSubmit = () => {
    const cg = parseFloat(cgpa);
    let suggestions = [];

    if (!course.trim()) {
      alert('Please enter your course name.');
      return;
    }

    if (cg < 2.0) {
      suggestions = [
        `Hi Hablu! You're struggling in ${course}. Focus on building a strong foundation.`,
        'Attend all classes and labs.',
        'Seek one-on-one help from professors or tutors.',
        'Watch beginner-friendly videos on YouTube.',
        'Study minimum 3 hrs/day with breaks.',
      ];
      setMoodImage('https://i.ibb.co.com/p6f22qZq/verysad.webp');
    } else if (cg < 2.5) {
      suggestions = [
        `Hey Hablu! ${course} needs more attention.`,
        'Solve previous semester question papers.',
        'Study in focused blocks with short breaks.',
        'Join peer discussions and doubt sessions.',
      ];
      setMoodImage('https://i.ibb.co.com/0Vf01HC3/habluSad.jpg');
    } else if (cg < 3.0) {
      suggestions = [
        `Keep it up Hablu! You're halfway there in ${course}.`,
        'Make concise notes after each lecture.',
        'Study 2 hrs daily + weekly practice tests.',
        'Talk with toppers about their strategies.',
      ];
      setMoodImage('https://i.ibb.co.com/gZkYq8zW/neutral.jpg');
    } else if (cg < 3.5) {
      suggestions = [
        `Nice Hablu! You’re doing well in ${course}. Let’s go higher.`,
        'Revise regularly and challenge yourself.',
        'Start preparing a month before exams.',
        'Use flashcards and smart tools.',
      ];
      setMoodImage('https://i.ibb.co.com/1YCjSqG8/happy.jpg');
    } else {
      suggestions = [
        `Amazing Hablu! You're rocking ${course}!`,
        'Explore advanced topics.',
        'Try to help friends—it reinforces your learning.',
        'Attempt online quizzes to stay sharp.',
      ];
      setMoodImage('https://i.ibb.co.com/B5kKwrhP/excited1.jpg');
    }

    setPlan(suggestions);
    setTasks([]);
    setPoints(0);
  };

  const generatePlan = async () => {
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:5000/planer/chat', {
        cgpa: cgpa,
        subjects: course.split(',').map(subject => subject.trim()),
      });

      console.log('✅ AI Response:', response.data.reply);
      // Ensure the response is treated as an array
      const aiResponse = Array.isArray(response.data.reply) ? response.data.reply : [response.data.reply];
      const formattedResponse = aiResponse.map((item) => formatResponse(item));
      setPlan(formattedResponse); // Set the formatted plan as an array); // Set the plan as an array
      setLoading(false);
    } catch (error) {
      console.error('❌ Error fetching AI plan:', error);
      setLoading(false);
    }
  };

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { name: newTask, done: false }]);
      setNewTask('');
    }
  };

  const handleTaskComplete = (index) => {
    const updated = [...tasks];
    updated[index].done = !updated[index].done;
    setTasks(updated);
    setPoints(points + (updated[index].done ? 10 : -10));
  };

  const addReminder = () => {
    if (newReminder.title && newReminder.datetime) {
      setReminders([...reminders, newReminder]);
      setNewReminder({ title: '', datetime: '' });
    }
  };

  return (
    <div className="ml-60 p-6 min-h-screen bg-gradient-to-br from-blue-50 to-purple-100">
      <h1 className="text-4xl font-extrabold text-indigo-800 mb-8">📚 CGPA Booster for Hablu</h1>

      {/* Inputs */}
      <div className="grid md:grid-cols-3 gap-6 mb-6">
        <div>
          <label className="block font-medium mb-1">Course Name:</label>
          <input
            type="text"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            placeholder="e.g., Data Structures"
            className="border border-indigo-300 px-4 py-2 rounded w-full shadow-sm"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Your Current CGPA:</label>
          <input
            type="number"
            step="0.01"
            value={cgpa}
            onChange={(e) => setCgpa(e.target.value)}
            placeholder="e.g., 2.8"
            className="border border-indigo-300 px-4 py-2 rounded w-full shadow-sm"
          />
        </div>
        <div className="flex items-end">
        <button
  onClick={() => {
    handleCgpaSubmit();
    generatePlan();
  }}
  disabled={loading}
  className="bg-indigo-600 text-white px-6 py-2 rounded w-full hover:bg-indigo-700 transition"
>
  {loading ? 'Generating...' : '🎯 Generate Plan'}
</button>
        </div>
      </div>

      {/* Mood Image */}
      {moodImage && (
        <div className="mb-6 text-center">
          <img
            src={moodImage}
            alt="Hablu's Mood"
            className="w-32 h-32 mx-auto rounded-full shadow-md"
          />
          <p className="mt-2 font-semibold text-gray-700">Hablu's current mood</p>
        </div>
      )}

      {/* Study Plan */}
      {plan.length > 0 && (
        <div className="bg-white p-6 rounded-xl shadow mb-6 border border-indigo-200">
          <h2 className="text-2xl font-semibold text-indigo-700 mb-4">Your Personalized Plan</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {plan.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Tasks */}
      <div className="bg-white p-6 rounded-xl shadow mb-6 border border-purple-200">
        <h2 className="text-2xl font-semibold text-purple-700 mb-4">Your Tasks</h2>
        <div className="flex gap-4 mb-4">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add your task here"
            className="border p-2 rounded flex-1"
          />
          <button
            onClick={addTask}
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
          >
            Add
          </button>
        </div>
        {tasks.length === 0 ? (
          <p className="text-gray-500 italic">No tasks added yet.</p>
        ) : (
          tasks.map((task, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => handleTaskComplete(index)}
              />
              <span className={task.done ? 'line-through text-gray-500' : ''}>{task.name}</span>
            </div>
          ))
        )}
        <p className="mt-4 text-green-700 font-bold">💡 Total Points: {points}</p>
      </div>

      {/* Reminders */}
      <div className="bg-white p-6 rounded-xl shadow mb-6 border border-teal-200">
        <h2 className="text-2xl font-semibold text-teal-700 mb-4">Reminders</h2>
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <input
            type="text"
            placeholder="Assignment or Exam Title"
            value={newReminder.title}
            onChange={(e) => setNewReminder({ ...newReminder, title: e.target.value })}
            className="border p-2 rounded flex-1"
          />
          <input
            type="datetime-local"
            value={newReminder.datetime}
            onChange={(e) => setNewReminder({ ...newReminder, datetime: e.target.value })}
            className="border p-2 rounded"
          />
          <button
            onClick={addReminder}
            className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
          >
            Add
          </button>
        </div>
        <ul className="list-disc list-inside text-gray-700">
          {reminders.map((reminder, index) => (
            <li key={index}>
              <strong>{reminder.title}</strong> —{' '}
              {new Date(reminder.datetime).toLocaleString()}
            </li>
          ))}
        </ul>
      </div>

      {/* Notes */}
      <div className="bg-white p-6 rounded-xl shadow border border-yellow-200">
        <h2 className="text-2xl font-semibold text-yellow-600 mb-4">Personal Notes</h2>
        <textarea
          className="w-full h-32 border p-3 rounded"
          placeholder="Write down important things here..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>
    </div>
  );
};

const formatResponse = (text) => {
  // Convert **bold** to <strong>Text</strong> using RegEx
  const renderBold = (str) => {
    const regex = /\*\*(.*?)\*\*/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(str)) !== null) {
      // Add text before bold
      if (match.index > lastIndex) {
        parts.push(str.slice(lastIndex, match.index));
      }
      // Add bold text
      parts.push(<strong key={match.index}>{match[1]}</strong>);
      lastIndex = regex.lastIndex;
    }

    // Add remaining text
    if (lastIndex < str.length) {
      parts.push(str.slice(lastIndex));
    }

    return parts;
  };

  // Handle markdown-style table
  if (text.includes('|') && text.includes('---')) {
    const lines = text.trim().split('\n');
    const headers = lines[0].split('|').map(cell => cell.trim()).filter(Boolean);
    const rows = lines.slice(2).map(line =>
      line.split('|').map(cell => cell.trim()).filter(Boolean)
    );

    return (
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-collapse border-gray-300">
          <thead className="bg-indigo-100">
            <tr>
              {headers.map((header, i) => (
                <th key={i} className="border px-4 py-2 text-left font-semibold">
                  {renderBold(header)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="even:bg-gray-50">
                {row.map((cell, j) => (
                  <td key={j} className="border px-4 py-2">
                    {renderBold(cell)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // Handle normal text with line breaks and bold
  return text.split('\n').map((line, index) => (
    <React.Fragment key={index}>
      {renderBold(line)}
      <br />
    </React.Fragment>
  ));
};


export default ImproveCGPA;
