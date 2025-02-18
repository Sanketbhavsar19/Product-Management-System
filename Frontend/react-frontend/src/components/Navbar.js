import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Product Management System
        </Typography>

        <Box>
          <Button color="inherit" component={Link} to="/CategoryList">
            Category List
          </Button>
          <Button color="inherit" component={Link} to="/ProductList">
            Product List
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
