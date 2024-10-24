import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import RootLayout from "./layout/rootLayout";
import theme from "./theme/theme";
import MusicApp from "./components/MusicApp";
import SearchComponent from "./components/Search";
function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<RootLayout />}>
          <Route index element={<MusicApp />} />
            {/* You can define more routes here */}
            <Route path="search" element={<SearchComponent />} /> 
            <Route path="*" element={<h1>Page not found</h1>} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
