import React, { useState } from 'react';

const MovieSuggestions = () => {
  const [mood, setMood] = useState('');
  const [rating, setRating] = useState(0);
  const [selectedMovie, setSelectedMovie] = useState('');
  const [customRating, setCustomRating] = useState(0);
  const [movieThoughts, setMovieThoughts] = useState('');

  const movieList = {
    relaxed: [
      { title: 'The Pursuit of Happyness', description: 'A heartwarming tale of perseverance and hope.', rating: 4.5 },
      { title: 'The Secret Life of Walter Mitty', description: 'A journey of self-discovery and adventure.', rating: 4.6 },
      { title: 'Eat Pray Love', description: 'A journey of self-love and healing.', rating: 4.4 },
    ],
    motivated: [
      { title: 'Rocky', description: 'A story of a fighter who doesn’t give up.', rating: 4.8 },
      { title: 'The Social Network', description: 'A look at the rise of Facebook and the ambition behind it.', rating: 4.7 },
      { title: 'Steve Jobs', description: 'A powerful look at the life of the visionary entrepreneur.', rating: 4.6 },
    ],
    adventure: [
      { title: 'Inception', description: 'A mind-bending thriller full of action and adventure.', rating: 4.9 },
      { title: 'The Lord of the Rings: The Fellowship of the Ring', description: 'A legendary quest full of adventure and bravery.', rating: 5.0 },
      { title: 'Indiana Jones: Raiders of the Lost Ark', description: 'A classic action-adventure film with a legendary hero.', rating: 4.8 },
    ],
    comedy: [
      { title: 'The Hangover', description: 'A hilarious comedy about a wild bachelor party in Las Vegas.', rating: 4.5 },
      { title: 'Superbad', description: 'A coming-of-age comedy full of laughs and heart.', rating: 4.6 },
      { title: 'Anchorman', description: 'A funny story about a quirky news team in the 1970s.', rating: 4.4 },
    ],
  };

  const handleMoodChange = (e) => {
    setMood(e.target.value);
    setSelectedMovie('');
    setCustomRating(0);
    setMovieThoughts('');
  };

  const handleRatingChange = (e) => {
    setCustomRating(e.target.value);
  };

  const handleMovieSelect = (movie) => {
    setSelectedMovie(movie.title);
    setCustomRating(movie.rating);
  };

  const handleShareThoughts = () => {
    alert(`Your thoughts on "${selectedMovie}": ${movieThoughts}`);
    // In a real-world scenario, here you'd likely save the thoughts to a server or database.
    setMovieThoughts('');
  };

  const movieSuggestions = mood ? movieList[mood] || [] : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 p-6 md:pl-64 text-white">
      <div className="max-w-5xl mx-auto bg-opacity-80 backdrop-blur-lg rounded-3xl p-10 shadow-2xl">
        <h1 className="text-5xl font-bold text-center text-indigo-200 mb-6 drop-shadow-lg">🎬 Movie Night</h1>
        <p className="text-center text-xl text-indigo-100 mb-12">
          Select a mood and get personalized movie suggestions to unwind and relax.
        </p>

        {/* Mood Selector */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-indigo-100 mb-4">What's your mood?</h2>
          <select
            onChange={handleMoodChange}
            className="border-2 border-indigo-300 text-indigo-800 rounded-lg p-3 w-full md:w-1/3 mx-auto mb-6 bg-indigo-100"
            defaultValue=""
          >
            <option value="" disabled>Select Mood</option>
            <option value="relaxed">Relaxed & Unwinding</option>
            <option value="motivated">Motivated & Energized</option>
            <option value="adventure">Adventure & Action</option>
            <option value="comedy">Comedy & Laughter</option>
          </select>
        </div>

        {/* Movie Suggestions */}
        <div className="space-y-8">
          {mood && (
            <>
              <h2 className="text-3xl font-semibold text-indigo-100 mb-4">Movie Suggestions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {movieSuggestions.length > 0 ? (
                  movieSuggestions.map((movie, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleMovieSelect(movie)}
                      className="bg-white text-indigo-900 p-6 rounded-xl shadow-lg hover:scale-105 transition-transform cursor-pointer"
                    >
                      <h3 className="text-2xl font-semibold mb-2">{movie.title}</h3>
                      <p className="text-gray-700 mb-4">{movie.description}</p>
                      <p className="text-indigo-500 font-medium">Rating: {movie.rating}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-300">Please select a mood to see movie suggestions.</p>
                )}
              </div>
            </>
          )}
        </div>

        {/* Rating System */}
        {selectedMovie && (
          <div className="mt-10 text-center">
            <h2 className="text-2xl font-semibold text-indigo-100 mb-4">Rate "{selectedMovie}"</h2>
            <div className="flex justify-center mb-4">
              <input
                type="number"
                value={customRating}
                onChange={handleRatingChange}
                min="0"
                max="5"
                step="0.5"
                className="border-2 border-indigo-300 text-indigo-800 rounded-lg p-4 w-1/4 text-center bg-indigo-100"
                placeholder="Rate (0 - 5)"
              />
            </div>
            <p className="text-indigo-200 text-lg">
              Share your thoughts and rate the movie you’ve watched!
            </p>
          </div>
        )}

        {/* Share Your Thoughts Section */}
        {selectedMovie && (
          <div className="mt-10 text-center">
            <h3 className="text-2xl font-semibold text-indigo-100 mb-4">Share Your Thoughts on "{selectedMovie}"</h3>
            <textarea
              value={movieThoughts}
              onChange={(e) => setMovieThoughts(e.target.value)}
              placeholder="Write your thoughts here..."
              className="border-2 border-indigo-300 text-indigo-800 p-4 w-full md:w-2/3 mx-auto mb-4 rounded-lg bg-indigo-100"
              rows="4"
            ></textarea>
            <div>
              <button
                onClick={handleShareThoughts}
                className="bg-indigo-600 text-white p-3 rounded-lg shadow-lg hover:bg-indigo-700 transition-colors"
              >
                Share Thoughts
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieSuggestions;
