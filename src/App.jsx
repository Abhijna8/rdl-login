import { useState, useEffect } from "react";
import * as React from 'react';
import {
  AppBar, Box, Toolbar, Typography, Button, IconButton, Menu as MuiMenu, MenuItem,
  Grid, TextField, Card, Tooltip, Container, Dialog, DialogActions, DialogContent, DialogTitle
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ButtonAppBar({ setUserType, setPage }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = (type) => {
    setUserType(type);
    setPage("login");
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={handleMenuClick}>
            <MenuIcon />
          </IconButton>
          <MuiMenu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
            <MenuItem onClick={() => handleMenuClose("Employee")}>Employee</MenuItem>
            <MenuItem onClick={() => handleMenuClose("Customer")}>Customer</MenuItem>
          </MuiMenu>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Hey
          </Typography>
          <IconButton color="inherit" onClick={() => setPage("cart")}>
            <ShoppingCartIcon />
          </IconButton>
          <Button color="inherit" onClick={() => setPage("login")}>Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

function CartPage({ setPage }) {
  const accessories = [
    { id: 1, name: "Smartwatch", price: "₹16,500", icon: "⌚" },
    { id: 2, name: "Wireless Earbuds", price: "₹8,200", icon: "🎧" },
    { id: 3, name: "Gaming Mouse", price: "₹4,000", icon: "🖱️" },
    { id: 4, name: "Mechanical Keyboard", price: "₹10,500", icon: "⌨️" },
    { id: 5, name: "VR Headset", price: "₹25,000", icon: "🕶️" },
    { id: 6, name: "Smartphone", price: "₹55,000", icon: "📱" },
    { id: 7, name: "Tablet", price: "₹35,000", icon: "📟" },
    { id: 8, name: "Portable Speaker", price: "₹7,500", icon: "🔊" }
  ];

  return (
    <Container sx={{ textAlign: "center", mt: 5 }}>
      <IconButton onClick={() => setPage("home")} sx={{ position: "absolute", left: 20, top: 20 }}>
        <ArrowBackIcon />
      </IconButton>
      <Typography variant="h4">Shopping Cart</Typography>
      <Grid container spacing={2} justifyContent="center" sx={{ mt: 3 }}>
        {accessories.map(item => (
          <Grid item key={item.id} sx={{ textAlign: "center" }}>
            <Card sx={{ p: 3, width: 250, height: 150, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <Typography variant="h4">{item.icon}</Typography>
              <Typography variant="h6">{item.name}</Typography>
              <Typography variant="body1">{item.price}</Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

function App() {
  const [userType, setUserType] = useState("Employee");
  const [page, setPage] = useState("home");

  return (
    <Box>
      <ButtonAppBar setUserType={setUserType} setPage={setPage} />
      {page === "cart" ? (
        <CartPage setPage={setPage} />
      ) : page === "login" ? (
        <Container sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", backgroundColor: "#f6f4f4", p: 3 }}>
          <ToastContainer position="top-right" autoClose={3000} />
          <Card sx={{ p: 3, textAlign: "center", width: "50%", minHeight: "400px" }}>
            <Typography variant="h5" gutterBottom>{userType} Login</Typography>
            <TextField fullWidth margin="normal" label="First Name" />
            <TextField fullWidth margin="normal" label="Last Name" />
            <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>Login</Button>
          </Card>
        </Container>
      ) : (
        <Typography variant="h4" align="center" sx={{ mt: 5 }}>Welcome to the Dashboard</Typography>
      )}
    </Box>
  );
}

export default App;
