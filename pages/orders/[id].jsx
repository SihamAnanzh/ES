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
import PackageBox from "components/icons/PackageBox";
import TruckFilled from "components/icons/TruckFilled";
import CustomerDashboardLayout from "components/layouts/customer-dashboard";
import CustomerDashboardNavigation from "components/layouts/customer-dashboard/Navigations";
import DashboardPageHeader from "components/layouts/DashboardPageHeader";
import TableRow from "components/TableRow";
import { H5, H6, Paragraph } from "components/Typography";
import productDatabase from "data/product-database";
import { format } from "date-fns";
import useWindowSize from "hooks/useWindowSize";
import React, { Fragment } from "react";
import { getSession } from "next-auth/react";
import BackEndManager from "../../src/globalManager/BackendManager";
import BackendManager from "../../src/globalManager/BackendManager";

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
  const orderStatus = "shipping";
  const orderStatusList = ["packaging", "shipping", "delivering", "complete"];
  const stepIconList = [PackageBox, TruckFilled, Delivery];
  const statusIndex = orderStatusList.indexOf(orderStatus);
  const width = useWindowSize();
  const theme = useTheme();
  const breakpoint = 350;
  console.log(theme.breakpoints.up("md"));
  return (
    <CustomerDashboardLayout>
      {/* <DashboardPageHeader
        icon={ShoppingBag}
        title="Order Details"
        navigation={<CustomerDashboardNavigation />}
        button={
          <Button
            color="primary"
            sx={{
              bgcolor: "primary.light",
              px: 4,
            }}
          >
            Order Again
          </Button>
        }
      />

      <Card
        sx={{
          p: "2rem 1.5rem",
          mb: "30px",
        }}
      >
        <StyledFlexbox>
          {stepIconList.map((Icon, ind) => (
            <Fragment key={ind}>
              <Box position="relative">
                <Avatar
                  sx={{
                    width: 64,
                    height: 64,
                    bgcolor: ind <= statusIndex ? "primary.main" : "grey.300",
                    color: ind <= statusIndex ? "grey.white" : "primary.main",
                  }}
                >
                  <Icon
                    color="inherit"
                    sx={{
                      fontSize: "32px",
                    }}
                  />
                </Avatar>
                {ind < statusIndex && (
                  <Box position="absolute" right="0" top="0">
                    <Avatar
                      sx={{
                        width: 22,
                        height: 22,
                        bgcolor: "grey.200",
                        color: "success.main",
                      }}
                    >
                      <Done
                        color="inherit"
                        sx={{
                          fontSize: "1rem",
                        }}
                      />
                    </Avatar>
                  </Box>
                )}
              </Box>
              {ind < stepIconList.length - 1 && (
                <Box
                  className="line"
                  bgcolor={ind < statusIndex ? "primary.main" : "grey.300"}
                />
              )}
            </Fragment>
          ))}
        </StyledFlexbox>

        <FlexBox justifyContent={width < breakpoint ? "center" : "flex-end"}>
          <Typography
            p="0.5rem 1rem"
            textAlign="center"
            borderRadius="300px"
            color="primary.main"
            bgcolor="primary.light"
          >
            Estimated Delivery Date <b>4th October</b>
          </Typography>
        </FlexBox>
      </Card> */}

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
              Order ID:
            </Typography>
            <Typography fontSize={14}>{orderId}</Typography>
          </FlexBox>

          <FlexBox className="pre" m={0.75} alignItems="center">
            <Typography fontSize={14} color="grey.600" mr={0.5}></Typography>
            <Typography fontSize={14}></Typography>
          </FlexBox>

          <FlexBox className="pre" m={0.75} alignItems="center">
            <Typography fontSize={14} color="grey.600" mr={0.5}>
              Date of purchase:
            </Typography>
            <Typography fontSize={14}>{deliverd}</Typography>
          </FlexBox>
        </TableRow>

        <Box py={1}>
          {orderDetails.map(
            (item) => (
              console.log(item),
              (
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
                    <Button variant="text" color="primary">
                      <Typography fontSize="14px">
                        Codes :{item.codes.map((data) => data.serial)}
                      </Typography>
                    </Button>
                  </FlexBox>
                </FlexBox>
              )
            )
          )}
        </Box>
      </Card>

      <Grid container spacing={3}>
        {/* <Grid item lg={6} md={6} xs={12}>
          <Card
            sx={{
              p: "20px 30px",
            }}
          >
            <H5 mt={0} mb={2}>
              Shipping Address
            </H5>

            <Paragraph fontSize={14} my={0}>
              Kelly Williams 777 Brockton Avenue, Abington MA 2351
            </Paragraph>
          </Card>
        </Grid> */}

        <Grid item lg={6} md={6} xs={12}>
          <Card
            sx={{
              p: "20px 30px",
            }}
          >
            <H5 mt={0} mb={2}>
              Total Summary
            </H5>

            {/* <FlexBetween mb={1}>
              <Typography fontSize={14} color="grey.600">
                Subtotal:
              </Typography>
              <H6 my="0px">$335</H6>
            </FlexBetween>

            <FlexBetween mb={1}>
              <Typography fontSize={14} color="grey.600">
                Shipping fee:
              </Typography>
              <H6 my="0px">$10</H6>
            </FlexBetween>

            <FlexBetween mb={1}>
              <Typography fontSize={14} color="grey.600">
                Discount:
              </Typography>
              <H6 my="0px">-$30</H6>
            </FlexBetween> */}

            <Divider
              sx={{
                mb: 1,
              }}
            />

            <FlexBetween mb={2}>
              <H6 my="0px">Total</H6>
              <H6 my="0px">{total}</H6>
            </FlexBetween>

            <Typography fontSize={14}>Paid by Credit/Debit Card</Typography>
          </Card>
        </Grid>
      </Grid>
    </CustomerDashboardLayout>
  );
};

export default OrderDetails;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  let orderDetails = [];
  let id = context.query.id;
  const order = await BackendManager.getOrderById(session.user, id);
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
    props: { orderDetails, orderId: id, deliverd, total },
  };
}
