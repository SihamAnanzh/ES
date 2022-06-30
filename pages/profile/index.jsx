import Person from "@mui/icons-material/Person";
import { Avatar, Box, Button, Card, Grid, Typography } from "@mui/material";
import { FlexBetween, FlexBox } from "components/flex-box";
import CustomerDashboardLayout from "components/layouts/customer-dashboard";
import CustomerDashboardNavigation from "components/layouts/customer-dashboard/Navigations";
import DashboardPageHeader from "components/layouts/DashboardPageHeader";
import TableRow from "components/TableRow";
import { H3, H5, Small } from "components/Typography";
import Link from "next/link";
import React from "react";
import { getSession, useSession } from "next-auth/react";
import BackEndManager from "../../src/globalManager/BackendManager";

const Profile = ({}) => {
  const session = useSession();
  let data = {
    id: "0953b8fd-8bae-4bd1-992d-0cef73428032",
    first_name: "Marwan M J",
    last_name: "Alakhrass",
    facility_name: "",
    phone: "+962796788572",
    mobile_number: "+962796788572",
    username: "m.alakhrass@dominate.dev",
    password: "+vKWZkEkBID8PAysnsDDhQ==",
    token: "ae34ec74-e788-43e7-8917-bb45440aee23",
    is_verified: true,
    is_active: true,
    register_date: "2021-11-01T12:22:51",
    register_date_string: "01/11/2021 12:22",
    device_id:
      "cQFvuu8EcEPKkpI-3ZdCm6:APA91bHe91khPq2LXWkPozKpCf1jhWzqfYYf4fxnI4EzV3xBRRVcQm4Zt7JN1lqEaFDz_ua9ZF6gvQ4J9-ffsTnuv2_MmuwdcZrqheR3tevIf44F2-_ioFBE7leN2FY6_qEsKJ1DAgpu",
    social_media_id: "",
    social_media_token: null,
    logo_url: "https://staging.xprestores.com/assets/image/placeholder.png",
    total_revenue: 0,
    country_id: 1,
    social_media_type: null,
    user_type: {
      id: 1,
      title: "client",
    },
    country: {
      id: 1,
      title: "Kuwait",
      logo_filename: "logo_1.png?v=879ba5fb-58b1-4415-9437-28738ad59e89",
      logo_url:
        "https://staging.xprestores.com/assets/country/1/logo_1.png?v=879ba5fb-58b1-4415-9437-28738ad59e89",
      phone_ext: "+962",
    },
    addresses: [
      {
        id: 63,
        user_id: "0953b8fd-8bae-4bd1-992d-0cef73428032",
        area: "Amman",
        block: "University Block",
        street: "Street No.12",
        building: "+962796788572",
        floor: "floor 1",
        apartment: "Aparment No.45",
        is_active: true,
        lat: "55.33",
        lng: "30.10202",
      },
      {
        id: 82,
        user_id: "0953b8fd-8bae-4bd1-992d-0cef73428032",
        area: "Amman",
        block: "University Block",
        street: "Street No.12",
        building: "+962796788572",
        floor: "floor 1",
        apartment: "Aparment No.45",
        is_active: true,
        lat: "55.33",
        lng: "30.10202",
      },
    ],
  };

  return (
    <CustomerDashboardLayout>
      <DashboardPageHeader
        icon={Person}
        title="My Profile"
        navigation={<CustomerDashboardNavigation />}
        button={
          <Link href="/profile/edit" passHref>
            <Button
              color="primary"
              sx={{
                px: 4,
                bgcolor: "primary.light",
              }}
            >
              Edit Profile
            </Button>
          </Link>
        }
      />

      {/* <Box mb={4}>
        <Grid container spacing={3}>
          <Grid item md={6} xs={12}>
            <Card
              sx={{
                display: "flex",
                p: "14px 32px",
                height: "100%",
                alignItems: "center",
              }}
            >
              <Avatar
                src="/assets/images/faces/ralph.png"
                sx={{
                  height: 64,
                  width: 64,
                }}
              />

              <Box ml={1.5} flex="1 1 0">
                <FlexBetween flexWrap="wrap">
                  <div>
                    <H5 my="0px">Ralph Edwards</H5>
                    <FlexBox alignItems="center">
                      <Typography color="grey.600">Balance:</Typography>
                      <Typography ml={0.5} color="primary.main">
                        $500
                      </Typography>
                    </FlexBox>
                  </div>

                  <Typography color="grey.600" letterSpacing="0.2em">
                    SILVER USER
                  </Typography>
                </FlexBetween>
              </Box>
            </Card>
          </Grid>

          <Grid item md={6} xs={12}>
            <Grid container spacing={4}>
              {infoList.map((item) => (
                <Grid item lg={3} sm={6} xs={6} key={item.subtitle}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      p: "1rem 1.25rem",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    <H3 color="primary.main" my={0} fontWeight={600}>
                      {item.title}
                    </H3>

                    <Small color="grey.600" textAlign="center">
                      {item.subtitle}
                    </Small>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box> */}

      <TableRow
        sx={{
          p: "0.75rem 1.5rem",
        }}
      >
        <FlexBox flexDirection="column" p={1}>
          <Small color="grey.600" mb={0.5} textAlign="left">
            First Name
          </Small>
          <span>{data.first_name}</span>
        </FlexBox>

        <FlexBox flexDirection="column" p={1}>
          <Small color="grey.600" mb={0.5} textAlign="left">
            Last Name
          </Small>
          <span>{data.last_name}</span>
        </FlexBox>

        <FlexBox flexDirection="column" p={1}>
          <Small color="grey.600" mb={0.5} textAlign="left">
            Email
          </Small>
          <span>{data.username}</span>
        </FlexBox>

        <FlexBox flexDirection="column" p={1}>
          <Small color="grey.600" mb={0.5} textAlign="left">
            Phone
          </Small>
          <span>{data.phone}</span>
        </FlexBox>
      </TableRow>
    </CustomerDashboardLayout>
  );
};

export default Profile;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  // if (!session) {
  //   return {
  //     redirect: {
  //       permanent: false,
  //       destination: "/",
  //     },
  //   };
  // }

  // const userData = BackEndManager.getUserProfile(session.user);

  return {
    props: {},
  };
}
