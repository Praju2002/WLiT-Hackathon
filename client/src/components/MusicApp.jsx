import React, { useState } from "react";
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
import { Link } from "react-router-dom";
import { Menu as MenuIcon, PlayArrow, SkipNext, SkipPrevious, Home, Search, Favorite, PlaylistPlay } from "@mui/icons-material";

const categories = ["White Noise", "Rain", "Forest", "Ocean Waves", "Ambient"];

function MusicApp() {
  const [categoryIndex, setCategoryIndex] = useState(0);
  // const [drawerOpen, setDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(30);


  const handleCategoryChange = (index) => {
    setLoading(true);
    setTimeout(() => {
      setCategoryIndex(index);
      setLoading(false);
    }, 1000); // Simulating a loading time
  };

  const handlePlayPause = () => {
    setPlaying(!playing);
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
        {[{ text: "Home", icon: <Home /> },
        { text: "Search", icon: <Search /> },
        { text: "My Favorites", icon: <Favorite /> },
        { text: "Playlists", icon: <PlaylistPlay /> }].
          map((item, index) => (
            <ListItem button key={index} component={item.text === "Search" ? Link : "div"} to={item.text === "Search" ? "/search" : "#"} sx={{ "&:hover": { backgroundColor: "white", borderRadius: "10px" } }}>
              {item.icon}
              <ListItemText primary={item.text} sx={{ color: "black", fontFamily: "Poppins, sans-serif", marginLeft: "15px" }} />
            </ListItem>
          ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column", backgroundColor: "#f9fafb", minHeight: "100vh" }}>


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
            backgroundColor: "#ffffff",
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
          <Typography variant="body1" sx={{ mb: 3, color: "#616161", fontSize: "1rem" }}>
            7 Tracks | 00hr:53min:12sec
          </Typography>

          {/* Play Button */}
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#1e88e5",
              color: "black",
              padding: "12px 24px",
              borderRadius: "30px",
              fontSize: "1.1rem",
              mb: 4,
              fontFamily: "Poppins, sans-serif",
              "&:hover": { backgroundColor: "#1565c0" },
            }}
            onClick={handlePlayPause}
          >
            {playing ? "Pause" : "Play"}
            <IconButton sx={{ color: "black" }} aria-label={playing ? "Pause" : "Play"}>
              <PlayArrow />
            </IconButton>
          </Button>

          {/* Category Cards */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 2,
              overflowX: "auto",
              mb: 4,
              "&::-webkit-scrollbar": {
                display: "none",
              },
              "-ms-overflow-style": "none", // for Internet Explorer and Edge
              "scrollbar-width": "none", // for Firefox
              "&:hover": {
                overflow: "hidden", // Hides scrollbar when hovering
              },
            }}
          >
            {categories.map((category, index) => (
              <Card
                key={index}
                sx={{
                  width: "180px",
                  height: "200px",
                  backgroundColor: categoryIndex === index ? "#1e88e5" : "#f0f4f8",
                  color: categoryIndex === index ? "black" : "#1c2a48",
                  cursor: "pointer",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  borderRadius: "15px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: "0 12px 24px rgba(0, 0, 0, 0.2)",
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
                      fontSize: "1.2rem",
                      fontWeight: "bold",
                      padding: "10px",
                    }}
                  >
                    {category}
                  </Typography>
                  <Box
                    sx={{
                      height: "100px",
                      background: `url('/path_to_image/${category.toLowerCase()}.jpg') no-repeat center/cover`,
                      borderRadius: "10px",
                      marginTop: "10px",
                    }}
                  ></Box>
                </CardContent>
              </Card>
            ))}
          </Box>


          <Typography variant="h5" sx={{ color: "#1c2a48", fontFamily: "Poppins, sans-serif", fontWeight: 500 }}>
            Selected Category: {categories[categoryIndex]}
          </Typography>
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
          <IconButton sx={{ color: "black" }} aria-label={playing ? "Pause" : "Play"} onClick={handlePlayPause}>
            <PlayArrow />
          </IconButton>
          <IconButton sx={{ color: "black" }} aria-label="next">
            <SkipNext />
          </IconButton>
        </Box>
        <Box sx={{ width: "150px" }}>
          <Typography>Volume</Typography>
          <Slider value={volume} onChange={(event, newValue) => setVolume(newValue)} sx={{ color: "black" }} aria-label="volume" />
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
