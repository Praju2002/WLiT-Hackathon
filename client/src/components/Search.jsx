import React, { useState } from "react";
import {
  Box,
  InputBase,
  Typography,
  Card,
  CardContent,
  Paper,
  IconButton,
  Fade,
  Grid,
} from "@mui/material";
import { Search as SearchIcon, Clear as ClearIcon } from "@mui/icons-material";

const categories = [
  "White Noise",
  "Rain",
  "Forest",
  "Ocean Waves",
  "Ambient",
  "Nature",
  "River",
  "Thunderstorm",
];

function SearchComponent() {
  const [searchTerm, setSearchTerm] = useState(""); // For tracking the search input

  // Filter categories based on the search term
  const filteredCategories = categories.filter((category) =>
    category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Clear the search term
  const clearSearch = () => {
    setSearchTerm("");
  };

  return (
    <Box
      sx={{
        p: 3,
        gap: 2,
        backgroundColor: "#f0f4f8",
        borderRadius: "20px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
        width: "100%",
        height: "100%",
        position: "relative", // Positioned within the page
      }}
    >
      <Paper
        component="form"
        sx={{
          p: '8px 16px',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: "#fff",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <IconButton sx={{ p: '10px', color: "#1e88e5" }}>
          <SearchIcon />
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1, fontFamily: "Poppins, sans-serif" }}
          placeholder="Search categories"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <IconButton onClick={clearSearch} sx={{ p: '10px', color: "#1e88e5" }}>
            <ClearIcon />
          </IconButton>
        )}
      </Paper>

      <Fade in={true}>
        <Box sx={{ mt: 4 }}>
          {filteredCategories.length > 0 ? (
            <Grid container spacing={2}>
              {filteredCategories.map((category, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                  <Card
                    sx={{
                      backgroundColor: "#f0f4f8",
                      color: "#1c2a48",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",
                      "&:hover": {
                        transform: "scale(1.05)",
                        boxShadow: "0 12px 24px rgba(0, 0, 0, 0.2)",
                      },
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    }}
                  >
                    <CardContent>
                      <Typography
                        variant="h6"
                        sx={{
                          textAlign: "center",
                          fontFamily: "Poppins, sans-serif",
                          fontSize: "1.2rem",
                          fontWeight: "bold",
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
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography
              sx={{
                textAlign: "center",
                fontFamily: "Poppins, sans-serif",
                color: "#616161",
                padding: 2,
              }}
            >
              No results found
            </Typography>
          )}
        </Box>
      </Fade>
    </Box>
  );
}

export default SearchComponent;
