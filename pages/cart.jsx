import { Button, Card, Divider, Grid, TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import MenuItem from "@mui/material/MenuItem";
import { FlexBetween, FlexBox } from "components/flex-box";
import CheckoutNavLayout from "components/layouts/CheckoutNavLayout";
import ProductCard7 from "components/product-cards/ProductCard7";
import { Span } from "components/Typography";
import { useAppContext } from "contexts/AppContext";
import countryList from "data/countryList";
import Link from "next/link";

const Cart = () => {
  const { state } = useAppContext();
  const cartList = state.cart;

  const getTotalPrice = () => {
    return cartList.reduce((accum, item) => accum + item.price * item.qty, 0);
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
              <Span color="grey.600">Total:</Span>

              <Span fontSize={18} fontWeight={600} lineHeight="1">
                ${getTotalPrice().toFixed(2)}
              </Span>
            </FlexBetween>

            <Divider
              sx={{
                mb: 2,
              }}
            />

            <Divider
              sx={{
                mb: 2,
              }}
            />

            <TextField
              fullWidth
              size="small"
              label="Voucher"
              variant="outlined"
              placeholder="Voucher"
            />

            <Button
              variant="outlined"
              color="primary"
              fullWidth
              sx={{
                mt: 2,
                mb: 4,
              }}
            >
              Apply Voucher
            </Button>

            <Divider
              sx={{
                mb: 2,
              }}
            />

            <Link href="/checkout" passHref>
              <Button variant="contained" color="primary" fullWidth>
                Checkout Now
              </Button>
            </Link>
          </Card>
        </Grid>
      </Grid>
    </CheckoutNavLayout>
  );
};

const stateList = [
  {
    value: "New York",
    label: "New York",
  },
  {
    value: "Chicago",
    label: "Chicago",
  },
];
export default Cart;
