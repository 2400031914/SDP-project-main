// src/pages/Login.jsx
import React, { useState } from "react";
import { Box, Paper, Typography, TextField, Button, Link, InputAdornment, CircularProgress, Alert } from "@mui/material";
import { Email, Lock, Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid";
    if (!password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setErrors({});

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // ✅ Password no longer checked — only email decides the role

    // --- Admin login ---
    if (email === "admin@school.com") {
      navigate("/admin-dashboard", { state: { role: "admin" } });
      return;
    }

    // --- Teacher login ---
    if (email === "john@school.com") {
      navigate("/teacher-dashboard", { state: { role: "teacher" } });
      return;
    }

    // --- Student login ---
    if (email === "emily@school.com") {
      navigate("/student-dashboard", { state: { role: "student" } });
      return;
    }

    setErrors({ general: "Invalid email. Try:\nadmin@school.com\njohn@school.com\nemily@school.com" });
    setLoading(false);
  };

  return (
    <Box className="login-container">
      <Paper className="login-paper" sx={{ width: 420, p: 4 }}>
        <Typography variant="h4" className="login-title" sx={{ mb: 2, fontSize: '2rem', animation: 'fadeIn 0.8s ease-out' }}>
          Student Performance Analytics
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 3, textAlign: 'center', animation: 'fadeIn 1s ease-out' }}>
          Sign in to access your dashboard
        </Typography>

        {errors.general && (
          <Alert severity="error" sx={{ mb: 2, animation: 'fadeIn 0.5s ease-out' }}>
            {errors.general}
          </Alert>
        )}

        <TextField
          label="Email"
          fullWidth
          sx={{ mb: 2, animation: 'fadeIn 1.2s ease-out' }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!errors.email}
          helperText={errors.email}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Email color="action" />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="Password"
          type={showPassword ? "text" : "password"}
          fullWidth
          sx={{ mb: 3, animation: 'fadeIn 1.4s ease-out' }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!errors.password}
          helperText={errors.password}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock color="action" />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <Button
                  onClick={() => setShowPassword(!showPassword)}
                  sx={{ minWidth: 'auto', p: 0.5 }}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </Button>
              </InputAdornment>
            ),
          }}
        />

        <Button
          variant="contained"
          fullWidth
          onClick={handleLogin}
          disabled={loading}
          sx={{ mb: 2, py: 1.5, animation: 'fadeIn 1.6s ease-out' }}
          startIcon={loading && <CircularProgress size={20} color="inherit" />}
        >
          {loading ? "Signing In..." : "Sign In"}
        </Button>

        <Box textAlign="center" sx={{ mt: 2, animation: 'fadeIn 1.8s ease-out' }}>
          <Typography variant="body2">
            Don't have an account?{" "}
            <Link component="button" onClick={() => navigate("/signup")}>
              Sign up
            </Link>
          </Typography>
        </Box>

        <Box className="demo-info" sx={{ animation: 'fadeIn 2s ease-out' }}>
          <div><strong>Demo Emails (any password works):</strong></div>
          <div>Admin: admin@school.com</div>
          <div>Teacher: john@school.com</div>
          <div>Student: emily@school.com</div>
        </Box>
      </Paper>
    </Box>
  );
}
