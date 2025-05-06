import React, { useState, useRef } from "react";

const GroupStudy = () => {
  const [studySession, setStudySession] = useState(null);
  const [gossipMode, setGossipMode] = useState(false);
  const [focusTime, setFocusTime] = useState(0);
  const timerRef = useRef(null);

  const availableSlots = [
    "9:00 AM - 10:00 AM",
    "11:00 AM - 12:00 PM",
    "2:00 PM - 3:00 PM",
    "4:00 PM - 5:00 PM",
  ];

  const handleSlotSelect = (slot) => {
    setStudySession(slot);
    setFocusTime(0);
    clearInterval(timerRef.current);
    timerRef.current = null;
  };

  const toggleGossipMode = () => {
    setGossipMode((prev) => {
      const newMode = !prev;
      if (newMode && timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return newMode;
    });
  };

  const startFocusTimer = () => {
    if (timerRef.current) return;
    timerRef.current = setInterval(() => {
      setFocusTime((prev) => {
        if (prev >= 100) {
          clearInterval(timerRef.current);
          timerRef.current = null;
          return prev;
        }
        return prev + 1;
      });
    }, 1000);
  };

  const progressBarStyle = {
    width: `${focusTime}%`,
    height: "8px",
    backgroundColor: "#4CAF50",
    borderRadius: "4px",
    transition: "width 0.5s ease-in-out",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-yellow-50 to-pink-100 p-6 md:pl-64 text-gray-800">
      <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-lg shadow-xl rounded-3xl p-6 md:p-10">
        <h1 className="text-4xl font-bold text-center text-teal-700 mb-6">
          📅 Study Group Scheduler
        </h1>
        <p className="text-center text-lg text-gray-600 mb-10">
          Help Hablu find the perfect study time. But beware, distractions await!
        </p>

        {/* Study Session Selection */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-teal-700 mb-4">
            Pick a study session:
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {availableSlots.map((slot) => (
              <button
                key={slot}
                onClick={() => handleSlotSelect(slot)}
                className={`px-5 py-3 rounded-xl border-2 transition-all text-base md:text-lg font-medium ${
                  studySession === slot
                    ? "bg-teal-200 border-teal-600 text-teal-900 scale-105"
                    : "bg-white border-gray-300 hover:border-teal-400"
                }`}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>

        {/* Focus Timer */}
        {studySession && (
          <>
            <div className="mb-6">
              <div className="text-sm mb-1 font-semibold text-teal-800">
                Focus Progress: {focusTime}%
              </div>
              <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                <div style={progressBarStyle}></div>
              </div>
            </div>
            <button
              onClick={startFocusTimer}
              className="bg-teal-500 text-white py-3 px-6 rounded-xl mb-6 hover:bg-teal-600 transition duration-300"
            >
              Start Focus Session
            </button>
          </>
        )}

        {/* Gossip Mode Toggle */}
        <div className="mb-6">
          <button
            onClick={toggleGossipMode}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              gossipMode ? "bg-red-500 text-white" : "bg-yellow-500 text-gray-800"
            }`}
          >
            {gossipMode ? "Time to Get Back to Study!" : "Oops, Gossip Mode On!"}
          </button>
        </div>

        {/* Distraction Warning */}
        {gossipMode && (
          <div className="bg-red-100 p-4 rounded-xl mb-6 text-center text-red-600 font-semibold">
            🚨 Oops! Focus lost. Let’s get back to the books!
          </div>
        )}

        {/* Ending Reminder */}
        <div className="mt-10 text-center text-lg text-gray-700">
          {studySession && focusTime === 100 && !gossipMode && (
            <div className="text-xl font-semibold text-green-600">
              🎉 Congrats! You completed your study session.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GroupStudy;
