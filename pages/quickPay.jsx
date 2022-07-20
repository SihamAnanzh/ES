import CustomerDashboardNavigation from "components/layouts/customer-dashboard/Navigations";
import DashboardPageHeader from "components/layouts/DashboardPageHeader";
import BackendManager from "../src/globalManager/BackendManager";
import { Done, ShoppingBag } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  Divider,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import { FlexBetween, FlexBox } from "components/flex-box";
import { useAppContext } from "contexts/AppContext";
import CustomerDashboardLayout from "components/layouts/customer-dashboard";

import TableRow from "components/TableRow";
import { H5, H6, Paragraph } from "components/Typography";

import React, { Fragment, useEffect } from "react";
import { getSession, useSession } from "next-auth/react";

import BazarButton from "components/BazarButton";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";
import Head from "next/head";
import { useState } from "react";

const quickPay = ({ quickList, userInfo }) => {
  const { t } = useTranslation();
  const session = useSession();
  const route = useRouter();
  const { state, dispatch } = useAppContext();
  const [price, setPrice] = useState();
  const cartList = state.cart;
  const getTrans = (key) => {
    return t(`common:${key}`);
  };
  const getTotalPrice = () => {
    return cartList.reduce((accum, item) => accum + item.price * item.qty, 0);
  };

  useEffect(() => {
    console.log(price);
  }, [price]);

  return (
    <CustomerDashboardLayout>
      <ToastContainer />
      <Head>
        <title>QuickPay</title>
      </Head>
      <DashboardPageHeader
        title={getTrans("QuickPay")}
        icon={ShoppingBag}
        navigation={<CustomerDashboardNavigation />}
      />

      <Box
        py={1}
        sx={{
          height: "max-content",
          pb: 20,
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          flexWrap: "wrap",
        }}
      >
        {quickList &&
          quickList.map((item) => (
            <Card
              sx={{
                pb: "20px",
                mb: "30px",
                width: "430px",
                marginRight: "20px",
              }}
            >
              <TableRow
                sx={{
                  p: "12px",
                  borderRadius: 0,
                  boxShadow: "none",
                  bgcolor: "grey.200",
                }}
              >
                <FlexBox className="pre" m={0.75} alignItems="center">
                  <Typography fontSize={14} color="grey.600" mr={0.5}>
                    {getTrans("OrderID")} :
                  </Typography>
                  <Typography fontSize={14}>{item.id}</Typography>
                </FlexBox>
                <FlexBox className="pre" m={0.75} alignItems="center">
                  <Typography fontSize={14} color="grey.600" mr={0.5}>
                    {getTrans("Total")} :
                  </Typography>
                  {console.log(item)}
                  <Typography fontSize={14}>
                    {" "}
                    {item.details[0].currency.id == "1"
                      ? "$"
                      : item.currency}{" "}
                    {item.total}
                  </Typography>
                </FlexBox>
                <FlexBox className="pre" m={0.75} alignItems="center">
                  <Typography
                    fontSize={14}
                    color="grey.600"
                    mr={0.5}
                  ></Typography>
                  <Typography fontSize={14}></Typography>
                </FlexBox>
                <FlexBox className="pre" m={0.75} alignItems="center">
                  <Typography>
                    <BazarButton
                      onClick={async () => {
                        setPrice(item.total);
                        let data = {
                          id: item.main_category.id,
                          quick: false,
                          items: item.details.map((item) => {
                            let ob = {
                              item_id: item.id,
                              quantity: item.quantity,
                            };
                            return ob;
                          }),
                        };
                        localStorage.setItem("order", JSON.stringify(data));
                        await BackendManager.tapPaymentCheckOutValidat(
                          data,
                          session.data.user
                        ).then(async (res) => {
                          if (res.status.code == 200) {
                            console.log(item);
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
                                amount: item.total,
                                currency: "USD",
                                order: {
                                  amount: item.total,
                                  currency: "USD",
                                  items: [],
                                },
                                shipping: null,
                                taxes: null,
                              },
                              // `${process.env.NEXTAUTH_URL}${route.locale}`
                              // `http://localhost:3000/${route.locale}/orders`
                              `https://xpresswebsite.herokuapp.com/${route.locale}/orders`
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
                      }}
                      mr={50}
                      className="add"
                      sx={{ width: "100px !important", marginLeft: "20px" }}
                    >
                      {" "}
                      {route.locale == "ar" ? "شراء مرة أخرى" : "Buy again"}
                    </BazarButton>
                  </Typography>
                </FlexBox>{" "}
              </TableRow>
              {item.details.map((item) => (
                <FlexBox
                  px={2}
                  py={1}
                  flexWrap="wrap"
                  alignItems="center"
                  key={item.id}
                >
                  <FlexBox flex="2 2 260px" m={0.75} alignItems="center">
                    <Avatar
                      src={item.imgUrl}
                      sx={{
                        height: 64,
                        width: 64,
                      }}
                    />
                    <Box ml={2.5}>
                      <H6 my="0px">{item.title}</H6>
                      <Typography fontSize="14px" color="grey.600">
                        {item.currency.id == "1" ? "$" : item.currency}{" "}
                        {item.price} x {item.quantity}
                      </Typography>
                    </Box>
                  </FlexBox>

                  <FlexBox flex="1 1 260px" m={0.75} alignItems="center">
                    <Typography fontSize="14px" color="grey.600"></Typography>
                  </FlexBox>
                </FlexBox>
              ))}
            </Card>
          ))}
      </Box>
    </CustomerDashboardLayout>
  );
};
export default quickPay;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const { locale } = context;

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/" + locale,
      },
    };
  }
  const lists = await BackendManager.getQuickPayList(session.user, locale);
  let userInfo = {};
  if (session) {
    userInfo = await BackendManager.getUserProfile(session.user, locale);
  }

  return {
    props: {
      userInfo,
      quickList: lists,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
