// SideNav.tsx
import { Box, Divider, List, ListItem, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";

const SideNav = () => {
  return (
    <Box
      sx={{
        width: 250,
        height: "100vh",
        bgcolor: "primary.light",
        position: "fixed",
        top: 0,
        left: 0,
      }}
    >
      <List>
        <ListItem button component={Link} to="/">
          <ListItemText primary="Patient List" />
        </ListItem>
        <ListItem button component={Link} to="/reports">
          <ListItemText primary="Reports" />
        </ListItem>
        <ListItem button component={Link} to="/surveys">
          <ListItemText primary="Custom Surveys" />
        </ListItem>
        <Divider />
        <ListItem button component={Link} to="/notifications">
          <ListItemText primary="Notifications" />
        </ListItem>
      </List>
    </Box>
  );
};

export default SideNav;
