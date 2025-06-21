import React from "react";
import Footer from "../components/Footer";
import { Box, Grid, Typography } from "@mui/material";

export default function AboutUs() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "80vh" }}>
      {/* Main Content */}
      <Box sx={{ flexGrow: 1, py: 4, px: { xs: 2, md: 4 }, maxWidth: "1200px", margin: "0 auto" }}>
        <Typography variant="h3" align="center" gutterBottom>
          About <span style={{ color: "#ffbb00" }}>Us</span>
        </Typography>

        <Grid container spacing={6} alignItems="center">
          {/* Left Column */}
          <Grid item xs={12} md={6}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h5" gutterBottom>
                Welcome to ParkMate!
              </Typography>
              <Typography variant="body1">
                At ParkMate, we are revolutionizing the way you park. Our mission is to simplify parking for everyone—whether you're a daily commuter, a weekend adventurer, or a business looking to optimize your parking space.
              </Typography>
            </Box>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h5" gutterBottom>
                Who We Are
              </Typography>
              <Typography variant="body1">
                We are a team of passionate innovators committed to making parking stress-free and efficient. Our smart parking management system leverages modern technology to provide a seamless experience for users and administrators alike.
              </Typography>
            </Box>
            <Box>
              <Typography variant="h5" gutterBottom>
                Our Vision
              </Typography>
              <Typography variant="body1">
                To create a world where finding a parking spot is effortless, saving time, reducing congestion, and promoting smarter urban mobility.
              </Typography>
            </Box>
          </Grid>
          {/* Right Column - Image */}
          <Grid item xs={12} md={6} sx={{ display: "flex", justifyContent: "center" }}>
            <img
              src="/img/about.jpeg"
              alt="About ParkMate"
              style={{ width: "100%", maxWidth: 400, borderRadius: 24, objectFit: "cover" }}
            />
          </Grid>
        </Grid>
      </Box>
      {/* Footer always at the bottom */}
      <Footer />
    </Box>
  );
}