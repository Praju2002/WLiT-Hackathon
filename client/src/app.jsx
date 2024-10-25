import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import RootLayout from "./layout/rootLayout";
import theme from "./theme/theme";
import MusicApp from "./components/MusicApp";
import SearchComponent from "./components/Search";

import Login from "./components/Login";


import FavoritesPage from "./components/favorites";

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
            <Route path="login" element={<Login />} />
            <Route path="music" element={<MusicApp />} />{" "}
            {/* Add a route for MusicApp */}

            {/* You can define more routes here */}
            <Route path="favorites" element={<FavoritesPage />} />
    

            <Route path="*" element={<h1>Page not found</h1>} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
