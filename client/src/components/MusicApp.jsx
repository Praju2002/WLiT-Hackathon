import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Card,
  CardContent,
  Button,
  Slider,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { Pause, PlayArrow, SkipNext, SkipPrevious, Home, Search, Favorite, PlaylistPlay, NoteAlt } from "@mui/icons-material";
import { Link } from "react-router-dom";

const categories = ["White Noise", "Rain", "Forest", "Ocean Waves", "Ambient"];

function MusicApp() {
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(30);
  const [favorites, setFavorites] = useState([]);
  const [currentAudio, setCurrentAudio] = useState(null);

  useEffect(() => {
    fetchSound(categories[categoryIndex]);
  }, [categoryIndex]);

  const fetchSound = async (category) => {
    setLoading(true);
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }
    const filePath = `/audio/${category.toLowerCase().replace(" ", "_")}.mp3`;
    const newAudio = new Audio(filePath);
    newAudio.volume = volume / 100;
    setCurrentAudio(newAudio);
    setLoading(false);
  };

  const playSound = (category, index) => {
    // If a different sound is playing, pause and reset it
    if (currentAudio && categoryIndex !== index) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }
  
    // If the clicked category is the one currently playing
    if (categoryIndex === index && playing) {
      // Pause the audio
      currentAudio.pause();
      setPlaying(false);
      return; // Exit the function to prevent further execution
    }
  
    // Prepare to play the new audio
    const filePath = `/audio/${category.toLowerCase().replace(" ", "_")}.mp3`;
    const newAudio = new Audio(filePath);
    newAudio.volume = volume / 100;
  
    // Set up the audio ending event
    newAudio.onended = () => {
      setPlaying(false);
      setCurrentAudio(null);
    };
  
    // Set new audio state
    setCurrentAudio(newAudio);
    setCategoryIndex(index);
    setPlaying(true);
    newAudio.play().catch(error => {
      console.error("Error playing audio:", error);
    });
  };
  
  const handlePlayPause = () => {
    if (currentAudio) {
      if (playing) {
        // Pause if currently playing
        currentAudio.pause();
      } else {
        // Play if currently paused
        currentAudio.play().catch(error => {
          console.error("Error playing audio:", error);
        });
      }
      // Toggle the playing state
      setPlaying(!playing);
    }
  };
  
  const handleCategoryChange = (index) => {
    if (categoryIndex !== index) {
      setCategoryIndex(index);
      playSound(categories[index], index);
    } else if (!playing) {
      playSound(categories[index], index);
    }
  };

  const handleVolumeChange = (event, newValue) => {
    setVolume(newValue);
    if (currentAudio) {
      currentAudio.volume = newValue / 100;
    }
  };

  const handleFavoriteToggle = (category) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(category)
        ? prevFavorites.filter((item) => item !== category)
        : [...prevFavorites, category]
    );
  };

  const drawerContent = (
    <Box sx={{ width: 250, backgroundColor: "#d4edf9", height: "100%", color: "black", padding: 2, boxShadow: "2px 0 8px rgba(0, 0, 0, 0.1)" }}>
      <List>
        {[
          { text: "Home", icon: <Home /> },
          { text: "Search", icon: <Search /> },
          { text: "My Favorites", icon: <Favorite /> },
          { text: "Playlists", icon: <PlaylistPlay /> },
          { text: "Journal", icon: <NoteAlt /> },
        ].map((item, index) => (
          <ListItem button key={index} component={Link} to="/" sx={{ "&:hover": { backgroundColor: "white", borderRadius: "10px" } }}>
            {item.icon}
            <ListItemText primary={item.text} sx={{ color: "black", fontFamily: "Poppins, sans-serif", marginLeft: "15px" }} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column", backgroundColor: "#f9fafb", minHeight: "100vh" }}>
      <Box sx={{ display: "flex", flex: 1, flexDirection: { xs: "column", md: "row" }, p: { xs: 2, md: 4 }, gap: { xs: 2, md: 4 } }}>
        <Box sx={{ display: { xs: "none", md: "block" }, width: "250px" }}>{drawerContent}</Box>

        <Box sx={{ flex: 1, background: "linear-gradient(0deg, #ffffff, #d4edf9)", borderRadius: "20px", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", p: { xs: 3, md: 5 }, textAlign: "center" }}>
          <Typography variant="h4" sx={{ mb: 2, fontFamily: "Poppins, serif", color: "#1c2a48", fontWeight: 600, letterSpacing: 1.2, fontSize: { xs: "1.5rem", md: "2rem" } }}>
            {loading ? "Loading..." : `${categories[categoryIndex]} Sounds`}
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, color: "#616161", fontSize: "1rem" }}>7 Tracks | 00hr:53min:12sec</Typography>

          {/* <Button variant="contained" sx={{ backgroundColor: "#4186b5", color: "black", padding: "12px 24px", borderRadius: "30px", fontSize: "1.1rem", mb: 4, fontFamily: "Poppins, sans-serif", "&:hover": { backgroundColor: "#66acce" } }} onClick={handlePlayPause}>
            {playing ? "Pause" : "Play"}
            <IconButton sx={{ color: "black" }} aria-label={playing ? "Pause" : "Play"}>{playing ? <Pause /> : <PlayArrow />}</IconButton>
          </Button> */}

          <Box sx={{ display: "flex", justifyContent: "center", gap: 2, flexWrap: "wrap", mb: 4, "&::-webkit-scrollbar": { display: "none" }, msOverflowStyle: "none", scrollbarWidth: "none" }}>
            {categories.map((category, index) => (
              <Card key={index} sx={{ width: { xs: "30%", sm: "30%", md: "30%", lg: "18%" }, maxWidth: "200px", minWidth: "150px", backgroundColor: categoryIndex === index ? "#66acce" : "#4186b5", color: categoryIndex === index ? "white" : "#b3b3b3", cursor: "pointer", transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out", borderRadius: "20px", boxShadow: categoryIndex === index ? "0 8px 16px rgba(0, 0, 0, 0.2)" : "0 4px 8px rgba(0, 0, 0, 0.1)", "&:hover": { transform: "scale(1.05)", boxShadow: "0 12px 24px rgba(0, 0, 0, 0.3)" }, position: "relative", marginBottom: "20px" }} onClick={() => playSound(category, index)}>
                <CardContent sx={{ position: "relative" }}>
                  <Typography variant="h6" sx={{ textAlign: "center", fontFamily: "Poppins, sans-serif", fontSize: "1rem", fontWeight: "bold", padding: "5px", color: categoryIndex === index ? "white" : "#b3b3b3" }}>{category}</Typography>
                  <IconButton onClick={() => handleFavoriteToggle(category)} sx={{ position: "absolute", top: 10, right: 10 }}><Favorite color={favorites.includes(category) ? "error" : "disabled"} /></IconButton>
                  <IconButton onClick={(event) => { event.stopPropagation(); categoryIndex === index ? handlePlayPause() : playSound(category, index); }}>{playing && categoryIndex === index ? <Pause /> : <PlayArrow />}</IconButton>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>
      </Box>

      <Box sx={{ position: "fixed", bottom: 0, left: 0, width: "100%", backgroundColor: "#d4edf9", color: "black", p: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="body1" sx={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}>{categories[categoryIndex]}</Typography>
        <Box sx={{ width: 200, px: 2 }}>
          <Slider value={volume} onChange={handleVolumeChange} min={0} max={100} sx={{ color: "#4186b5" }} />
        </Box>
      </Box>
    </Box>
  );
}

export default MusicApp;
