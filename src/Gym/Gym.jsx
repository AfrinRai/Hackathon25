import React, { useState, useEffect } from "react";
import axios from "axios";

const Gym = () => {
  const [location, setLocation] = useState("");
  const [gyms, setGyms] = useState([]);
  const [buddies, setBuddies] = useState([]);
  const [weight, setWeight] = useState("");
  const [exerciseType, setExerciseType] = useState("");
  const [foodSuggestion, setFoodSuggestion] = useState("");

  const fetchData = async () => {
    if (!location) return;
    const [lat, lon] = location.split(",").map((s) => s.trim());

    try {
      const gymData = await axios.get(
        `https://csefest.srejon.com/api/v1/gyms?lat=${lat}&lon=${lon}`
      );
      const buddyData = await axios.get(
        `https://csefest.srejon.com/api/v1/gymbros?lat=${lat}&lon=${lon}`
      );

      setGyms(gymData.data.gyms);
      setBuddies(buddyData.data.gymbros);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  const generateFoodSuggestion = () => {
    if (!weight || !exerciseType) return;
    const w = parseInt(weight);
    if (exerciseType === "cardio") {
      setFoodSuggestion(
        w < 60
          ? "🍌 Eat bananas, oats, peanut butter shakes."
          : "🥗 Include lean protein and brown rice."
      );
    } else {
      setFoodSuggestion(
        w < 60
          ? "🍳 Eggs, milk, nut bars for muscle mass."
          : "🥩 Chicken, boiled veggies, and protein shake."
      );
    }
  };

  useEffect(() => {
    fetchData();
  }, [location]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-sky-50 to-blue-100 md:pl-64 p-6 text-gray-900">
      <div className="max-w-6xl mx-auto bg-white/80 backdrop-blur-lg shadow-xl rounded-3xl p-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-700 mb-6">
          🏋️‍♂️ Find a Gym Buddy
        </h1>

        {/* Location Input */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 justify-center items-center">
          <input
            type="text"
            placeholder="Enter location (lat, lon)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="px-5 py-3 rounded-lg border border-gray-300 w-full md:w-1/2 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={fetchData}
            className="bg-blue-500 text-white px-5 py-3 rounded-lg hover:bg-blue-600 transition"
          >
            🔍 Search
          </button>
        </div>

        {/* Food Suggestion Section */}
        <div className="mb-10 bg-yellow-50 border-l-4 border-yellow-400 p-5 rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-2">🍽️ Get Food Suggestions</h2>
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <input
              type="number"
              placeholder="Your Weight (kg)"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="px-4 py-2 rounded-md border border-gray-300 w-full md:w-1/3"
            />
            <select
              value={exerciseType}
              onChange={(e) => setExerciseType(e.target.value)}
              className="px-4 py-2 rounded-md border border-gray-300 w-full md:w-1/3"
            >
              <option value="">Select Exercise</option>
              <option value="cardio">🏃 Cardio</option>
              <option value="strength">💪 Strength</option>
            </select>
            <button
              onClick={generateFoodSuggestion}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
            >
              🍎 Suggest Food
            </button>
          </div>
          {foodSuggestion && (
            <p className="mt-4 text-green-700 font-medium">{foodSuggestion}</p>
          )}
        </div>

        {/* Nearby Gyms */}
        <h2 className="text-2xl font-bold mb-4 text-blue-800">🏢 Nearby Gyms</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {gyms.map((gym, index) => (
            <div
              key={index}
              className="bg-white border shadow-md rounded-xl p-5 hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold mb-2">{gym.name}</h3>
              <p className="text-gray-700">📍 {gym.address}</p>
            </div>
          ))}
        </div>

        {/* Gym Buddies */}
        <h2 className="text-2xl font-bold mb-4 text-blue-800">🧑‍🤝‍🧑 Gym Buddies</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {buddies.map((buddy, index) => (
            <div
              key={index}
              className="bg-white border shadow-md rounded-xl p-5 hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold mb-2">{buddy.name}</h3>
              <p className="text-gray-700">📍 {buddy.location}</p>
              <p className="text-gray-600 text-sm mt-1">💬 {buddy.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gym;
