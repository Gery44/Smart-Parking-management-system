import React, { useState } from "react";
import { Box, Container, Typography, TextField, Button, Paper, Alert } from "@mui/material";
import { Link } from "react-router-dom";
import { LockOutlined as LockIcon } from "@mui/icons-material";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setError("");
    setSending(true);
    try {
      const res = await fetch("http://localhost:8080/api/auth/reset-password-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setMsg("If this email exists, a reset link will be sent.");
      } else {
        setError("Something went wrong. Try again.");
      }
    } catch {
      setError("Network error. Try again.");
    }
    setSending(false);
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          mt: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Paper elevation={3} sx={{ p: 4, width: "100%" }}>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <LockIcon sx={{ fontSize: 40, color: "primary.main", mb: 1 }} />
            <Typography component="h1" variant="h5" gutterBottom>
              Forgot Password
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center">
              Enter your email to receive a password reset link.
            </Typography>
          </Box>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={e => setEmail(e.target.value)}
              disabled={sending}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 2 }}
              disabled={sending}
            >
              {sending ? "Sending..." : "Send Reset Link"}
            </Button>
            {msg && <Alert severity="success">{msg}</Alert>}
            {error && <Alert severity="error" sx={{ mt: 1 }}>{error}</Alert>}
            <Box sx={{ textAlign: "center", mt: 2 }}>
              <Typography variant="body2">
                Remember your password?{" "}
                <Link to="/login" style={{ textDecoration: "none" }}>
                  Back to Login
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default ForgotPassword;