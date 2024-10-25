// components/Diary.jsx
import React, { useState } from "react";
import "../Diary.css"; // Import the CSS file

function Diary() {
  const [diaryEntry, setDiaryEntry] = useState("");
  const [diaryEntries, setDiaryEntries] = useState([]);

  const handleDiaryChange = (event) => {
    setDiaryEntry(event.target.value);
  };

  const handleDiarySubmit = (event) => {
    event.preventDefault();
    setDiaryEntries([...diaryEntries, diaryEntry]);
    setDiaryEntry("");
  };

  return (
    <div className="diary-container">
      <h2>Diary</h2>
      <form onSubmit={handleDiarySubmit} className="diary-form">
        <textarea
          value={diaryEntry}
          onChange={handleDiaryChange}
          placeholder="Write your diary entry here..."
          className="diary-textarea"
        />
        <button type="submit" className="diary-submit-button">
          Submit
        </button>
      </form>

      <h3>Previous Entries</h3>
      <ul className="diary-entries">
        {diaryEntries.map((entry, index) => (
          <li key={index} className="diary-entry">
            {entry}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Diary;
