import React, { useState } from 'react';

const funFacts = [
  {
    fact: "Did you know? Bananas are berries, but strawberries are not!",
    image: "https://i.ibb.co.com/RpqLpF5Q/banana.jpg", 
  },
  {
    fact: "A sneeze can travel up to 100 miles per hour!",
    image: "https://i.ibb.co.com/9kvvpk8B/sneeze-k.jpg",
  },
  {
    fact: "The longest hiccuping spree lasted 68 years.",
    image: "https://i.ibb.co.com/WpBbgpg2/hiccup.jpg", 
  },
  {
    fact: "Octopuses have three hearts and blue blood!",
    image: "https://i.ibb.co.com/XrPq9L4v/octopus.jpg", 
  },
  {
    fact: "Wombat poop is cube-shaped!",
    image: "https://i.ibb.co.com/v4tHK6Vp/wombat.webp",
  }
];

const FunFact = () => {
  const [currentFact, setCurrentFact] = useState(funFacts[0]);

  const generateNewFact = () => {
    const randomFact = funFacts[Math.floor(Math.random() * funFacts.length)];
    setCurrentFact(randomFact);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 p-6 md:pl-64 text-gray-800">
      <div className="max-w-5xl mx-auto bg-white/80 backdrop-blur-lg shadow-xl rounded-3xl p-10">
        <h1 className="text-4xl font-bold text-center text-purple-700 mb-4">✨ Random Fun Fact</h1>
        <p className="text-center text-lg text-gray-600 mb-10">
          Learn something new and impress others with your knowledge!
        </p>

        {/* Flexbox Layout */}
        <div className="flex flex-col sm:flex-row sm:gap-8 justify-center mb-8">
          {/* Fact Image */}
          <div className="flex justify-center mb-6 sm:mb-0 sm:w-1/2">
            <img
              src={currentFact.image}
              alt="Fun Fact"
              className="w-full max-w-xs sm:max-w-md lg:max-w-lg rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
            />
          </div>

          {/* Fact Text and Buttons */}
          <div className="flex flex-col justify-center sm:w-1/2">
            <p className="text-lg sm:text-xl text-gray-700 text-center sm:text-left mb-6">{currentFact.fact}</p>

            <div className="flex justify-center sm:justify-start gap-6 mt-6">
              <button
                onClick={generateNewFact}
                className="bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-500 transition duration-300"
              >
                Generate New Fact
              </button>
              <button
                onClick={() => alert("Sharing your fact!")}
                className="bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-500 transition duration-300"
              >
                Share Fact
              </button>
            </div>
          </div>
        </div>

        {/* Fun Fact Timeline (Using Steps for the Fact History) */}
        <div className="relative pl-6 border-l-4 border-purple-300 space-y-6 mt-10">
          <h2 className="text-2xl font-semibold text-gray-800">Fun Fact Timeline</h2>
          {funFacts.map((fact, index) => (
            <div
              key={index}
              className="flex items-start gap-3 cursor-pointer group"
              onClick={() => setCurrentFact(fact)}
            >
              <div
                className="w-5 h-5 mt-1 rounded-full bg-purple-600 group-hover:bg-purple-400 transition duration-300"
              ></div>
              <div className="text-lg text-gray-700">{fact.fact}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FunFact;
