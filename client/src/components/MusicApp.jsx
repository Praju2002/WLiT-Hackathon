import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

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
import { Pause } from "@mui/icons-material";
import { Link } from "react-router-dom";
import {
  Menu as MenuIcon,
  PlayArrow,
  SkipNext,
  SkipPrevious,
  Home,
  Search,
  Favorite,
  PlaylistPlay,
  NoteAlt,
} from "@mui/icons-material";
import { keyframes } from "@emotion/react";

const categories = ["White Noise", "Rain", "Forest", "Ocean Waves", "Ambient"];

function MusicApp() {
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(30);
  const [favorites, setFavorites] = useState([]);
  const [currentAudio, setCurrentAudio] = useState(null);

  const [sounds, setSounds] = useState([]);

  useEffect(() => {
    fetchSoundsByCategory(categories[categoryIndex]);
  }, [categoryIndex]);

  const fetchSoundsByCategory = async (category,index) => {
    setLoading(true);
    try {
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
      }
      const filePath = `/audio/${category.toLowerCase().replace(" ", "_")}.mp3`;
      console.log(`Fetching audio file: ${filePath}`);
      const newAudio = new Audio(filePath);
      newAudio.volume = volume / 100;
      setCurrentAudio(newAudio);
      
    } catch (error) {
      console.error("Error fetching sounds:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (index) => {
    setLoading(true);
    setTimeout(() => {
      setCategoryIndex(index);
      setLoading(false);
    },1); // Simulating a loading time
  };

 
  
  // Event Listener to reset playing state when audio ends

  
  
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
    const filePath = `/audio/${category.toLowerCase().replace(" ", "_")}.mp3`;
    const newAudio = new Audio(filePath);
    newAudio.volume = volume / 100;
    newAudio.volume = volume;
    newAudio.play();
    setCurrentAudio(newAudio);
    setCategoryIndex(index);
    setPlaying(true);
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

  const handleFavoriteToggle = (category) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(category)
        ? prevFavorites.filter((item) => item !== category)
        : [...prevFavorites, category]
    );
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
        {/* Sidebar for larger screens */}
        <Box
          sx={{
            display: { xs: "none", md: "block" },
            width: "250px",
          }}
        >
          {drawerContent}
        </Box>

        {/* Main Sound Section */}
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
            {loading ? "Loading..." : `${categories[categoryIndex]} Sounds`}
          </Typography>
          <Typography
            variant="body1"
            sx={{ mb: 3, color: "#616161", fontSize: "1rem" }}
          >
            7 Tracks | 00hr:53min:12sec
          </Typography>

          {/* Play Button */}
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#4186b5",
              color: "black",
              padding: "12px 24px",
              borderRadius: "30px",
              fontSize: "1.1rem",
              mb: 4,
              fontFamily: "Poppins, sans-serif",
              "&:hover": { backgroundColor: "#66acce" },
            }}
            onClick={handlePlayPause}
          >
            {playing ? "Pause" : "Play"}
            <IconButton
              sx={{ color: "black" }}
              aria-label={playing ? "Pause" : "Play"}
            >
              <PlayArrow />
            </IconButton>
          </Button>
          <Box sx={{ mb: 3, textAlign: "center" }}>
            <Typography
              variant="h6"
              sx={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: 500,
                color: "#1c2a48",
              }}
            >
              How are you feeling?
            </Typography>
            <Box
              sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 1 }}
            >
              <Typography
                variant="body1"
                sx={{ fontSize: "2rem", cursor: "pointer" }}
              >
                😊
              </Typography>
              <Typography
                variant="body1"
                sx={{ fontSize: "2rem", cursor: "pointer" }}
              >
                😌
              </Typography>
              <Typography
                variant="body1"
                sx={{ fontSize: "2rem", cursor: "pointer" }}
              >
                😴
              </Typography>
              <Typography
                variant="body1"
                sx={{ fontSize: "2rem", cursor: "pointer" }}
              >
                😌
              </Typography>
              <Typography
                variant="body1"
                sx={{ fontSize: "2rem", cursor: "pointer" }}
              >
                😍
              </Typography>
            </Box>
          </Box>

          {/* Category Cards */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 2,
              flexWrap: "wrap", // Allow cards to wrap
              mb: 4,
              "&::-webkit-scrollbar": {
                display: "none",
              },
              msOverflowStyle: "none", // for IE and Edge
              scrollbarWidth: "none", // for Firefox
            }}
          >
            {categories.map((category, index) => (
              <Card
                key={index}
                sx={{
                  width: {
                    xs: "30%", // 3 cards per row on extra small (mobile) screens
                    sm: "30%", // 3 cards per row on small screens
                    md: "30%", // 3 cards per row on medium screens
                    lg: "18%", // 5 cards per row on large screens
                  },
                  maxWidth: "200px", // Max card width limit
                  minWidth: "150px", // Ensure a minimum width
                  height: "auto",
                  backgroundColor:
                    categoryIndex === index ? "#66acce" : "#4186b5",
                  color: categoryIndex === index ? "white" : "#b3b3b3",

                  cursor: "pointer",
                  transition:
                    "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
                  borderRadius: "20px",
                  boxShadow:
                    categoryIndex === index
                      ? "0 8px 16px rgba(0, 0, 0, 0.2)"
                      : "0 4px 8px rgba(0, 0, 0, 0.1)",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: "0 12px 24px rgba(0, 0, 0, 0.3)",
                  },
                  position: "relative", // To position play button and tape
                  marginBottom: "20px", // Add bottom margin for wrapping
                }}
                onClick={() => handleCategoryChange(index)}
              >
                <CardContent sx={{ position: "relative" }}>
                  {/* Category Title */}
                  <Typography
                    variant="h6"
                    sx={{
                      textAlign: "center",
                      fontFamily: "Poppins, sans-serif",
                      fontSize: "1rem",
                      fontWeight: "bold",
                      padding: "5px",
                      color: categoryIndex === index ? "white" : "#b3b3b3",
                    }}
                  >
                    {category}
                  </Typography>
                  <IconButton

                onClick={() => handleFavoriteToggle(category)}
                sx={{ position: "absolute", top: 10, right: 10 }}
              >
                <Favorite color={favorites.includes(category) ? "error" : "disabled"} />
              </IconButton>
              <IconButton
                    onClick={(event) => {
                      event.stopPropagation();
                      categoryIndex === index ? handlePlayPause() : playSound(category, index);
                    }}
                  >
                    {playing && categoryIndex === index ? <Pause /> : <PlayArrow />}
                  
              
              </IconButton>


                  {/* Artist Name */}
                  <Typography
                    variant="subtitle2"
                    sx={{
                      textAlign: "center",
                      fontFamily: "Poppins, sans-serif",
                      fontSize: "0.8rem",
                      fontWeight: "300",
                      color: categoryIndex === index ? "#f0f0f0" : "#8a8a8a", // Lighter text for artist name
                    }}
                  >
                    {`Artist ${index + 1}`} {/* Example artist name */}
                  </Typography>

                  {/* Image with Play Button Overlay */}
                  <Box
                    sx={{
                      height: "120px",
                      background: `url('/path_to_image/${category.toLowerCase()}.jpg') no-repeat center/cover`,
                      borderRadius: "12px",

                      marginTop: "10px",
                      position: "relative",
                      "&:hover .playButton": {
                        opacity: 1, // Show play button on hover
                      },
                    }}
                  >
                    {/* Play Button */}
                    <Box
                      className="playButton"
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        backgroundColor: "rgba(0, 0, 0, 0.7)",
                        borderRadius: "50%",
                        width: "40px",
                        height: "40px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        opacity: 0, // Hidden by default
                        transition: "opacity 0.3s ease",
                        cursor: "pointer",
                      }}
                    >
                      <PlayArrow sx={{ color: "white" }} />
                    </Box>
                  </Box>

                  {/* Moving Tape / Progress Indicator */}
                  {categoryIndex === index && (
                    <Box
                      sx={{
                        height: "4px",
                        backgroundColor: "#1ed760", // Spotify green color
                        borderRadius: "2px",
                        mt: 2,
                        width: "100%",
                        position: "relative",
                        overflow: "hidden",
                      }}
                    >
                      <Box
                        sx={{
                          width: "100%",
                          height: "100%",
                          backgroundColor: "#1ed760",
                          position: "absolute",
                          top: 0,
                          left: 0,
                          animation: "progressMove 5s linear infinite", // Simulating progress movement
                        }}
                      ></Box>
                    </Box>
                  )}
                </CardContent>
              </Card>
            ))}

            <style jsx>{`
              @keyframes progressMove {
                0% {
                  left: -100%;
                }
                100% {
                  left: 100%;
                }
              }
            `}</style>
          </Box>
        </Box>
      </Box>

      {/* Bottom Player */}
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          backgroundColor: "#d4edf9",
          color: "black",
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography>Now Playing: {categories[categoryIndex]} Sound</Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton sx={{ color: "black" }} aria-label="previous">
            <SkipPrevious />
          </IconButton>
          <IconButton
            sx={{ color: "black" }}
            aria-label={playing ? "Pause" : "Play"}
            onClick={handlePlayPause}
          >
            <PlayArrow />
          </IconButton>
          <IconButton sx={{ color: "black" }} aria-label="next">
            <SkipNext />
          </IconButton>
        </Box>
        <Box sx={{ width: "150px" }}>
          <Typography>Volume</Typography>
          <Slider
            value={volume}
            onChange={(event, newValue) => setVolume(newValue)}
            sx={{ color: "black" }}
            aria-label="volume"
          />
        </Box>
      </Box>

      {loading && (
        <CircularProgress
          size={60}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      )}
    </Box>
  );
}

export default MusicApp;
