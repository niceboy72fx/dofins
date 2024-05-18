import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import GoogleIcon from "@mui/icons-material/Google";
import ButtonGroup from "@mui/material/ButtonGroup";
import FacebookIcon from "@mui/icons-material/Facebook";
import { EMAIL_REGX, PASSWORD_REGX } from "../../../const";
import LoginImage from "../../../assets/login.png";

const defaultTheme = createTheme();

export const LoginForm = ({ handleLogin }) => {
  const [checkEmail, setCheckEmail] = React.useState({
    error: false,
    content: "",
  });

  const [checkPassword, setCheckPassword] = React.useState({
    error: false,
    content: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formData = {
      email: data.get("email"),
      password: data.get("password"),
    };
    if (formData.email === "" && formData.password === "") {
      setCheckEmail({
        error: true,
        content: "Email is not valid !",
      });
      setCheckPassword({
        error: true,
        content: "Password must be length > or = 8 characters !",
      });
    } else {
      handleLogin(formData);
    }
  };

  const eventListenEmailInput = (event) => {
    if (EMAIL_REGX.test(event.target.value) === false) {
      setCheckEmail({
        error: true,
        content: "Email is not valid !",
      });
    } else if (EMAIL_REGX.test(event.target.value) === true) {
      setCheckEmail({
        error: false,
        content: "",
      });
    }
  };

  const eventListenPasswordInput = (event) => {
    if (PASSWORD_REGX.test(event.target.value) === false) {
      setCheckPassword({
        error: true,
        content: "Password must be length > or = 8 characters !",
      });
    } else if (PASSWORD_REGX.test(event.target.value) === true) {
      setCheckPassword({
        error: false,
        content: "",
      });
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${LoginImage})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={4}>
          <Box
            sx={{
              my: 8,
              mx: 10,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 3, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 15 }}
            >
              <TextField
                error={checkEmail.error}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                helperText={checkEmail.content}
                onChange={eventListenEmailInput}
              />
              <TextField
                error={checkPassword.error}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                helperText={checkPassword.content}
                autoComplete="current-password"
                onChange={eventListenPasswordInput}
              />

              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                <p className="ml-4 font-bold">Sign in </p>
              </Button>
              <ButtonGroup
                fullWidth={true}
                aria-label="Basic button group"
                variant="outlined"
                sx={{ mb: 8 }}
              >
                <Button>
                  <GoogleIcon />
                </Button>
                <Button>
                  <FacebookIcon />
                </Button>
              </ButtonGroup>
              <Grid container>
                <Grid item xs>
                  <Link href="/" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/register" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};
