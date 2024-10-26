import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import RootLayout from "./layout/rootLayout";
import theme from "./theme/theme";
import MusicApp from "./components/MusicApp";
import SearchComponent from "./components/Search";
import FavoritesPage from "./components/favorites";
import Login from "./components/Login";
import PersonalizedPlaylists from "./components/PersonalizedPlaylists";
import Diary from "./components/Diary";
import MoodTracker from "./components/MoodTracker";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<Login />} />{" "}
            {/* Set Login as the default route */}
            <Route path="search" element={<SearchComponent />} />
            <Route path="favorites" element={<FavoritesPage />} />
            <Route path="login" element={<Login />} />
            <Route path="music" element={<MusicApp />} />{" "}
            <Route path="diary" element={<Diary />} />
            <Route path="mood" element={<MoodTracker />} />
            {/* Add a route for MusicApp */}
            <Route path="*" element={<h1>Page not found</h1>} />
            <Route path="playlists" element={<PersonalizedPlaylists />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
