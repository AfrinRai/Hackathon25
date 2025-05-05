import React, { useState } from 'react';

const FashionPlanner = () => {
  const [skinTone, setSkinTone] = useState('');
  const [budget, setBudget] = useState('');
  const [bodyType, setBodyType] = useState('');
  const [environment, setEnvironment] = useState('');
  const [recommendations, setRecommendations] = useState([]);

  const skinTones = [
    { label: 'Fair', color: '#f2d6cb' },
    { label: 'Light Brown', color: '#d8a47f' },
    { label: 'Brown', color: '#a16641' },
    { label: 'Olive', color: '#8b6f4d' },
    { label: 'Dark Brown', color: '#5c3a21' },
    { label: 'Deep', color: '#3b2417' }
  ];

  const handleSubmit = () => {
    const advice = [];

    if (!skinTone || !budget || !bodyType || !environment) {
      setRecommendations(['Please fill out all the selections to receive recommendations.']);
      return;
    }

    if (budget === 'low') {
      advice.push('Shop from budget-friendly outlets like thrift stores or use student discounts.');
    } else if (budget === 'medium') {
      advice.push('Invest in quality basics: fitted jeans, plain shirts, smart shoes.');
    } else {
      advice.push('Consider tailored outfits and branded essentials for long-lasting impact.');
    }

    if (skinTone === 'Fair') {
      advice.push('Avoid pale shades. Opt for navy, emerald green, or charcoal for contrast.');
    } else if (skinTone === 'Dark Brown' || skinTone === 'Deep') {
      advice.push('Bright colors like yellow, red, and white will stand out nicely.');
    } else {
      advice.push('Earthy tones like olive, burgundy, and tan work well.');
    }

    if (bodyType === 'slim') {
      advice.push('Layer your clothes to add volume — try overshirts or light jackets.');
    } else if (bodyType === 'athletic') {
      advice.push('Wear fitted clothes that highlight your shape without clinging.');
    } else if (bodyType === 'broad') {
      advice.push('Avoid horizontal stripes. Opt for darker colors and vertical cuts.');
    }

    if (environment === 'professional') {
      advice.push('Stick to neat and structured styles like collared shirts and loafers.');
      advice.push('Avoid logos and flashy patterns — go for minimalist looks.');
    } else {
      advice.push('Casual styles like hoodies, sneakers, and printed tees are fine.');
      advice.push('Don’t overdo accessories — simple chains or watches are enough.');
    }

    advice.push('Always keep grooming in check — clean hair, trimmed nails, and tidy shoes.');

    setRecommendations(advice);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-200 via-gray-200 to-gray-300 p-6 text-gray-900 font-sans flex flex-col justify-center items-center md:ml-[250px]">
      <div className="max-w-4xl w-full bg-white/75 backdrop-blur-md shadow-2xl rounded-3xl px-12 py-14">
        <h1 className="text-4xl font-extrabold text-center mb-10 tracking-wide text-teal-700 drop-shadow-md">
          🧥 Style Advisor
          <span className="block h-1 w-20 bg-gradient-to-r from-teal-600 to-teal-500 mx-auto mt-3 rounded-full"></span>
        </h1>

        {/* Skin Tone */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-teal-600" aria-label="Choose your skin tone">
            <span role="img" aria-hidden="true">👤</span> Choose Your Skin Tone:
          </h2>
          <div className="flex flex-wrap gap-6 justify-center">
            {skinTones.map((tone) => (
              <button
                key={tone.label}
                className={`w-16 h-16 rounded-full border-4 transition-transform shadow-lg
                  ${skinTone === tone.label ? 'border-teal-600 scale-110' : 'border-gray-300 hover:border-teal-500 hover:scale-105'}
                `}
                style={{ backgroundColor: tone.color }}
                onClick={() => setSkinTone(tone.label)}
                aria-label={tone.label}
                title={tone.label}
                type="button"
              >
              </button>
            ))}
          </div>
        </section>

        {/* Inputs Grid */}
        <section className="grid md:grid-cols-3 sm:grid-cols-2 gap-8 mb-10">
          {/* Budget */}
          <div>
            <h2 className="text-md font-semibold mb-3 flex items-center gap-2 text-teal-600" aria-label="Select budget">
              <span role="img" aria-hidden="true">💰</span> Budget
            </h2>
            <select
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-4 focus:ring-teal-300 transition"
              aria-label="Select budget"
            >
              <option value="">Select Budget</option>
              <option value="low">Low (Budget-friendly)</option>
              <option value="medium">Medium (Standard retail)</option>
              <option value="high">High (Branded/tailored)</option>
            </select>
          </div>

          {/* Body Type */}
          <div>
            <h2 className="text-md font-semibold mb-3 flex items-center gap-2 text-teal-600" aria-label="Select body type">
              <span role="img" aria-hidden="true">🧍</span> Body Type
            </h2>
            <select
              value={bodyType}
              onChange={(e) => setBodyType(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-4 focus:ring-teal-300 transition"
              aria-label="Select body type"
            >
              <option value="">Select Body Type</option>
              <option value="slim">Slim</option>
              <option value="athletic">Athletic</option>
              <option value="broad">Broad</option>
            </select>
          </div>

          {/* Environment */}
          <div>
            <h2 className="text-md font-semibold mb-3 flex items-center gap-2 text-teal-600" aria-label="Select style environment">
              <span role="img" aria-hidden="true">🏢</span> Style Environment
            </h2>
            <select
              value={environment}
              onChange={(e) => setEnvironment(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-4 focus:ring-teal-300 transition"
              aria-label="Select environment"
            >
              <option value="">Select Environment</option>
              <option value="professional">Professional</option>
              <option value="social">Social</option>
            </select>
          </div>
        </section>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-teal-600 to-teal-500 text-white py-3 rounded-xl font-semibold hover:scale-105 transition-transform duration-300 shadow-lg focus:outline-none focus:ring-4 focus:ring-teal-400 active:scale-95"
          aria-label="Generate style tips"
          type="button"
        >
          Generate My Style Tips
        </button>

        {/* Recommendations output with fade-in animation */}
        {recommendations.length > 0 && (
          <div
            className="mt-12 bg-white p-6 rounded-3xl border border-gray-300 shadow-xl max-w-3xl mx-auto animate-fadeIn"
            role="region"
            aria-live="polite"
            aria-atomic="true"
          >
            <h3 className="text-3xl font-bold mb-6 flex items-center gap-2 text-teal-700 drop-shadow" aria-label="Recommendations">
              <span role="img" aria-hidden="true">✨</span> Recommended Tips:
            </h3>
            <ul className="list-disc pl-6 space-y-3 text-gray-900 text-lg">
              {recommendations.map((tip, index) => (
                <li key={index} className="leading-relaxed">{tip}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Inline CSS Animation */}
      <style>{`
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease forwards;
        }
      `}</style>
    </div>
  );
};

export default FashionPlanner;

