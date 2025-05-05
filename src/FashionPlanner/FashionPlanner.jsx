import React, { useState } from 'react';

const FashionPlanner = () => {
  const [skinTone, setSkinTone] = useState('');
  const [event, setEvent] = useState('');
  const [culture, setCulture] = useState('');
  const [events, setEvents] = useState([]);
  const [eventDate, setEventDate] = useState('');

  const skinTones = [
    { name: 'Fair', color: '#f9dcc4' },
    { name: 'Brown', color: '#c68642' },
    { name: 'Dark Brown', color: '#8d5524' }
  ];

  const handleAddEvent = () => {
    if (!event || !eventDate || !skinTone || !culture) return;

    const newEvent = {
      id: Date.now(),
      event,
      date: eventDate,
      skinTone,
      culture
    };

    setEvents([...events, newEvent]);
    setEvent('');
    setEventDate('');
    setCulture('');
    setSkinTone('');
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-6 text-white font-sans bg-gradient-to-br from-[#1e1e2f] to-[#12121c] min-h-screen rounded-xl shadow-2xl">
      <h1 className="text-4xl font-bold text-center text-cyan-300 mb-10 tracking-wide">✨ Dress Up Planner</h1>

      {/* Skin Tone Selector */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4 text-gray-200">Choose Your Skin Tone</h2>
        <div className="flex gap-6">
          {skinTones.map((tone) => (
            <div key={tone.name} className="flex flex-col items-center cursor-pointer">
              <div
                className={`w-14 h-14 rounded-full shadow-lg border-4 ${
                  skinTone === tone.name ? 'border-cyan-400 scale-110' : 'border-gray-600'
                } transition duration-200`}
                style={{ backgroundColor: tone.color }}
                onClick={() => setSkinTone(tone.name)}
              ></div>
              <span className="mt-2 text-sm text-gray-300">{tone.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Event + Culture Section */}
      <div className="grid md:grid-cols-2 gap-8 mb-10">
        <div className="bg-[#2a2a3d] p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-200">Event Details</h2>
          <input
            type="text"
            placeholder="What’s the occasion?"
            className="w-full bg-[#1e1e2f] text-white border border-gray-600 rounded-lg px-4 py-3 mb-4 focus:outline-none focus:border-cyan-400"
            value={event}
            onChange={(e) => setEvent(e.target.value)}
          />
          <input
            type="date"
            className="w-full bg-[#1e1e2f] text-white border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-400"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
          />
        </div>

        <div className="bg-[#2a2a3d] p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-200">Cultural Preference</h2>
          <input
            type="text"
            placeholder="Enter your cultural background"
            className="w-full bg-[#1e1e2f] text-white border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-400"
            value={culture}
            onChange={(e) => setCulture(e.target.value)}
          />
        </div>
      </div>

      {/* Add Event Button */}
      <div className="text-center mb-12">
        <button
          onClick={handleAddEvent}
          className="bg-cyan-600 hover:bg-cyan-500 transition duration-300 px-8 py-3 rounded-full text-lg font-semibold shadow-lg"
        >
          Add to Calendar
        </button>
      </div>

      {/* Upcoming Events */}
      {events.length > 0 && (
        <div className="bg-[#2a2a3d] p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-100 mb-6">📅 Upcoming Events</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {events.map((ev) => (
              <div key={ev.id} className="bg-[#1e1e2f] p-5 rounded-xl border border-gray-700 shadow-md">
                <h3 className="text-xl font-bold text-cyan-400 mb-2">{ev.event}</h3>
                <p className="text-gray-300 mb-1">📆 Date: <span className="text-white">{ev.date}</span></p>
                <p className="text-gray-300 mb-1">🎨 Skin Tone: <span className="text-white">{ev.skinTone}</span></p>
                <p className="text-gray-300">🌍 Culture: <span className="text-white">{ev.culture}</span></p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FashionPlanner;
