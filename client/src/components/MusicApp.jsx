import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  IconButton,
  Grid,
  TextField,
  Slider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import img from '../assets/PngItem_3784107.png';
import { Link } from "react-router-dom";
import { Home, Search, Favorite, PlaylistPlay, VolumeUp, Pause, PlayArrow, NoteAlt, } from "@mui/icons-material";
import InputAdornment from "@mui/material/InputAdornment";
// const categories = ["White Noise", "Rain", "Forest", "Ocean Waves", "Ambient"];
const categories = [
  { title: "White Noise", artist: "Nature", category: "White Noise" },
  { title: "Rainfall", artist: "Soothing Sounds", category: "Rain" },
  { title: "Forest Vibes", artist: "Nature", category: "Forest" },
  { title: "Ocean Waves", artist: "Relaxation", category: "Ocean Waves" },
  { title: "Ambient", artist: "Chill Atmosphere", category: "Ambient" },
];
function MusicApp() {
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryIndex, setCategoryIndex] = useState(null);
  const [currentAudio, setCurrentAudio] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [currentTrack, setCurrentTrack] = useState({ title: "", artist: "" });


  // Play or pause sound based on the selected category
  const playSound = (category, index) => {
    // Pause and reset any currently playing audio
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;  // Reset the audio position
      setCurrentAudio(null);
      setPlaying(false);
    }

    // If the clicked category is already playing, pause it
    if (categoryIndex === index && playing) {
      setPlaying(false);
      return;
    }

    const newAudio = new Audio(`/audio/${category.category.toLowerCase().replace(" ", "_")}.mp3`);
    newAudio.volume = volume;
    newAudio.play();

    setCurrentAudio(newAudio);
    setPlaying(true);
    setCategoryIndex(index);
    setCurrentTrack({ title: category.title, artist: category.artist });


    // Set playing to false once audio ends
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
      setPlaying(!playing);  // Toggle play/pause state
    }
  };



  const handleVolumeChange = (event, newValue) => {
    setVolume(newValue);
    if (currentAudio) {
      currentAudio.volume = newValue;
    }
  };

  const filteredCategories = categories.filter((category) =>
    category.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const styles = {
    cdContainer: {
      width: "150px",
      height: "150px",
      borderRadius: "50%",
      backgroundImage: `url(${img})`, // Set your album cover image or default CD image here
      backgroundSize: "cover",
      backgroundPosition: "center",
      boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)",
      animation: "spin 4s linear infinite",
      "@keyframes spin": {
        from: {
          transform: "rotate(0deg)",
        },
        to: {
          transform: "rotate(360deg)",
        },
      }, // Default to spinning
    },
    "@keyframes spin": {
      from: { transform: "rotate(0deg)" },
      to: { transform: "rotate(360deg)" },
    },
  };
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
          { text: "Journal", icon: <NoteAlt /> },
        ].map((item, index) => (
          <ListItem
            button
            key={index}
            component={
              item.text === "Search" ||
                item.text === "Home" ||
                item.text === "My Favorites" ||
                item.text === "Playlists" ||
                item.text === "Journal"
                ? Link
                : "div"
            }
            to={
              item.text === "Search"
                ? "/search"
                : item.text === "Home"
                  ? "/music"
                  : item.text === "My Favorites"
                    ? "/favorites"
                    : item.text === "Playlists"
                      ? "/playlists"
                      : item.text === "Journal"
                        ? "/diary"
                        : "#"
            }
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

<Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", mt: 4 }}>
  <Typography
    variant="h4"
    sx={{
      mb: 2,
      fontFamily: "Poppins, serif",
      color: "#1c2a48",
      fontWeight: 600,
      letterSpacing: 1.2,
      fontSize: { xs: "1.5rem", md: "2rem" },
      textAlign: "center", // Ensures the text is centered properly
    }}
  >
    {loading ? "Loading..." : "Now Playing"}
  </Typography>

  {/* Container for the rotating CD and track information */}
  <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 3 }}>
    {/* Rotating CD animation */}
    <Box sx={styles.cdContainer}>
      <Box
        sx={{
          ...styles.cdImage,
          animation: playing ? "spin 4s linear infinite" : "none", // Animation for playing state
        }}
      />
    </Box>

    {/* Track information */}
    <Typography variant="h5" sx={{ color: "#1c2a48", mt: 2, fontWeight: "bold", textAlign: "center" }}>
      {currentTrack.title || "Select a track"}
    </Typography>
    <Typography variant="subtitle1" sx={{ color: "#666", textAlign: "center" }}>
      {currentTrack.artist || ""}
    </Typography>
  </Box>
</Box>



          <Box display="flex" alignItems="center" justifyContent="flex-end" mb={2}>
            <VolumeUp sx={{ color: "#1c2a48", mr: 1 }} />
            <Slider
              orientation="vertical"
              value={volume}
              min={0}
              max={1}
              step={0.01}
              onChange={handleVolumeChange}
              sx={{
                height: 100,
                '& .MuiSlider-track': {
                  backgroundColor: "#66acce",
                },
                '& .MuiSlider-rail': {
                  backgroundColor: "#cfd8dc",
                },
                '& .MuiSlider-thumb': {
                  backgroundColor: "#1c2a48",
                },
              }}
            />
          </Box>
          <Grid container justifyContent="center" spacing={4}>
            {filteredCategories.map((category, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <Card
                  sx={{
                    background: categoryIndex === index
                      ? "linear-gradient(135deg, #66acce, #4e92b2)"
                      : "linear-gradient(135deg, #4186b5, #356c94)",
                    color: "#fff",
                    cursor: "pointer",
                    borderRadius: "25px",
                    boxShadow: "0 6px 20px rgba(0, 0, 0, 0.15)",
                    padding: "20px",
                    minHeight: "200px",
                    maxWidth: "300px",
                    margin: "auto",
                    transition: "transform 0.4s, box-shadow 0.4s",
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: "0 8px 25px rgba(0, 0, 0, 0.2)",
                      background: "linear-gradient(135deg, #66acce, #67b0d6)",
                    },
                  }}
                  onClick={() => playSound(category, index)}
                >
                  <CardContent>
                    <Typography
                      variant="h5"
                      sx={{
                        textAlign: "center",
                        fontFamily: "Poppins, sans-serif",
                        fontSize: "1.25rem",
                        fontWeight: 700,
                        padding: "10px 0",
                        color: categoryIndex === index ? "#ffffff" : "#e0e7ff",
                      }}
                    >
                      {category.title}
                    </Typography>
                    
                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontFamily: "Poppins, sans-serif",
                        mt: 1,
                        fontSize: "0.9rem",
                        color: "rgba(255, 255, 255, 0.8)",
                      }}
                    >
                      {category.artist}
                    </Typography>
                    <Box display="flex" justifyContent="center" mt={3}>
                      <IconButton
                        onClick={(event) => {
                          event.stopPropagation();
                          categoryIndex === index ? handlePlayPause() : playSound(category, index);
                        }}
                        sx={{
                          backgroundColor: "#ffffff33",
                          color: "white",
                          "&:hover": { backgroundColor: "#ffffff55" },
                        }}
                      >
                        {playing && categoryIndex === index ? <Pause fontSize="large" /> : <PlayArrow fontSize="large" />}
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

export default MusicApp;
