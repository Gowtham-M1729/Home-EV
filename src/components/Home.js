import React from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <Button
        variant="contained"
        style={{
          padding: "20px",
          margin: "auto",
          width: "300px",
          display: "flex",
          flexDirection: "column",
          marginTop: "30px",
        }}
      >
        <Link to="/login">User</Link>
      </Button>
      <Button
        variant="contained"
        style={{
          padding: "20px",
          margin: "auto",
          width: "300px",
          display: "flex",
          flexDirection: "column",
          marginTop: "30px",
        }}
      >
        <Link to="/provider-login">provider</Link>
      </Button>
    </div>
  );
};

export default Home;
