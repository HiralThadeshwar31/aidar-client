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
import { useState } from "react";
import { Link } from "react-router-dom";
import httpClient from "../httpClient";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const handleRegister = async () => {
  //   console.log("Logging in with:", email, password);

  //   try {
  //     const response = await httpClient.post("//localhost:5000/register", {
  //       email,
  //       password,
  //     });
  //     window.location.href = "/";
  //   } catch (error: any) {
  //     if (error.response.status === 401) {
  //       alert("Invalid Credentials");
  //     }
  //   }
  // };

  const handleRegister = async () => {
    console.log("Registering with:", email, password);

    try {
      const response = await httpClient.post("//localhost:5000/register", {
        email,
        password,
        name,
      });

      // Redirect to the home page on successful registration
      window.location.href = "/patients";
    } catch (error: any) {
      // Check if error.response is defined
      if (error.response) {
        // Handle specific HTTP status codes
        if (error.response.status === 401) {
          alert("Invalid Credentials");
        } else if (error.response.status === 400) {
          alert("Bad Request: Please check your input.");
        } else {
          // Handle other status codes
          alert(`Error: ${error.response.status}`);
        }
      } else {
        // Handle network or other errors
        console.error("Error during registration:", error);
        alert("An unexpected error occurred. Please try again later.");
      }
    }
  };

  return (
    <>
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
          <Typography variant="h5">Register</Typography>
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                  value={name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setName(e.target.value)
                  }
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEmail(e.target.value)
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPassword(e.target.value)
                  }
                />
              </Grid>
            </Grid>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleRegister}
            >
              Register
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login">Already have an account? Login</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default RegisterPage;
