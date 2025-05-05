import React, { useEffect, useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { motion } from 'framer-motion';
import 'leaflet/dist/leaflet.css';

const MOTIVATIONAL_TIPS = [
  "Consistency is key: Train a little each day.",
  "Hydrate well before, during, and after runs.",
  "Set measurable goals and track your progress.",
  "Rest and recovery are as important as training.",
  "Visualize your finish line to boost motivation."
];

const getNextEvent = (events) => {
    const now = new Date();
    const futureEvents = events.filter(e => new Date(e.date) >= now); // Include today
    if (futureEvents.length === 0) return null;
    return futureEvents.reduce((a, b) => (new Date(a.date) < new Date(b.date) ? a : b));
  };

const CountdownTimer = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({ days: '--', hours: '--', minutes: '--', seconds: '--' });

  useEffect(() => {
    if (!targetDate) return;

    const updateTimer = () => {
      const now = new Date();
      const diff = new Date(targetDate) - now;
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateTimer();
    const timerId = setInterval(updateTimer, 1000);
    return () => clearInterval(timerId);
  }, [targetDate]);

  if (!targetDate) return null;

  return (
    <motion.div
      className="bg-green-50 rounded-lg p-4 shadow-md text-center mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-xl font-semibold text-green-700 mb-2">Next Marathon Countdown</h2>
      <p className="text-green-800 text-2xl font-mono">
        {timeLeft.days}d : {timeLeft.hours}h : {timeLeft.minutes}m : {timeLeft.seconds}s
      </p>
      <p className="mt-1 text-green-700 font-medium text-sm">{new Date(targetDate).toLocaleString()}</p>
    </motion.div>
  );
};

const Marathon = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState('list');
  const [goals, setGoals] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('trainingGoals')) || [];
    } catch {
      return [];
    }
  });
  const [newGoal, setNewGoal] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
        setLoading(true);
        setError('');
        try {
          const response = await fetch('https://csefest.srejon.com/api/v1/marathon?lat=23.8103&lon=90.4125');
          if (!response.ok) throw new Error('Failed to fetch marathon events');
          const data = await response.json();
          if (data.success && data.data.length) {
            setEvents(data.data); // Correctly accessing the events
          } else {
            setError('No marathon events found.');
          }
        } catch (err) {
          setError(err.message || 'Failed to fetch marathon events');
        } finally {
          setLoading(false);
        }
      };
    fetchEvents();
  }, []);

  const filteredEvents = useMemo(() => {
    if (!search.trim()) return events;
    return events.filter(event =>
      event.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [events, search]);

  const nextEvent = getNextEvent(filteredEvents);

  const addGoal = () => {
    if (!newGoal.trim()) return;
    const updatedGoals = [...goals, { id: Date.now(), text: newGoal.trim() }];
    setGoals(updatedGoals);
    setNewGoal('');
    localStorage.setItem('trainingGoals', JSON.stringify(updatedGoals));
  };

  const removeGoal = (id) => {
    const updatedGoals = goals.filter(goal => goal.id !== id);
    setGoals(updatedGoals);
    localStorage.setItem('trainingGoals', JSON.stringify(updatedGoals));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-green-50 to-teal-50 p-6 font-sans max-w-6xl mx-auto">
      <motion.h1
        className="text-5xl font-extrabold mb-8 text-teal-800 drop-shadow-lg text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        🏃‍♂️ Marathon Events & Training Hub
      </motion.h1>

      {loading && <p className="text-teal-700 text-lg animate-pulse text-center">Loading marathon events...</p>}
      {error && !loading && <p className="text-red-600 text-lg font-semibold text-center">{error}</p>}

      {!loading && !error && (
        <>
          <CountdownTimer targetDate={nextEvent?.date} />

          {/* Search and View Mode */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
            <input
              type="text"
              placeholder="Search events by name..."
              className="p-3 rounded border border-gray-300 flex-grow focus:outline-none focus:ring-2 focus:ring-teal-300"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <div className="flex space-x-4">
              <button
                onClick={() => setViewMode('list')}
                className={`px-4 py-2 rounded font-semibold border ${
                  viewMode === 'list' ? 'bg-teal-600 text-white' : 'border-gray-300 text-gray-600 hover:bg-teal-100'
                }`}
              >
                List View
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`px-4 py-2 rounded font-semibold border ${
                  viewMode === 'grid' ? 'bg-teal-600 text-white' : 'border-gray-300 text-gray-600 hover:bg-teal-100'
                }`}
              >
                Grid View
              </button>
            </div>
          </div>

          <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 gap-6' : 'flex flex-col space-y-6'}>
          {filteredEvents.map(event => (
            <motion.article
                key={event.id}
                className="bg-white rounded-3xl shadow-md p-6 border border-green-200 hover:scale-[1.02] transition-transform"
                whileHover={{ scale: 1.03 }}
            >
                <h2 className="text-2xl font-semibold mb-1 text-green-900">{event.name}</h2>
                <time className="block text-green-700 mb-2 font-medium">
                📅 {new Date(event.date).toLocaleDateString()}
                </time>
                {event.location && <p className="mb-3 text-gray-700 font-medium">📍 {event.location}</p>}
                <p className="mb-4 text-gray-800">{event.description}</p>
                {/* Map Section */}
                {event.latitude && event.longitude && (
                <div className="h-60 rounded-lg overflow-hidden mb-4 z-10">
                    <MapContainer
                    center={[event.latitude, event.longitude]}
                    zoom={13}
                    scrollWheelZoom={false}
                    style={{ height: '100%', width: '100%' }}
                    >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <Marker position={[event.latitude, event.longitude]}>
                        <Popup>{event.name}</Popup>
                    </Marker>
                    </MapContainer>
                </div>
                )}
                {Array.isArray(event.topParticipants) && event.topParticipants.length > 0 ? (
                <details className="text-gray-900">
                    <summary className="cursor-pointer font-semibold mb-2 text-green-800">Top Participants</summary>
                    <ul className="list-disc list-inside max-h-36 overflow-y-auto">
                    {event.topParticipants.map(p => (
                        <li key={p.id}>
                        <strong>{p.name}</strong> - <span className="text-gray-600">{Array.isArray(p.achievements) ? p.achievements.join(', ') : ''}</span>
                        </li>
                    ))}
                    </ul>
                </details>
                ) : (
                <p className="text-sm text-gray-600 italic">No participant data available.</p>
                )}

            </motion.article>
          ))}
          </div>

          <section className="mt-16 bg-teal-100 rounded-3xl p-6 shadow-inner max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-teal-800 text-center">🔥 Motivational Tips</h2>
            <ul className="list-disc list-inside space-y-2 text-teal-900 text-lg">
              {MOTIVATIONAL_TIPS.map((tip, i) => (
                <li key={i}>{tip}</li>
              ))}
            </ul>
          </section>

          <section className="mt-16 max-w-xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-teal-800 text-center">🎯 My Training Goals</h2>
            <div className="flex gap-3 mb-4">
              <input
                type="text"
                placeholder="Add a new goal..."
                className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
                value={newGoal}
                onChange={e => setNewGoal(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && addGoal()}
              />
              <button
                type="button"
                onClick={addGoal}
                className="bg-teal-600 text-white px-5 py-3 rounded-lg font-semibold hover:bg-teal-700 transition"
              >
                Add
              </button>
            </div>
            {goals.length === 0 && <p className="text-gray-600 italic text-center">No goals added yet.</p>}
            <ul className="space-y-2 text-gray-800">
              {goals.map(goal => (
                <li key={goal.id} className="flex justify-between items-center bg-white rounded shadow px-4 py-2">
                  <span>{goal.text}</span>
                  <button onClick={() => removeGoal(goal.id)} className="text-red-600 hover:text-red-800 font-bold">
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          </section>
        </>
      )}
    </div>
  );
};

export default Marathon;