import { Container, Grid } from "@mui/material";
import GroceryLayout from "components/layouts/GroceryLayout";
import CheckoutForm2 from "pages-sections/checkout/CheckoutForm2";
import CheckoutSummary2 from "pages-sections/checkout/CheckoutSummary2";
import React from "react";

const CheckoutAlternative = () => {
  return (
    <GroceryLayout>
      <Container
        sx={{
          my: "1.5rem",
        }}
      >
        <Grid container spacing={3}>
          <Grid item lg={8} md={8} xs={12}>
            <CheckoutForm2 />
          </Grid>

          <Grid item lg={4} md={4} xs={12}>
            <CheckoutSummary2 />
          </Grid>
        </Grid>
      </Container>
    </GroceryLayout>
  );
};

export default CheckoutAlternative;
