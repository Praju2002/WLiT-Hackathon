import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  IconButton,
  Grid,
  Slider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import {
  NoteAlt,
  Home,
  Search,
  Favorite,
  PlaylistPlay,
  VolumeUp,
  Pause,
  PlayArrow,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:5000";
const categories = [
  "White Noise",
  "Rain",
  "Forest",
  "Ocean Waves",
  "Ambient",
  "Meditation",
  "Anger",
  "Uplifting",
];

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryIndex, setCategoryIndex] = useState(null);
  const [currentAudio, setCurrentAudio] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const userEmail = "test@example.com";

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/user/${userEmail}/favorites`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setFavorites(data.favorites); // Set the fetched favorites
      } catch (error) {
        console.error("Error fetching favorites:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchFavorites();
  }, [userEmail]);

  const playSound = (category, index) => {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      setCurrentAudio(null);
      setPlaying(false);
    }

    if (categoryIndex === index && playing) {
      setPlaying(false);
      return;
    }

    const newAudio = new Audio(
      `/audio/${category.toLowerCase().replace(" ", "_")}.mp3`
    );
    newAudio.volume = volume;
    newAudio.play();

    setCurrentAudio(newAudio);
    setPlaying(true);
    setCategoryIndex(index);

    newAudio.onended = () => {
      setPlaying(false);
      setCurrentAudio(null);
    };
  };

  const handlePlayPause = () => {
    if (currentAudio) {
      if (playing) {
        currentAudio.pause();
      } else {
        currentAudio.play();
      }
      setPlaying(!playing);
    }
  };

  const handleVolumeChange = (event, newValue) => {
    setVolume(newValue);
    if (currentAudio) {
      currentAudio.volume = newValue;
    }
  };

  const filteredFavorites = favorites.filter((favorite) =>
    favorite.toLowerCase().includes(searchTerm.toLowerCase())
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
          { text: "Playlists", icon: <PlaylistPlay /> },
          { text: "Journal", icon: <NoteAlt /> },
        ].map((item, index) => (
          <ListItem
            button
            key={index}
            component={Link}
            to={
              item.text === "Search"
                ? "/search"
                : item.text === "Home"
                ? "/music"
                : item.text === "Playlists"
                ? "/favorites"
                : "/diary"
            }
            sx={{
              "&:hover": {
                backgroundColor: "white ",
                borderRadius: "10px",
                "& .MuiSvgIcon-root": { color: "green" },
              },
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
        <Box sx={{ display: { xs: "none", md: "block" }, width: "250px" }}>
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
            {loading ? "Loading..." : "Your Personalized Sounds"}
          </Typography>

          <Box
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
            mt={4}
          >
            <VolumeUp sx={{ mr: 1 }} />
            <Slider
              value={volume}
              min={0}
              max={1}
              step={0.01}
              onChange={handleVolumeChange}
              sx={{ width: "80%", maxWidth: 250, margin: "10px" }}
            />
          </Box>

          <Grid container spacing={2}>
            {filteredFavorites.map((favorite, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <Card
                  sx={{
                    backgroundColor:
                      categoryIndex === index ? "#66acce" : "#4186b5",
                    color: "#b3b3b3",
                    cursor: "pointer",
                    borderRadius: "20px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    "&:hover": {
                      backgroundColor: "#66acce",
                      color: "white",
                    },
                  }}
                  onClick={() => playSound(favorite, index)}
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
                      {favorite}
                    </Typography>
                    <Box display="flex" justifyContent="center" mt={2}>
                      <IconButton
                        onClick={(event) => {
                          event.stopPropagation();
                          categoryIndex === index
                            ? handlePlayPause()
                            : playSound(favorite, index);
                        }}
                      >
                        {playing && categoryIndex === index ? (
                          <Pause />
                        ) : (
                          <PlayArrow />
                        )}
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

export default Favorites;
