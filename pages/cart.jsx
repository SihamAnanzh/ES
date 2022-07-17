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
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import BazarButton from "components/BazarButton";

import BackendManager from "../src/globalManager/BackendManager";
import {
  Checkbox,
  styled,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import { useState } from "react";
import { withStyles } from "@mui/material";
import { useTranslation } from "next-i18next";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/router";
import Head from "next/head";

const Cart = ({ userInfo }) => {
  const { state, dispatch } = useAppContext();
  const session = useSession();
  const cartList = state.cart;
  const [quickPay, setQuicPay] = useState(false);
  const getTotalPrice = () => {
    return cartList.reduce((accum, item) => accum + item.price * item.qty, 0);
  };

  let price = getTotalPrice();
  const route = useRouter();

  const { t } = useTranslation();

  const getTrans = (key) => {
    return t(`common:${key}`);
  };

  const paymentCheckout = async () => {
    let cartItem = [];

    if (session.data) {
      if ((userInfo.email == "", userInfo.phone == "")) {
        return toast.warn(
          "The profile is not complete, you need to enter all your information",
          {
            position: "top-center",
            autoClose: 5005,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            autoClose: false,
          }
        );
      }
      if (state.cart.length > 0) {
        let items = state.cart.map((item) => {
          cartItem.push({
            item_id: item.id,
            quantity: Number(item.qty),
          });

          return data;
        });

        let data = {
          id: state.cart[0].mainId,
          quick: quickPay,
          items: cartItem,
        };
        localStorage.setItem("order", JSON.stringify(data));
        await BackendManager.tapPaymentCheckOutValidat(
          data,
          session.data.user
        ).then(async (res) => {
          if (res.status.code == 200) {
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
              `${process.env.NEXTAUTH_URL}${route.locale}/orders`
              // `http://localhost:3000/${route.locale}/orders`
              // `https://xpresstors.herokuapp.com/${route.locale}/orders`
            );
            goSell.openLightBox();
          } else
            toast.warn(res.status.message, {
              position: "top-center",
              autoClose: 5005,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              autoClose: false,
            });
        });
      }
    } else {
      // toast.warn(getTrans("needLogin"), {
      //   position: "top-center",
      //   autoClose: 5005,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   autoClose: false,
      // });

      route.push("/login?callbackurl=/cart", "/login?callbackurl=/cart", {
        locale: route.locale,
      });
    }
  };

  return (
    <CheckoutNavLayout>
      <Head>
        <title>Cart</title>
      </Head>
      <Grid
        style={{
          height: "100vh",
        }}
        container
        spacing={3}
      >
        <Grid item md={8} xs={12}>
          {cartList.map((item, ind) => (
            <ProductCard7 id={item.id} key={ind} {...item} />
          ))}
        </Grid>

        <Grid item md={4} xs={12}>
          <Card
            sx={{
              padding: 3,
            }}
          >
            <FlexBetween mb={2}>
              <Span color="grey.600">{getTrans("Item")} :</Span>

              <Span
                color="#FF8236"
                fontSize={13}
                fontWeight={200}
                lineHeight="1"
              >
                {cartList.length}
              </Span>
            </FlexBetween>

            <FlexBetween mb={2}>
              <Span color="grey.600">{getTrans("Email")} :</Span>

              <Span
                color="#FF8236"
                fontSize={13}
                fontWeight={200}
                lineHeight="1"
              >
                {userInfo.username}
              </Span>
            </FlexBetween>
            <FlexBetween mb={2}>
              <Span color="grey.600">{getTrans("Phone")} :</Span>

              <Span
                color="#FF8236"
                fontSize={13}
                fontWeight={200}
                lineHeight="1"
              >
                {userInfo.phone}
              </Span>
            </FlexBetween>
            <Divider
              sx={{
                mb: 2,
              }}
            />
            <FlexBetween mb={2}>
              <Span color="#000" fontWeight={600}>
                {getTrans("AddtoQuick")} :
              </Span>

              <Span
                color="#FF8236"
                fontSize={16}
                fontWeight={600}
                lineHeight="1"
              >
                {" "}
                <Checkbox
                  checked={quickPay}
                  onChange={(e) => setQuicPay(e.target.checked)}
                  style={{
                    color: "#FF8236",
                  }}
                />
              </Span>
            </FlexBetween>
            <FlexBetween mb={2}>
              <Span color="#000" fontWeight={600}>
                {getTrans("Total")} :
              </Span>

              <Span
                color="#FF8236"
                fontSize={16}
                fontWeight={600}
                lineHeight="1"
              >
                KWD {getTotalPrice().toFixed(2)}
              </Span>
            </FlexBetween>

            <Divider
              sx={{
                mb: 2,
              }}
            />

            <BazarButton
              className="add"
              onClick={paymentCheckout}
              variant="contained"
              // style={{ background: "#FF8236", color: "#fff" }}
              fullWidth
            >
              {getTrans("CheckoutNow")}
            </BazarButton>
          </Card>
        </Grid>
      </Grid>
    </CheckoutNavLayout>
  );
};

export default Cart;
export async function getServerSideProps(context) {
  let session = await getSession(context);
  const { locale } = context;
  let userInfo = {};
  if (session) {
    userInfo = await BackendManager.getUserProfile(session.user, locale);
  }

  return {
    props: { userInfo, ...(await serverSideTranslations(locale, ["common"])) },
  };
}
