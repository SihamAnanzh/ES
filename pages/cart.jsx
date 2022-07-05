import { Button, Card, Divider, Grid, TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import MenuItem from "@mui/material/MenuItem";
import { FlexBetween, FlexBox } from "components/flex-box";
import CheckoutNavLayout from "components/layouts/CheckoutNavLayout";
import ProductCard7 from "components/product-cards/ProductCard7";
import { Span } from "components/Typography";
import { useAppContext } from "contexts/AppContext";
import countryList from "data/countryList";
import { getSession, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect } from "react";
import BackendManager from "../src/globalManager/BackendManager";

const Cart = ({ userInfo }) => {
  const { state, dispatch } = useAppContext();

  const cartList = state.cart;

  const getTotalPrice = () => {
    return cartList.reduce((accum, item) => accum + item.price * item.qty, 0);
  };

  const paymentCheckout = () => {
    Checkout(
      {
        id: null,
        first_name: userInfo.first_name,
        middle_name: " ",
        last_name: userInfo.last_name,
        email: userInfo.username,
        phone: {
          country_code: "965",
          number: userInfo.phone,
        },
        address: "Address",
      },
      {
        amount: getTotalPrice(),
        currency: "KWD",
        order: {
          amount: getTotalPrice(),
          currency: "KWD",
          items: [],
        },
        shipping: null,
        taxes: null,
      },
      // `${process.env.NEXTAUTH_URL}${route.locale}`
      `http://localhost:3000/orders`
    );
    goSell.openLightBox();
  };

  return (
    <CheckoutNavLayout>
      <Grid container spacing={3}>
        <Grid item md={8} xs={12}>
          {cartList.map((item) => (
            <ProductCard7 key={item.id} {...item} />
          ))}
        </Grid>

        <Grid item md={4} xs={12}>
          <Card
            sx={{
              padding: 3,
            }}
          >
            <FlexBetween mb={2}>
              <Span color="grey.600">Item:</Span>

              <Span fontSize={13} fontWeight={200} lineHeight="1">
                {cartList.length}
              </Span>
            </FlexBetween>

            <FlexBetween mb={2}>
              <Span color="grey.600">Email:</Span>

              <Span fontSize={13} fontWeight={200} lineHeight="1">
                {userInfo.username}
              </Span>
            </FlexBetween>
            <FlexBetween mb={2}>
              <Span color="grey.600">Phone:</Span>

              <Span fontSize={13} fontWeight={200} lineHeight="1">
                {userInfo.phone}
              </Span>
            </FlexBetween>
            <Divider
              sx={{
                mb: 2,
              }}
            />
            <FlexBetween mb={2}>
              <Span color="grey.600">Total:</Span>

              <Span fontSize={16} fontWeight={600} lineHeight="1">
                ${getTotalPrice().toFixed(2)}
              </Span>
            </FlexBetween>

            <Divider
              sx={{
                mb: 2,
              }}
            />

            <Button
              onClick={paymentCheckout}
              variant="contained"
              color="primary"
              fullWidth
            >
              Checkout Now
            </Button>
          </Card>
        </Grid>
      </Grid>
    </CheckoutNavLayout>
  );
};

export default Cart;
export async function getServerSideProps(context) {
  let session = await getSession(context);
  console.log(session.data);
  let userInfo = await BackendManager.getUserProfile(session.user);

  return {
    props: { userInfo },
  };
}
