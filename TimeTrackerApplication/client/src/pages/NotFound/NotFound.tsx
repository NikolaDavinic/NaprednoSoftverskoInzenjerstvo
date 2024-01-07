// NotFoundPage.tsx
import React from "react";
import { Link } from "react-router-dom";
import { Button, Typography, Container, CssBaseline } from "@mui/material";

const NotFound: React.FC = () => {
  return (
    <Container component="main" maxWidth="xs" sx={{height: "100vh", display:"flex", justifyContent: "center", alignItems: "center"}}>
      <CssBaseline />
      <div className="flex flex-col items-center justify-center h-screen">
        <Typography variant="h1" color="textPrimary" gutterBottom>
          404
        </Typography>
        <Typography variant="h5" color="textSecondary" paragraph>
          Oops! Page not found.
        </Typography>
        <Button
          component={Link}
          to="/"
          variant="contained"
          color="primary"
          className="mt-2"
        >
          Go to Home
        </Button>
      </div>
    </Container>
  );
};

export default NotFound;
