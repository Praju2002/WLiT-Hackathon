import React from "react";
import { Box, Typography, Card, CardContent } from "@mui/material";
import { useLocation } from "react-router-dom";

function FavoritesPage() {
  // Retrieve favorites passed through route state
  const location = useLocation();
  const { favorites } = location.state || { favorites: [] };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Favorite Sounds
      </Typography>
      {favorites.length > 0 ? (
        favorites.map((favorite, index) => (
          <Card key={index} sx={{ marginBottom: 2 }}>
            <CardContent>
              <Typography variant="h6">{favorite}</Typography>
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography>No favorites selected yet.</Typography>
      )}
    </Box>
  );
}

export default FavoritesPage;
