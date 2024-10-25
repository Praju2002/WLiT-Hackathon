const express = require('express');
const app = express();
const port = 3001;

// Mock data for personalized playlists
const playlists = [
  { id: 1, name: 'Chill Vibes' },
  { id: 2, name: 'Workout Mix' },
  { id: 3, name: 'Top Hits' },
];

// Endpoint to get personalized playlists
app.get('/api/personalized-playlists', (req, res) => {
  res.json(playlists);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});