import React from "react";
import { List, ListItem, ListItemText, Typography } from "@mui/material";

const PRList = ({ prs }) => {
  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Personal Records:
      </Typography>
      <List>
        {prs.length === 0 ? (
          <Typography>No PRs added yet.</Typography>
        ) : (
          prs.map((pr, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={`${pr.exercise}: ${pr.weight} lbs`}
              />
            </ListItem>
          ))
        )}
      </List>
    </div>
  );
};

export default PRList;
