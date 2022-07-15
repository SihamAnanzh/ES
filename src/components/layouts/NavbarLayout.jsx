import { Container } from "@mui/material";
import React from "react";
import Navbar from "../navbar/Navbar";
import AppLayout from "./AppLayout";

const NavbarLayout = ({ children }) => {
  return (
    <AppLayout xs={{ background: "#fff" }} navbar={<Navbar />}>
      <Container
        sx={{
          my: "2rem",
          background: "#fff",
        }}
      >
        {children}
      </Container>
    </AppLayout>
  );
};

export default NavbarLayout;
