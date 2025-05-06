import React, { useState, useEffect } from "react";
import axios from "axios";

const moodOptions = [
  { mood: "😊", label: "Happy" },
  { mood: "😔", label: "Sad" },
  { mood: "😡", label: "Angry" },
  { mood: "😨", label: "Anxious" },
  { mood: "😴", label: "Tired" },
  { mood: "😕", label: "Confused" },
];

const responses = {
  Happy: "That's great to hear! Spread your energy with someone today.",
  Sad: "It's okay to feel this way. Try writing down your thoughts or taking a short walk.",
  Angry: "Take a few deep breaths. Would you like to try a breathing timer?",
  Anxious: "Try grounding yourself with a simple 5-4-3-2-1 technique.",
  Tired: "You deserve rest. Maybe a 20-min nap or hydration will help.",
  Confused: "Try organizing your thoughts through journaling or talking to someone.",
};

const quotes = [
  "This too shall pass.",
  "Every day may not be good, but there is something good in every day.",
  "Your feelings are valid.",
  "Healing is not linear. You’re doing your best.",
  "You are not alone. You've survived 100% of your worst days.",
];

const MoodSupport = () => {
  const [selectedMood, setSelectedMood] = useState("");
  const [dailyEntry, setDailyEntry] = useState("");
  const [entries, setEntries] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);
  const [userMessage, setUserMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("moodEntries") || "[]");
    setEntries(stored);
  }, []);

  const handleEntrySubmit = () => {
    const newEntry = {
      mood: selectedMood,
      text: dailyEntry,
      time: new Date().toLocaleString(),
    };
    const updatedEntries = [...entries, newEntry];
    setEntries(updatedEntries);
    localStorage.setItem("moodEntries", JSON.stringify(updatedEntries));
    setDailyEntry("");
    setSelectedMood("");
  };

  const handleChatSubmit = async () => {
    if (!userMessage.trim()) return;

    const userMsg = { sender: "user", text: userMessage };
    setChatMessages((prev) => [...prev, userMsg]);
    setUserMessage("");
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/mod/chatmod", {
        message: userMessage,
      });

      const botReplyText = response.data.reply || "Sorry, I didn't get that.";

      // Call formatResponse here to format the text
      const formattedReply = formatResponse(botReplyText);

      const botReply = {
        sender: "bot",
        text: formattedReply,
      };

      setChatMessages((prev) => [...prev, botReply]);
    } catch (err) {
      setChatMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Unable to connect to Gemini AI." },
      ]);
    }

    setLoading(false);
  };

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  const formatResponse = (text) => {
    return text.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>").replace(/\n/g, "<br>");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-indigo-50 to-pink-100 p-6 md:pl-64 text-gray-800">
      <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl p-10 space-y-6">
        <h1 className="text-4xl font-bold text-center text-indigo-700">💬 Daily Mood Check</h1>
        <p className="text-center text-lg text-gray-600">Select your current mood and let’s take a small step together.</p>

        {/* Mood Picker */}
        <div className="flex flex-wrap justify-center gap-5">
          {moodOptions.map(({ mood, label }) => (
            <button
              key={label}
              onClick={() => setSelectedMood(label)}
              className={`text-3xl w-16 h-16 rounded-full transition-transform ${
                selectedMood === label ? "scale-110 bg-indigo-200" : "bg-white hover:bg-indigo-100"
              }`}
              title={label}
            >
              {mood}
            </button>
          ))}
        </div>

        {/* Mood Response */}
        {selectedMood && (
          <div className="bg-indigo-50 border-l-4 border-indigo-400 p-4 rounded-xl">
            <p className="text-lg text-indigo-800 font-semibold">🧠 Response:</p>
            <p className="text-gray-700 mt-1">{responses[selectedMood]}</p>
          </div>
        )}

        {/* Daily Journal Entry */}
        <div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">📝 Write something you feel right now:</h2>
          <textarea
            rows="3"
            className="w-full p-4 rounded-lg border border-gray-300 focus:outline-indigo-400"
            value={dailyEntry}
            onChange={(e) => setDailyEntry(e.target.value)}
            placeholder="Your thoughts, worries, or wins today..."
          />
          <button
            onClick={handleEntrySubmit}
            className="mt-3 bg-indigo-500 text-white px-6 py-2 rounded-lg hover:bg-indigo-600 transition"
            disabled={!selectedMood || !dailyEntry}
          >
            Save Reflection
          </button>
        </div>

        {/* Gemini AI Chat Section */}
        <div className=" bg-indigo-100 p-6 rounded-2xl shadow-inner space-y-4">
          <h2 className="text-2xl font-bold text-indigo-700 flex items-center gap-2">
            Talk to 🤖 
          </h2>
          <div className="h-64 overflow-y-auto bg-white p-4 rounded-xl border border-indigo-200 space-y-2">
            {chatMessages.map((msg, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg w-fit max-w-[80%] ${
                  msg.sender === "user"
                    ? "ml-auto bg-indigo-200 text-right"
                    : "mr-auto bg-gray-100"
                }`}
              >
                {/* Render the message with dangerouslySetInnerHTML to allow HTML rendering */}
                <p className="text-sm" dangerouslySetInnerHTML={{ __html: msg.text }}></p>
              </div>
            ))}
            {loading && (
              <p className="text-sm italic text-gray-500">Gemini is typing...</p>
            )}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-indigo-500"
              placeholder="Ask something..."
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleChatSubmit()}
            />
            <button
              onClick={handleChatSubmit}
              className="bg-indigo-500 text-white px-4 rounded-lg hover:bg-indigo-600 transition"
            >
              Send
            </button>
          </div>
        </div>

        {/* Motivational Quote */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-xl">
          <p className="text-lg text-yellow-800 font-medium">💡 Motivation:</p>
          <p className="text-gray-700 mt-1 italic">"{randomQuote}"</p>
        </div>

        {/* Quick Wellness Tools */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button className="bg-teal-200 p-4 rounded-xl hover:shadow-lg">
            🌬️ 2-min Breathing Timer
          </button>
          <button className="bg-rose-200 p-4 rounded-xl hover:shadow-lg">
            📞 Call a Friend
          </button>
          <button className="bg-sky-200 p-4 rounded-xl hover:shadow-lg col-span-full">
            📖 Open Previous Reflections
          </button>
        </div>

        {/* Reflection History */}
        {entries.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-bold text-indigo-700 mb-2">📚 Reflection History</h3>
            <ul className="space-y-2 max-h-40 overflow-y-auto">
              {entries.map((entry, index) => (
                <li key={index} className="bg-white border-l-4 border-indigo-300 p-3 rounded-md shadow-sm">
                  <div className="text-sm text-gray-500">
                    {entry.time} - <span className="font-semibold">{entry.mood}</span>
                  </div>
                  <p className="mt-2 text-gray-700">{entry.text}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default MoodSupport;
