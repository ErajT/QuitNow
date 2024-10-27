"use client"; // Add this line to enable client-side rendering

import React from "react";
import Link from 'next/link';
import { Button, Card, CardContent, CardHeader, Typography } from "@mui/material";
import { Cigarette, TrendingUp } from "lucide-react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: linear-gradient(to bottom, #eff6ff, #ffffff);
`;

const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: 10;
  background: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const Main = styled.main`
  flex-grow: 1;
`;

const Section = styled.section`
  padding: 80px 0;
  text-align: center;
  position: relative;
`;

const darkPurple = '#25113a'; // Define dark purple color

const StyledCardTitle = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  color: ${darkPurple}; // Use the dark purple color defined earlier

  svg {
    margin-right: 8px; // Adjust margin for icon
  }
`;

// Define the StyledCardTitle
const StyledCardFooter = styled.div`
  font-size: 1.5rem; // Adjust font size as needed
  color: #25113a; // Use your desired color
  text-align: center; // Center text within the component
`;

// Define the Footer styled component
const StyledFooter = styled.footer`
  display: flex;
  justify-content: center; // Center horizontally
  align-items: center; // Center vertically
  height: 120px; // Adjust height to be at least 2x the StyledCardTitle height
  background-color: #f1f1f1; // Change background color as needed
  padding: 20px; // Add padding for spacing
`;


const VideoContainer = styled.div`
  position: relative;
  width: 100vw; /* Full width */
  height: 100vh; /* Full height */
  overflow: hidden; /* Hide overflow */
`;

const Video = styled.video`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  object-fit: cover; /* Cover the entire area */
  transform: translate(-50%, -50%); /* Center the video */
  z-index: 0; /* Behind other content */
`;

const GradientOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)); /* Adjust colors as needed */
  z-index: 1; /* Overlay above the video */
`;



export default function Home() {
  return (
    <Container>
  <Main>
    <Section style={{ margin: '0', padding: '0' }}>
      <VideoContainer>
        <Video
          loop
          autoPlay
          muted
          src="main.mp4" // Path to your video file
          type="video/mp4" // Ensure the correct type for compatibility
        />
        <GradientOverlay />
        <Header style={{ width: '100vw',height: '10vh', position: 'relative', left: '0', right: '0', top: '0', zIndex: 10, margin: '0', padding: '0' }}>
    <div className="container mx-auto px-4 py-4" style={{justifyContent: 'flex-end', alignItems: 'center',  width: '100vw', margin: '0', padding: '0', display: 'flex' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: darkPurple, width: '20%' }}>QuitNow</h1>
      <nav style={{width: '100%'}} >
        <ul style={{ listStyleType: 'none', display: 'flex', gap: '1rem', margin: '0', padding: '0', width: '100%', justifyContent: 'flex-end', alignItems: 'center'}}>
          <li style={{ padding: '0.5rem 1rem' }}>
          <Link href="/login" passHref>
            <Button variant="contained" 
              sx={{
                backgroundColor: '#25113a',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#3B006B',
                },
              }}
              className="w-full">
              Log In
            </Button>
            </Link>
          </li>
          <li style={{padding: '0.5rem 1rem 0.5rem 1rem', paddingRight: '2rem'  }}>
          <Link href="/login" passHref>
            <Button variant="contained"
              sx={{
                backgroundColor: '#25113a',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#3B006B',
                },
              }}
              className="w-full">
              Sign Up
            </Button>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  </Header>
        <div style={{ position: 'relative', zIndex: 10, padding: '20px' }}>
          <Typography variant="h4" component="h2" style={{ marginBottom: '16px', color: '#ffffff', paddingTop: '20vh', fontSize: '50px' }}>
            Break Free from Smoking
          </Typography>
          <Typography variant="body1" color="textSecondary" style={{ marginBottom: '32px' , color: '#ffffff'}}>
            Your personalized journey to a smoke-free life starts here.
          </Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#25113a', // Dark purple background
              color: 'white', // White text
              '&:hover': {
                backgroundColor: '#3B006B', // Darker shade for hover effect
              },
            }}
            className="w-full"
          >
            Start Your Quit Journey
          </Button>
        </div>
      </VideoContainer>
    </Section>




        <Section id="features" style={{ backgroundColor: '#F9FAFB' }}>
          <div className="container mx-auto px-4">
            <Typography variant="h5" component="h2" style={{ marginBottom: '48px', color: darkPurple, fontSize: '50px' }}>Our Key Features</Typography>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px', paddingLeft:'60px' }}>
              <Card style={{maxWidth: '40vw'}}>
                <CardHeader>
                  <StyledCardTitle style={{ display: 'flex', alignItems: 'center', fontSize: '1.5rem', color: darkPurple }}>
                    <Cigarette style={{ marginRight: '8px' }} />
                    Personalized Daily Quit Plan
                  </StyledCardTitle>
                </CardHeader>
                <CardContent>
                <video
                  width={400} // Set width as needed
                  height={200} // Set height as needed
                  loop // Makes the video play in a loop
                  style={{ marginBottom: '16px', borderRadius: '8px' }} // Apply styles as needed
                  muted // Optional: Mute the video to allow autoplay on some browsers
                  // controls
                  autoPlay
                >
                  <source src="feature1.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                  <Typography color="textSecondary">
                    Receive tailored daily goals and activities designed to help you gradually reduce your smoking and overcome cravings.
                  </Typography>
                </CardContent>
              </Card>
              <Card style={{maxWidth: '40vw'}}>
                <CardHeader>
                  <StyledCardTitle style={{ display: 'flex', alignItems: 'center', fontSize: '1.5rem', color: darkPurple }}>
                    <TrendingUp style={{ marginRight: '8px' }} />
                    Progress Tracking with Rewards
                  </StyledCardTitle>
                </CardHeader>
                <CardContent>
                <video
                  width={400} // Set width as needed
                  height={200} // Set height as needed
                  loop // Makes the video play in a loop
                  style={{ marginBottom: '16px', borderRadius: '8px' }} // Apply styles as needed
                  muted // Optional: Mute the video to allow autoplay on some browsers
                  // controls
                  autoPlay
                >
                  <source src="feature2.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                  <Typography color="textSecondary">
                    Monitor your progress, celebrate milestones, and earn rewards as you advance on your quit smoking journey.
                  </Typography>
                </CardContent>
              </Card>
            </div>
          </div>
        </Section>

        <Section style={{ backgroundColor: '#25113a', color: 'white' }}>
          <div style={{ position: 'relative', zIndex: 10, padding: '32px' }}>
            <Typography variant="h4" component="h2" style={{ marginBottom: '16px', color: 'white' }}>Ready to Quit?</Typography>
            <Typography variant="body1" color="white" style={{ marginBottom: '32px' }}>
              Take the first step towards a healthier life today.
            </Typography>
            <Button variant="contained" 
    sx={{ 
      backgroundColor: '#25113a', // Dark purple background
      color: 'white', // White text
      '&:hover': {
        backgroundColor: '#3B006B', // Darker shade for hover effect
      },
    }} 
    className="w-full">Get Started</Button>
          </div>
        </Section>
        <StyledFooter>
        <StyledCardFooter>
          <p>&copy; 2024 QuitNow. All rights reserved.</p>
        </StyledCardFooter>
      </StyledFooter>
      </Main>
    </Container>
  );
}
