import React, { useState, useEffect } from 'react';

const skillPaths = {
  creator: {
    title: 'The Creator (App Developer)',
    steps: [
      '🔍 Learn HTML/CSS/JS basics from MDN or FreeCodeCamp.',
      '🧠 Build small apps like calculator or to-do list.',
      '⚔️ Start React and build real-world projects.',
      '🚀 Publish projects on GitHub and showcase online.',
    ],
    dailyChallenges: [
      'Code a button that toggles dark mode.',
      'Watch a 10-min JS tips video.',
      'Refactor a piece of old code.',
    ],
    podcast: 'https://www.youtube.com/watch?v=jwHlHVQY958'
  },
  designer: {
    title: 'The Designer (UI/UX)',
    steps: [
      '🎨 Understand color theory and spacing.',
      '📐 Learn Figma and recreate 3 app screens.',
      '🧩 Join a design challenge like "Daily UI".',
      '🌟 Share on Dribbble or Behance.',
    ],
    dailyChallenges: [
      'Recreate the Instagram login screen in Figma.',
      'Study 2 designs from Dribbble and write notes.',
      'Redesign your app’s settings page.',
    ],
    podcast: 'https://www.youtube.com/watch?v=DRbjdXjHPBc'
  },
  speaker: {
    title: 'The Speaker (Public Speaking)',
    steps: [
      '🪞 Practice mirror speaking & record voice.',
      '🎤 Join online speaking rooms (e.g., Clubhouse, Zoom groups).',
      '📚 Learn storytelling techniques and frameworks.',
      '🎯 Give a small talk at a college group or local event.',
    ],
    dailyChallenges: [
      'Practice a 1-minute intro speech.',
      'Record yourself explaining a news article.',
      'Watch a TED talk and summarize it.',
    ],
    podcast: 'https://www.youtube.com/watch?v=eIho2S0ZahI'
  },
  analyst: {
    title: 'The Analyst (Data & Strategy)',
    steps: [
      '📊 Learn Excel or Google Sheets deeply.',
      '📈 Explore basic statistics and data visualization.',
      '🧮 Study SQL and work on a dataset project.',
      '📉 Build dashboards with tools like Tableau or PowerBI.',
    ],
    dailyChallenges: [
      'Analyze a dataset from Kaggle.',
      'Visualize today’s news data.',
      'Create a small dashboard with 3 insights.',
    ],
    podcast: 'https://www.youtube.com/watch?v=y6EDBUNS_UI&t=403s'
  },
  contentCreator: {
    title: 'The Storyteller (Content Creator)',
    steps: [
      '📽 Learn basic video/audio editing.',
      '📸 Start sharing weekly reels or shorts.',
      '🗣 Understand audience engagement and analytics.',
      '🏆 Monetize content via sponsorships or merch.',
    ],
    dailyChallenges: [
      'Create a 30s motivational reel.',
      'Edit a video with subtitles and music.',
      'Comment on 3 creators you admire.',
    ],
    podcast: 'https://www.youtube.com/watch?v=7bD_RT64OW0'
  }
};

const badges = ['🚀 Initiator', '🧠 Thinker', '⚔️ Challenger', '🏁 Completer'];

const SkillQuest = () => {
  const [selectedRole, setSelectedRole] = useState('');
  const [completedSteps, setCompletedSteps] = useState([]);
  const [xp, setXp] = useState(0);
  const [dailyChallenge, setDailyChallenge] = useState('');

  useEffect(() => {
    if (selectedRole) {
      const challenges = skillPaths[selectedRole].dailyChallenges;
      const random = challenges[Math.floor(Math.random() * challenges.length)];
      setDailyChallenge(random);
    }
  }, [selectedRole]);

  const handleStepClick = (index) => {
    if (!completedSteps.includes(index)) {
      setCompletedSteps((prev) => [...prev, index]);
      setXp((prev) => prev + 25);
    }
  };

  const progressPercent = (xp / (skillPaths[selectedRole]?.steps.length * 25)) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 p-6 md:pl-64 text-gray-800">
      <div className="max-w-5xl mx-auto bg-white/80 backdrop-blur-lg shadow-xl rounded-3xl p-10">
        <h1 className="text-4xl font-bold text-center text-purple-700 mb-4">🧭 Skill Quest</h1>
        <p className="text-center text-lg text-gray-600 mb-10">
          Pick your quest path. Complete steps. Earn XP. Unlock your potential.
        </p>

        {/* Character Selection */}
        <div className="flex flex-wrap justify-center gap-6 mb-10">
          {Object.entries(skillPaths).map(([key, role]) => (
            <button
              key={key}
              onClick={() => {
                setSelectedRole(key);
                setCompletedSteps([]);
                setXp(0);
              }}
              className={`px-6 py-4 rounded-xl border-2 transition-all text-lg font-medium ${
                selectedRole === key
                  ? 'bg-purple-200 border-purple-600 text-purple-900 scale-105'
                  : 'bg-white border-gray-300 hover:border-purple-400'
              }`}
            >
              {role.title}
            </button>
          ))}
        </div>

        {/* XP Progress Bar & Badges */}
        {selectedRole && (
          <>
            <div className="mb-6">
              <div className="text-sm mb-1 font-semibold text-purple-800">
                XP Progress: {xp} / {skillPaths[selectedRole].steps.length * 25}
              </div>
              <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-purple-500 transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
              <div className="mt-2 flex gap-2 text-sm text-indigo-700 font-medium">
                {completedSteps.length > 0 && badges.slice(0, completedSteps.length).map((badge, idx) => (
                  <span key={idx} className="bg-purple-100 border border-purple-400 rounded-xl px-2 py-1">
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            {/* Daily Challenge */}
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-xl mb-6">
              <h2 className="font-bold text-yellow-700 text-lg mb-1">🎯 Daily Skill Challenge:</h2>
              <p className="text-gray-700">{dailyChallenge}</p>
            </div>

            {/* Audio/Podcast */}
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-xl mb-10">
              <h2 className="font-bold text-blue-700 text-lg mb-1">🎧 Recommended Podcast:</h2>
              <a
                href={skillPaths[selectedRole].podcast}
                className="text-blue-600 underline hover:text-blue-800"
                target="_blank"
                rel="noopener noreferrer"
              >
                {skillPaths[selectedRole].podcast}
              </a>
            </div>

            {/* Steps Timeline */}
            <div className="relative pl-6 border-l-4 border-purple-300 space-y-6">
              {skillPaths[selectedRole].steps.map((step, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 cursor-pointer group"
                  onClick={() => handleStepClick(index)}
                >
                  <div
                    className={`w-5 h-5 mt-1 rounded-full ${
                      completedSteps.includes(index)
                        ? 'bg-purple-600'
                        : 'bg-white border-2 border-purple-400 group-hover:bg-purple-200'
                    }`}
                  ></div>
                  <div className={`text-lg ${completedSteps.includes(index) ? 'line-through text-gray-400' : ''}`}>
                    {step}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SkillQuest;
