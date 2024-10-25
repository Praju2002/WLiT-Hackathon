import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  IconButton,
  Grid,
  TextField,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Home, Search, Favorite, PlaylistPlay } from "@mui/icons-material";
import { PlayArrow } from "@mui/icons-material";

const categories = ["White Noise", "Rain", "Forest", "Ocean Waves", "Ambient"];

function SoundSearch() {  // Renamed here
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [currentAudio, setCurrentAudio] = useState(null);
  const [playing, setPlaying] = useState(false);
  // Simulating fetching sounds for now

  const fetchSounds = async (category) => {
    setLoading(true);
    try {
      // Stop the current audio if it exists
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
      }

      // Create a new audio object and play it
      const newAudio = new Audio(
        `/audio/${category.toLowerCase().replace(" ", "_")}.mp3`
      );
      newAudio.play();
      setCurrentAudio(newAudio);
    } catch (error) {
      console.error("Error fetching sounds:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleCategoryChange = (index) => {
    setCategoryIndex(index);
    fetchSounds(categories[index]);
  };
  const handlePlayPause = () => {
    setPlaying(!playing);
    if (currentAudio) {
      if (playing) {
        currentAudio.pause();
      } else {
        currentAudio.play();
      }
    }
  };


  // Filter categories based on search term
  const filteredCategories = categories.filter((category) =>
    category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const drawerContent = (
    <Box
      sx={{
        width: 250,
        backgroundColor: "#d4edf9",
        height: "100%",
        color: "black",
        padding: 2,
        boxShadow: "2px 0 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <List>
        {[
          { text: "Home", icon: <Home /> },
          { text: "Search", icon: <Search /> },
          { text: "My Favorites", icon: <Favorite /> },
          { text: "Playlists", icon: <PlaylistPlay /> },
        ].map((item, index) => (
          <ListItem
            button
            key={index}
            component={item.text === "Search" || item.text === "Home" ? Link : "div"}
            to={item.text === "Search" ? "/search" : item.text === "Home" ? "/" : "#"}
            sx={{
              "&:hover": { backgroundColor: "white", borderRadius: "10px" },
            }}
          >
            {item.icon}
            <ListItemText
              primary={item.text}
              sx={{
                color: "black",
                fontFamily: "Poppins, sans-serif",
                marginLeft: "15px",
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f9fafb",
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flex: 1,
          flexDirection: { xs: "column", md: "row" },
          p: { xs: 2, md: 4 },
          gap: { xs: 2, md: 4 },
        }}
      >
        <Box
          sx={{
            display: { xs: "none", md: "block" },
            width: "250px",
          }}
        >
          {drawerContent}
        </Box>

        <Box
          sx={{
            flex: 1,
            background: "linear-gradient(0deg, #ffffff, #d4edf9)",
            borderRadius: "20px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            p: { xs: 3, md: 5 },
            textAlign: "center",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              mb: 2,
              fontFamily: "Poppins, serif",
              color: "#1c2a48",
              fontWeight: 600,
              letterSpacing: 1.2,
              fontSize: { xs: "1.5rem", md: "2rem" },
            }}
          >
            {loading ? "Loading..." : "Sounds Search"}
          </Typography>
          <TextField
            variant="outlined"
            placeholder="Search Categories"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ mb: 3, width: "100%", maxWidth: 400 }}
          />

          <Grid container spacing={2}>
            {filteredCategories.map((category, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <Card
                  sx={{
                    backgroundColor: "#4186b5",
                    color: "#b3b3b3",
                    cursor: "pointer",
                    borderRadius: "20px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    "&:hover": {
                      backgroundColor: "#66acce",
                      color: "white",
                    },
                  }}
                  onClick={() => handleCategoryChange(index)}
                >
                  <CardContent>
                    <Typography
                      variant="h6"
                      sx={{
                        textAlign: "center",
                        fontFamily: "Poppins, sans-serif",
                        fontSize: "1rem",
                        fontWeight: "bold",
                        padding: "5px",
                      }}
                    >
                      {category}
                    </Typography>
                    <Box display="flex" justifyContent="center" mt={2}>
                      <IconButton onClick={handlePlayPause}>
                        <PlayArrow />
                      </IconButton>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}

export default SoundSearch;  // Updated export name
