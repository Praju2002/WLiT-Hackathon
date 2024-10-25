import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    // Basic validation
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    // If validation passes, navigate to the home page
    console.log("Validation passed");
    navigate("/music"); // Navigate to the home page
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Login</h1>
      <form onSubmit={handleLogin} style={styles.form}>
        {error && <p style={styles.error}>{error}</p>}
        <div style={styles.inputGroup}>
          <label htmlFor="email" style={styles.label}>Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="password" style={styles.label}>Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.button}>Login</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#e0f7fa', // Light teal background
    color: '#004d40', // Dark teal text
  },
  header: {
    fontSize: '2rem',
    marginBottom: '1rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '300px',
    padding: '2rem',
    borderRadius: '8px',
    backgroundColor: '#ffffff', // White background for form
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  error: {
    color: 'red',
    marginBottom: '1rem',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '1rem',
    width: '100%',
  },
  label: {
    marginBottom: '0.5rem',
    fontSize: '1rem',
  },
  input: {
    padding: '0.5rem',
    fontSize: '1rem',
    borderRadius: '4px',
    border: '1px solid #004d40', // Dark teal border
  },
  button: {
    padding: '0.5rem 1rem',
    fontSize: '1rem',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#004d40', // Dark teal background
    color: '#ffffff', // White text
    cursor: 'pointer',
  },
};

export default Login;