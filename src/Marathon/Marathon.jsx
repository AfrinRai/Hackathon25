import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const LocationPage = () => {
  const [userLocation, setUserLocation] = useState(null); // Store user's location
  const [city, setCity] = useState(''); // City input state
  const [events, setEvents] = useState([]); // Store marathon events
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingEvents, setLoadingEvents] = useState(false);
  const [searchingCity, setSearchingCity] = useState(false); // To track if searching for a city

  const dhakaCoordinates = { lat: 23.8103, lon: 90.4125 }; // Coordinates for Dhaka
  
  // Function to fetch marathon events based on lat and lon
  const fetchMarathonEvents = async (latitude, longitude) => {
    setLoadingEvents(true);
    setError('');
    try {
      console.log(`Fetching marathon events for lat: ${latitude}, lon: ${longitude}`);
      const response = await fetch(
        `https://csefest.srejon.com/api/v1/marathon?lat=${latitude}&lon=${longitude}`
      );
      const data = await response.json();
      if (data.success && data.data.length) {
        setEvents(data.data);
      } else {
        setError('No marathon events found.');
      }
    } catch (err) {
      setError('Failed to fetch marathon events');
    } finally {
      setLoadingEvents(false);
    }
  };

  // Function to fetch city latitude and longitude
  const fetchCityCoordinates = async (cityName) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?city=${cityName}&format=json`
      );
      const data = await response.json();
      if (data.length > 0) {
        const { lat, lon } = data[0];
        return { lat: parseFloat(lat), lon: parseFloat(lon) };
      } else {
        setError('City not found');
        return null;
      }
    } catch (err) {
      setError('Failed to fetch city data');
      return null;
    }
  };

  // Fetch marathon events for default city (Dhaka) or searched city
  useEffect(() => {
    setLoading(true);
    if (!searchingCity) {
      fetchMarathonEvents(dhakaCoordinates.lat, dhakaCoordinates.lon); // Fetch events for Dhaka by default
    }
    setLoading(false);
  }, [searchingCity]);

  // Show either user's location or Dhaka's location
  const locationToShow = userLocation || dhakaCoordinates;

  // Handle city search
  const handleCitySearch = async () => {
    setSearchingCity(true);
    const cityCoordinates = await fetchCityCoordinates(city);
    if (cityCoordinates) {
      setUserLocation(cityCoordinates); // Set the location to the city
      fetchMarathonEvents(cityCoordinates.lat, cityCoordinates.lon); // Fetch marathon events for the city
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-green-50 to-teal-50 p-6 font-sans max-w-6xl mx-auto">
      <h1 className="text-5xl font-extrabold mb-8 text-teal-800 text-center">🗺️ Marathon Events</h1>

      {/* City Search */}
      <div className="flex mb-6">
        <input
          type="text"
          placeholder="Enter city..."
          className="p-3 rounded border border-gray-300 flex-grow focus:outline-none focus:ring-2 focus:ring-teal-300"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button
          onClick={handleCitySearch}
          className="bg-teal-600 text-white px-5 py-3 rounded-lg font-semibold hover:bg-teal-700 transition ml-4"
        >
          Search City
        </button>
      </div>

      {/* Error handling */}
      {error && <p className="text-red-600 text-lg font-semibold text-center">{error}</p>}

      {/* Map view */}
      <div className="my-8">
        <MapContainer
          center={[locationToShow.lat, locationToShow.lon]}
          zoom={13}
          style={{ height: '400px' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[locationToShow.lat, locationToShow.lon]}>
            <Popup>{'Location'}</Popup>
          </Marker>
        </MapContainer>
      </div>

      {/* Loading and events display */}
      {loadingEvents ? (
        <p className="text-teal-700 text-lg animate-pulse text-center">Loading marathon events...</p>
      ) : (
        <>
          {events.length > 0 ? (
            <div>
              <h2 className="text-3xl font-bold text-teal-800 text-center mb-4">Upcoming Marathon Events</h2>
              <ul className="space-y-4">
                {events.map((event) => (
                  <li key={event.id} className="bg-white rounded-lg shadow-md p-4">
                    <h3 className="text-xl font-semibold">{event.name}</h3>
                    <p className="text-lg text-gray-700">📅 {new Date(event.date).toLocaleDateString()}</p>
                    <p className="text-md text-gray-600">{event.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-center text-gray-700">No events available.</p>
          )}
        </>
      )}
    </div>
  );
};

export default LocationPage;
