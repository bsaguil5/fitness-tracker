import React from "react";
import { List, ListItem, ListItemText, Typography, Button, Box, Paper } from "@mui/material";
import { Link } from "react-router-dom";

const AllPRs = ({ prs }) => {
  return (
    <Box mt={4}>
      <Paper elevation={4} sx={{ padding: 4, backgroundColor: "#f0f4f8", borderRadius: "10px" }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", color: "#1976d2" }}>
          All Personal Records (PRs)
        </Typography>
        
        <List>
          {prs.length === 0 ? (
            <Typography>No PRs added yet.</Typography>
          ) : (
            prs.map((pr, index) => (
              <ListItem key={index}>
                <ListItemText primary={`${pr.exercise}: ${pr.weight} lbs`} />
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

export default AllPRs;
