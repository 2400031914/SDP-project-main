// src/pages/Signup.jsx
import React, { useState } from "react";
import { Box, Paper, Typography, TextField, Button, MenuItem, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");

  const handleSignup = () => {
    // Not persisting — demo only
    alert(`Account created for ${email} as ${role}. Now login.`);
    navigate("/");
  };

  return (
    <Box className="login-container">
      <Paper className="login-paper" sx={{ width: 420, p: 4 }}>
        <Typography variant="h4" className="login-title" sx={{ mb: 2, fontSize: '2rem' }}>
          Create account
        </Typography>

        <TextField label="Email" fullWidth sx={{ mb: 2 }} value={email} onChange={(e) => setEmail(e.target.value)} />
        <TextField label="Password" type="password" fullWidth sx={{ mb: 2 }} value={password} onChange={(e) => setPassword(e.target.value)} />

        <TextField select fullWidth label="Role" value={role} onChange={(e) => setRole(e.target.value)} sx={{ mb: 3 }}>
          <MenuItem value="admin">Admin</MenuItem>
          <MenuItem value="teacher">Teacher</MenuItem>
          <MenuItem value="student">Student</MenuItem>
        </TextField>

        <Button variant="contained" fullWidth onClick={handleSignup} sx={{ mb: 2, py: 1.5 }}>
          Create Account
        </Button>

        <Box textAlign="center" sx={{ mt: 2 }}>
          <Typography variant="body2">
            Already have an account?{" "}
            <Link component="button" onClick={() => navigate("/")}>
              Login
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}
