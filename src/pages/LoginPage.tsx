import { LockOutlined } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import httpClient from "../httpClient";
import { User } from "../types";

// Define the component as a functional component with explicit types
const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await httpClient.get("//localhost:5000/@me");
        setUser(response.data);
      } catch (error: any) {
        console.log("Not authenticated");
      }
    })();
  });

  const handleLogin = async () => {
    console.log("Logging in with:", email, password);

    try {
      const response = await httpClient.post("http://localhost:5000/login", {
        email,
        password,
      });

      // Assuming the login is successful, redirect to the patients page
      window.location.href = "/patients"; // Only redirect if login is successful
    } catch (error: any) {
      // Check if error.response is defined
      if (error.response) {
        // Handle specific HTTP status codes
        if (error.response.status === 401) {
          alert("Invalid Credentials");
        } else {
          // Handle other status codes if necessary
          alert(`Error: ${error.response.status}`);
        }
      } else {
        // Handle network or other errors
        console.error("Error during login:", error);
        alert("An unexpected error occurred. Please try again later.");
      }
    }
  };

  return (
    <Container maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          mt: 20,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.light" }}>
          <LockOutlined />
        </Avatar>
        <Typography variant="h5">Login</Typography>
        <Box sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoFocus
            value={email}
            // Explicitly type the event parameter
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            value={password}
            // Explicitly type the event parameter
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          />

          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleLogin}
          >
            Login
          </Button>
          <Grid container justifyContent={"flex-end"}>
            <Grid item>
              <Link to="/register">Don't have an account? Register</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
