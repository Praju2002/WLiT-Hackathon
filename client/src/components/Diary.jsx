import React, { useState, useEffect } from "react";
import "../Diary.css";
import MoodTracker from "./MoodTracker";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "react-router-dom";
import { Home, Search, PlaylistPlay, NoteAlt } from "@mui/icons-material";

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
        { text: "Home", icon: <Home />, link: "/music" },
        { text: "Search", icon: <Search />, link: "/search" },
        { text: "Playlists", icon: <PlaylistPlay />, link: "/favorites" },
        { text: "Journal", icon: <NoteAlt />, link: "/diary" },
      ].map((item, index) => (
        <ListItem
          button
          key={index}
          component={Link}
          to={item.link}
          sx={{
            "&:hover": {
              backgroundColor: "white",
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

function Diary() {
  const [diaryEntry, setDiaryEntry] = useState("");
  const [diaryEntries, setDiaryEntries] = useState([]);
  const [selectedEmoji, setSelectedEmoji] = useState("");
  const [audio, setAudio] = useState(null);

  const handleDiaryChange = (event) => {
    setDiaryEntry(event.target.value);
  };

  const handleDiarySubmit = (event) => {
    event.preventDefault();
    const newEntry = {
      text: diaryEntry,
      timestamp: new Date().toLocaleString(),
      emoji: selectedEmoji,
    };
    setDiaryEntries([...diaryEntries, newEntry]);
    setDiaryEntry("");
    setSelectedEmoji("");
  };

  const handleEmojiClick = (emoji) => {
    setSelectedEmoji(emoji);
  };

  useEffect(() => {
    if (audio) {
      audio.pause();
    }

    const audioFiles = {
      "😊": "/audio/white_noise.mp3",
      "😢": "/audio/uplifting.mp3",
      "😡": "/audio/anger.mp3",
      "😱": "/audio/guidedmeditation.mp3",
      "😍": "/audio/ambient.mp3",
    };

    const audioSrc = audioFiles[selectedEmoji];
    if (audioSrc) {
      const newAudio = new Audio(audioSrc);
      newAudio.play();
      setAudio(newAudio);
    }
  }, [selectedEmoji]);

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

        <Box sx={{ flex: 1 }}>
          <h2>Diary</h2>
          <form onSubmit={handleDiarySubmit} className="diary-form">
            <div className="emoji-container">
              {["😊", "😢", "😡", "😱", "😍"].map((emoji) => (
                <button
                  type="button"
                  key={emoji}
                  className={`emoji-button ${
                    selectedEmoji === emoji ? "selected" : ""
                  }`}
                  onClick={() => handleEmojiClick(emoji)}
                >
                  {emoji}
                </button>
              ))}
            </div>
            <textarea
              value={diaryEntry}
              onChange={handleDiaryChange}
              placeholder="Write your diary entry here..."
              className="diary-textarea"
            />
            <button type="submit" className="diary-submit-button">
              Add Note
            </button>
          </form>

          <h3>Previous Entries</h3>
          <ul className="diary-entries">
            {diaryEntries.map((entry, index) => (
              <li key={index} className="diary-entry">
                <div className="entry-header">
                  <span className="entry-emoji">{entry.emoji}</span>
                  <span className="entry-timestamp">{entry.timestamp}</span>
                </div>
                <div className="entry-text">{entry.text}</div>
              </li>
            ))}
          </ul>

          <MoodTracker diaryEntries={diaryEntries} />
        </Box>
      </Box>
    </Box>
  );
}

export default Diary;
