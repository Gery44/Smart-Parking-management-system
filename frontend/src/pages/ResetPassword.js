import React, { useState } from "react";
import { Box, Container, Typography, TextField, Button, Paper, Alert } from "@mui/material";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { LockOutlined as LockIcon } from "@mui/icons-material";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const ResetPassword = () => {
  const query = useQuery();
  const navigate = useNavigate();
  const token = query.get("token");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!token) {
    return (
      <Container maxWidth="xs">
        <Box sx={{ mt: 8 }}>
          <Paper elevation={3} sx={{ p: 4, width: "100%" }}>
            <Alert severity="error">Invalid or missing token.</Alert>
            <Box sx={{ textAlign: "center", mt: 2 }}>
              <Link to="/forgot-password">Go to Forgot Password</Link>
            </Box>
          </Paper>
        </Box>
      </Container>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setError("");
    if (!newPassword || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("http://localhost:8080/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword }),
      });
      if (res.ok) {
        setMsg("Password has been reset. You can now log in.");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        const text = await res.text();
        setError(text || "Something went wrong.");
      }
    } catch {
      setError("Network error.");
    }
    setSubmitting(false);
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
              Reset Password
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center">
              Enter a new password for your account.
            </Typography>
          </Box>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="newPassword"
              label="New Password"
              type="password"
              id="newPassword"
              autoComplete="new-password"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              disabled={submitting}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm New Password"
              type="password"
              id="confirmPassword"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              disabled={submitting}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 2 }}
              disabled={submitting}
            >
              {submitting ? "Resetting..." : "Reset Password"}
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

export default ResetPassword;