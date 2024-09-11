import React from "react";
import { List, ListItem, ListItemText, Typography } from "@mui/material";

const RegimenList = ({ regimens }) => {
  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Workout Regimens:
      </Typography>
      <List>
        {regimens.length === 0 ? (
          <Typography>No workout regimens added yet.</Typography>
        ) : (
          regimens.map((regimen, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={regimen.regimen}
              />
            </ListItem>
          ))
        )}
      </List>
    </div>
  );
};

export default RegimenList;
