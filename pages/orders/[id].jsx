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
import { styled } from "@mui/material/styles";
import { FlexBetween, FlexBox } from "components/flex-box";
import Delivery from "components/icons/Delivery";

import CustomerDashboardLayout from "components/layouts/customer-dashboard";

import TableRow from "components/TableRow";
import { H5, H6, Paragraph } from "components/Typography";

import React, { Fragment, useEffect } from "react";
import { getSession } from "next-auth/react";

import BackendManager from "../../src/globalManager/BackendManager";
import BazarButton from "components/BazarButton";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

const StyledFlexbox = styled(FlexBetween)(({ theme }) => ({
  flexWrap: "wrap",
  marginTop: "2rem",
  marginBottom: "2rem",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
  "& .line": {
    height: 4,
    minWidth: 50,
    flex: "1 1 0",
    [theme.breakpoints.down("sm")]: {
      flex: "unset",
      height: 50,
      minWidth: 4,
    },
  },
}));

const OrderDetails = ({ orderDetails, deliverd, orderId, total }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const getTrans = (key) => {
    return t(`common:${key}`);
  };
  const route = useRouter();

  console.log(theme.breakpoints.up("md"));
  return (
    <CustomerDashboardLayout>
      <Card
        sx={{
          p: 0,
          mb: "30px",
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
              {getTrans("OrderID")}
            </Typography>
            <Typography fontSize={14}>{orderId}</Typography>
          </FlexBox>

          <FlexBox className="pre" m={0.75} alignItems="center">
            <Typography fontSize={14} color="grey.600" mr={0.5}></Typography>
            <Typography fontSize={14}></Typography>
          </FlexBox>

          <FlexBox className="pre" m={0.75} alignItems="center">
            <Typography fontSize={14} color="grey.600" mr={0.5}>
              {getTrans("Datepurchased")}
            </Typography>
            <Typography fontSize={14}>{deliverd}</Typography>
          </FlexBox>
        </TableRow>

        <Box py={1}>
          {orderDetails.map((item) => (
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
                    ${item.price} x 1
                  </Typography>
                </Box>
              </FlexBox>

              <FlexBox flex="1 1 260px" m={0.75} alignItems="center">
                <Typography fontSize="14px" color="grey.600"></Typography>
              </FlexBox>

              <FlexBox flex="160px" m={0.75} alignItems="center">
                <BazarButton variant="text" color="primary">
                  <Typography fontSize="14px">
                    Codes :{item.codes.map((data) => data.serial)}
                  </Typography>
                </BazarButton>
              </FlexBox>
            </FlexBox>
          ))}
        </Box>
      </Card>

      <Grid container spacing={3}>
        <Grid item lg={6} md={6} xs={12}>
          <Card
            sx={{
              p: "20px 30px",
            }}
          >
            <H5 mt={0} mb={2}>
              {getTrans("TotalSummary")}
            </H5>

            <Divider
              sx={{
                mb: 1,
              }}
            />

            <FlexBetween mb={2}>
              <H6 my="0px"> {getTrans("Total")}</H6>
              <H6 my="0px">${total}</H6>
            </FlexBetween>
            {route.query.quick == true && (
              <FlexBetween mb={2}>
                <H6 my="0px"></H6>
                <BazarButton bt={2} className="add" sx={{ width: "120px " }}>
                  {" "}
                  {route.locale == "ar" ? "شراء مرة أخرى" : "Buy again"}
                </BazarButton>
              </FlexBetween>
            )}
          </Card>
        </Grid>
      </Grid>
    </CustomerDashboardLayout>
  );
};

export default OrderDetails;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const { locale } = context;
  let orderDetails = [];
  let id = context.query.id;
  const order = await BackendManager.getOrderById(session.user, id, locale);
  let deliverd = order.date_string;
  let total = order.total;

  order.details.map((data) => {
    orderDetails.push({
      title: data.title,
      id: data.id,
      price: data.price,
      imgUrl: data.images[0].image_url,
      quantity: data.quantity,
      codes: data.codes,
      description: data.description,
    });
  });

  return {
    props: {
      orderDetails,
      orderId: id,
      deliverd,
      total,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
