import React, { useState, useEffect } from "react";
import { Howl } from 'howler'; // Import Howler for sounds
import { CSSTransition } from 'react-transition-group'; // Animation transitions
import ReactPlayer from 'react-player'; // ReactPlayer for YouTube videos
import './App.css'; // For animation styles
import { Container, Typography, Box, TextField, Button, Paper, Grid } from "@mui/material";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'; // Icon
import PRList from "./components/PRList";
import RegimenList from "./components/RegimenList";
import AllPRs from "./components/AllPRs";
import AllRegimens from "./components/AllRegimens"; // Import the AllRegimens component

function App() {
  const [exercise, setExercise] = useState("");
  const [weight, setWeight] = useState("");
  const [prs, setPRs] = useState([]);
  const [regimen, setRegimen] = useState(""); // State for workout regimen
  const [regimens, setRegimens] = useState([]); // State to store multiple regimens
  const [animationType, setAnimationType] = useState(null); // To track the animation type
  const [showAnimation, setShowAnimation] = useState(false); // To control animation display
  const [previousPR, setPreviousPR] = useState(null); // Store previous PR if a PR is broken

  // Load saved data from localStorage
  useEffect(() => {
    const savedPRs = JSON.parse(localStorage.getItem("prs")) || [];
    const savedRegimens = JSON.parse(localStorage.getItem("regimens")) || []; // Load regimens
    setPRs(savedPRs);
    setRegimens(savedRegimens); // Set regimens
  }, []);

  // Save data to localStorage
  useEffect(() => {
    localStorage.setItem("prs", JSON.stringify(prs));
    localStorage.setItem("regimens", JSON.stringify(regimens)); // Save regimens
  }, [prs, regimens]);

  // Handle submitting a new PR
  const handlePRSubmit = () => {
    if (exercise && weight) {
      const existingIndex = prs.findIndex((pr) => pr.exercise.toLowerCase() === exercise.toLowerCase());
      
      if (existingIndex >= 0) {
        // If PR exists, check if the new PR breaks it
        const existingPR = prs[existingIndex].weight;
        if (parseFloat(weight) > existingPR) {
          // PR is broken
          setPreviousPR(existingPR);
          setAnimationType('break');
          triggerAnimation('break'); // Play break animation
          const updatedPRs = [...prs];
          updatedPRs[existingIndex] = { exercise, weight: parseFloat(weight) };
          setPRs(updatedPRs);
        }
      } else {
        // New PR added
        setAnimationType('new');
        triggerAnimation('new'); // Play new PR animation
        setPRs([...prs, { exercise, weight: parseFloat(weight) }]);
      }

      // Clear input fields
      setExercise("");
      setWeight("");
    }
  };

  // Handle submitting a workout regimen
  const handleRegimenSubmit = () => {
    if (regimen) {
      setRegimens([...regimens, regimen]); // Add the new regimen to the list
      setRegimen(""); // Clear the input field
    }
  };

  // Function to trigger animation
  const triggerAnimation = (type) => {
    setShowAnimation(true);

    // Play sound based on type
    playSound(type);

    // Hide animation after 4 seconds (4000 ms)
    setTimeout(() => {
      setShowAnimation(false);
    }, 4000);
  };

  // Function to play sound
  const playSound = (type) => {
    const soundFile = type === 'break' ? '/sounds/break-sound.mp3' : '/sounds/new-sound.mp3';
    const sound = new Howl({
      src: [soundFile]
    });
    sound.play();
  };

  return (
    <div style={{
      backgroundImage: `url('/images/cullen.png')`,  // Use absolute path to public folder
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      minHeight: '100vh',
      margin: '0',
      padding: '0',
    }}>
      <Router>
        <Container>
          <Typography variant="h3" align="center" marginTop={4} sx={{ fontWeight: "bold", color: "#1976d2" }}>
            Fitness Tracker
          </Typography>

          <Routes>
            {/* Main Page Route */}
            <Route
              path="/"
              element={
                <Grid container spacing={4} sx={{ marginTop: 5 }}>
                  {/* Personal Records Section */}
                  <Grid item xs={12} md={6} sx={{ marginTop: 3 }}>
                    <Paper
                      elevation={4}
                      sx={{
                        padding: 4,
                        borderRadius: "10px",
                        backgroundColor: "rgba(255, 255, 255, 0.8)", // Semi-transparent white background
                        color: "#000", // Dark text for readability
                      }}
                    >
                      <Typography variant="h5" gutterBottom>
                        Track Your Personal Records (PRs)
                      </Typography>
                      <Box>
                        <TextField
                          label="Exercise"
                          variant="outlined"
                          fullWidth
                          value={exercise}
                          onChange={(e) => setExercise(e.target.value)}
                          sx={{ marginBottom: 2 }}
                        />
                        <TextField
                          label="Weight (lbs)"
                          variant="outlined"
                          fullWidth
                          type="number"
                          value={weight}
                          onChange={(e) => setWeight(e.target.value)}
                          sx={{ marginBottom: 2 }}
                        />
                        <Button
                          variant="contained"
                          color="primary"
                          startIcon={<AddCircleOutlineIcon />}
                          onClick={handlePRSubmit}
                          sx={{ marginBottom: 2, backgroundColor: "#1976d2" }}
                        >
                          Add PR
                        </Button>
                      </Box>

                      <PRList prs={prs.slice(0, 3)} />

                      {prs.length > 3 && (
                        <Box mt={2}>
                          <Button
                            variant="outlined"
                            color="secondary"
                            component={Link}
                            to="/all-prs"
                            sx={{ fontWeight: "bold", color: "#1976d2" }}
                          >
                            Show All PRs
                          </Button>
                        </Box>
                      )}
                    </Paper>
                  </Grid>

                  {/* Workout Regimens Section */}
                  <Grid item xs={12} md={6} sx={{ marginTop: 3 }}>
                    <Paper
                      elevation={4}
                      sx={{
                        padding: 4,
                        borderRadius: "10px",
                        backgroundColor: "rgba(255, 255, 255, 0.8)", // Semi-transparent white background
                        color: "#000", // Dark text for readability
                      }}
                    >
                      <Typography variant="h5" gutterBottom>
                        Track Your Workout Regimens
                      </Typography>
                      <Box>
                        <TextField
                          label="Workout Regimen"
                          variant="outlined"
                          fullWidth
                          value={regimen} // Regimen input
                          onChange={(e) => setRegimen(e.target.value)}
                          sx={{ marginBottom: 2 }}
                        />
                        <Button
                          variant="contained"
                          color="primary"
                          startIcon={<AddCircleOutlineIcon />}
                          onClick={handleRegimenSubmit} // Submit regimen
                          sx={{ backgroundColor: "#1976d2" }}
                        >
                          Add Regimen
                        </Button>
                      </Box>

                      <RegimenList regimens={regimens.slice(0, 3)} /> {/* Display first 3 regimens */}

                      {regimens.length > 3 && (
                        <Box mt={2}>
                          <Button
                            variant="outlined"
                            color="secondary"
                            component={Link}
                            to="/all-regimens"
                            sx={{ fontWeight: "bold", color: "#1976d2" }}
                          >
                            Show All Regimens
                          </Button>
                        </Box>
                      )}
                    </Paper>
                  </Grid>
                </Grid>
              }
            />

            {/* All PRs Route */}
            <Route path="/all-prs" element={<AllPRs prs={prs} />} />

            {/* All Regimens Route */}
            <Route path="/all-regimens" element={<AllRegimens regimens={regimens} />} />
          </Routes>
        </Container>
      </Router>

      {/* Display animation when triggered */}
     {/*multiple fixes so that the youtube logo doesn't show !!!!! */}

<CSSTransition
  in={showAnimation}
  timeout={500}
  classNames={animationType}
  unmountOnExit
>
  <div className="animation-box" style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", zIndex: 1000 }}>
    {animationType === 'break' ? (
      <>
        {/* YouTube Video for PR Break */}
        <ReactPlayer
          url="https://www.youtube.com/shorts/u1j7O79iR5E"
          playing={true}
          muted
          width="100vw"
          height="100vh"
          controls={false}  // Disable controls
          config={{ youtube: { playerVars: { showinfo: 0, rel: 0, modestbranding: 1, controls: 0 }}}}
          style={{ position: 'absolute', top: 0, left: 0 }}
        />
        {/* Overlay to hide remaining YouTube elements */}
        <div className="video-overlay"></div>

        <div className="smash-text" style={{ zIndex: 1001 }}>
          {`Your previous PR of ${previousPR} lbs shattered! New PR: ${weight} lbs`}
        </div>
      </>
    ) : (
      <>
        {/* YouTube Short for New PR */}
        <ReactPlayer
          url="https://www.youtube.com/shorts/z7i6Ff41NIM"
          playing={true}
          muted
          width="100vw"
          height="100vh"
          controls={false}  // Disable controls
          config={{ youtube: { playerVars: { showinfo: 0, rel: 0, modestbranding: 1, controls: 0 }}}}
          style={{ position: 'absolute', top: 0, left: 0 }}
        />
        {/* Overlay to hide remaining YouTube elements */}
        <div className="video-overlay"></div>

        <div className="shake-text" style={{ zIndex: 1001 }}>
          {`New PR added: ${weight} lbs`}
        </div>
      </>
    )}
  </div>
</CSSTransition>


    </div>
  );
}

export default App;
