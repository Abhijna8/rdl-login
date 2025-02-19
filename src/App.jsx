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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ButtonAppBar({ setUserType, setPage }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = (type) => {
    setUserType(type);
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
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

function CartPage() {
  return (
    <Container sx={{ textAlign: "center", mt: 5 }}>
      <Typography variant="h4">Shopping Cart</Typography>
      <Typography variant="body1">This page will represent a shopping cart similar to Amazon.</Typography>
    </Container>
  );
}

function App() {
  const [userType, setUserType] = useState("Employee");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loginHistory, setLoginHistory] = useState([]);
  const [page, setPage] = useState("home");

  useEffect(() => {
    fetch("https://reqres.in/api/users?page=2")
      .then((res) => res.json())
      .then((data) => setLoginHistory(data.data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const handleLogin = async () => {
    if (!firstName || !lastName) {
      toast.error("Enter both First and Last Name!");
      return;
    }

    const newUser = { first_name: firstName, last_name: lastName, type: userType };

    try {
      const response = await fetch("https://reqres.in/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      const data = await response.json();
      setLoginHistory([...loginHistory, { ...data, id: loginHistory.length + 1, type: userType }]);
      setFirstName("");
      setLastName("");
      toast.success("User added successfully!");
    } catch (error) {
      console.error("Error creating user:", error);
      toast.error("Failed to add user!");
    }
  };

  return (
    <Box>
      <ButtonAppBar setUserType={setUserType} setPage={setPage} />
      {page === "cart" ? (
        <CartPage />
      ) : (
        <Container sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", backgroundColor: "#f6f4f4", p: 3 }}>
          <ToastContainer position="top-right" autoClose={3000} />
          <Card sx={{ p: 3, textAlign: "center", width: "50%", minHeight: "400px" }}>
            <Typography variant="h5" gutterBottom>{userType} Login</Typography>
            <TextField fullWidth margin="normal" label="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            <TextField fullWidth margin="normal" label="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={handleLogin}>Login</Button>
            <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>Login History</Typography>
            <Box sx={{ maxHeight: 230, overflowY: "auto", p: 1 }}>
              {loginHistory.map((user) => (
                <Grid container key={user.id} alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
                  <Typography>{user.first_name} {user.last_name} - {user.type} - ID: {user.id}</Typography>
                </Grid>
              ))}
            </Box>
          </Card>
        </Container>
      )}
    </Box>
  );
}

export default App;