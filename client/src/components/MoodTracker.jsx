import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const moodScores = {
  "😊": 100,
  "😍": 80,
  "😱": 20,
  "😢": -50,
  "😡": -100,
};

function MoodTracker({ diaryEntries }) {
  const data = {
    labels: diaryEntries.map(entry => entry.timestamp),
    datasets: [
      {
        label: "Mood Over Time",
        data: diaryEntries.map(entry => moodScores[entry.emoji]),
        fill: false,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };

  const moodCounts = diaryEntries.reduce((acc, entry) => {
    acc[entry.emoji] = (acc[entry.emoji] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="mood-tracker-container">
      <h3>Mood Tracker</h3>
      <Line data={data} />
      <div className="mood-counts">
        {Object.entries(moodCounts).map(([emoji, count]) => (
          <div key={emoji}>
            {emoji}: {count} times
          </div>
        ))}
      </div>
    </div>
  );
}

export default MoodTracker;