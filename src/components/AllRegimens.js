import React from "react";
import { List, ListItem, ListItemText, Typography, Button, Box, Paper } from "@mui/material";
import { Link } from "react-router-dom";

const AllRegimens = ({ regimens }) => {
  return (
    <Box mt={4}>
      <Paper elevation={4} sx={{ padding: 4, backgroundColor: "#f0f4f8", borderRadius: "10px" }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", color: "#1976d2" }}>
          All Workout Regimens
        </Typography>
        
        <List>
          {regimens.length === 0 ? (
            <Typography>No workout regimens added yet.</Typography>
          ) : (
            regimens.map((regimen, index) => (
              <ListItem key={index}>
                <ListItemText primary={`${regimen.regimen}`} />
              </ListItem>
            ))
          )}
        </List>

        {/* Return button to go back to the main page */}
        <Box mt={4}>
          <Button variant="contained" color="primary" component={Link} to="/" sx={{ backgroundColor: "#1976d2" }}>
            Return to Main Page
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default AllRegimens;
