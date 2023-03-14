import { LockOutlined, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { register } from "../api/auth";

function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [address, setAddress] = useState("");
  const [contacts, setContacts] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const handleOnClickSetShowPassword = () => {
    setShowPassword((show) => !show);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const account = {
        firstName,
        lastName,
        email,
        password,
        company,
        position,
        address,
        contacts,
      };
      const response = await register(account);
      console.log(response);
      setLoading(true);
      setError("");
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          REGISTER
        </Typography>
        {error && (
          <Alert severity="warning" sx={{ background: "none" }}>
            {error}
          </Alert>
        )}
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate={false}
          sx={{ mt: 2 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                color="secondary"
                required
                fullWidth
                type="text"
                label="First Name"
                onChange={(e) => setFirstName(e.target.value)}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                color="secondary"
                required
                fullWidth
                type="text"
                label="Last Name"
                onChange={(e) => setLastName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                color="secondary"
                required
                fullWidth
                type="email"
                label="Email Address"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                color="secondary"
                required
                fullWidth
                label="Password"
                type={showPassword ? "text" : "password"}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleOnClickSetShowPassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextField
                color="secondary"
                required
                fullWidth
                type="text"
                label="Company"
                onChange={(e) => setCompany(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                color="secondary"
                required
                fullWidth
                type="text"
                label="Position"
                onChange={(e) => setPosition(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                color="secondary"
                required
                fullWidth
                type="text"
                label="Address"
                onChange={(e) => setAddress(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                color="secondary"
                required
                fullWidth
                type="number"
                label="Contacts"
                onChange={(e) => setContacts(e.target.value)}
              />
            </Grid>
          </Grid>

          <Button
            type="submit"
            fullWidth
            disabled={loading}
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Register;
