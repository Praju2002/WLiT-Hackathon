// components/PersonalizedPlaylists.jsx
import React, { useEffect, useState } from 'react';

function PersonalizedPlaylists() {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    // Fetch personalized playlists from the backend or an API
    fetch('/api/personalized-playlists')
      .then(response => response.json())
      .then(data => setPlaylists(data))
      .catch(error => console.error('Error fetching playlists:', error));
  }, []);

  return (
    <div>
      <h1>Personalized Playlists</h1>
      <ul>
        {playlists.map(playlist => (
          <li key={playlist.id}>{playlist.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default PersonalizedPlaylists;