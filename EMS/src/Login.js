import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async(e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:5001/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    
    if (response.ok) {
      alert('Login successful');
      navigate('/app');
    } else {
      alert(data.message || 'Login failed');
    }
  };

  return (
    <>

        <Typography sx={{ textAlign: 'center', marginTop:'100px'}} variant="h4" mb={2} color="primary">
          Employee Management System
        </Typography>
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="50vh"
    >
      <Box width={300} p={3} borderRadius={3} boxShadow={3} bgcolor="white">
        <Typography variant="h4" mb={2} color="primary">
          Login
        </Typography>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleLogin}
          sx={{ mt: 2 }}
        >
          Login
        </Button>
        <Typography
          variant="body2"
          mt={2}
          color="textSecondary"
          textAlign="center"
        >
          Don't have an account?{" "}
          <Button
            color="primary"
            onClick={() => navigate("/signup")}
          >
            Signup
          </Button>
        </Typography>
      </Box>
    </Box>
    </>
  );
};

export default Login;
