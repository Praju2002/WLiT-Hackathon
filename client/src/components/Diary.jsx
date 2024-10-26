import React, { useState, useEffect } from "react";
import "../Diary.css"; // Import the CSS file
import MoodTracker from "./MoodTracker"; // Import the MoodTracker component

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

    let audioSrc;
    switch (selectedEmoji) {
      case "😊":
        audioSrc = "../public/audio/white_noise.mp3";
        break;
      case "😢":
        audioSrc = "../public/audio/uplifting.mp3";
        break;
      case "😡":
        audioSrc = "../public/audio/anger.mp3";
        break;
      case "😱":
        audioSrc = "../public/audio/guidedmeditation.mp3";
        break;
      case "😍":
        audioSrc = "../public/audio/ambient.mp3";
        break;
      default:
        audioSrc = null;
    }

    if (audioSrc) {
      const newAudio = new Audio(audioSrc);
      newAudio.play();
      setAudio(newAudio);
    }
  }, [selectedEmoji]);

  return (
    <div className="diary-container">
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
    </div>
  );
}

export default Diary;
