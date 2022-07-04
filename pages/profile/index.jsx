import Person from "@mui/icons-material/Person";
import { Avatar, Box, Button, Card, Grid, Typography } from "@mui/material";
import { FlexBetween, FlexBox } from "components/flex-box";
import CustomerDashboardLayout from "components/layouts/customer-dashboard";
import CustomerDashboardNavigation from "components/layouts/customer-dashboard/Navigations";
import DashboardPageHeader from "components/layouts/DashboardPageHeader";
import TableRow from "components/TableRow";
import { H3, H5, Small } from "components/Typography";
import Link from "next/link";
import React, { useEffect } from "react";
import { getSession, useSession } from "next-auth/react";
import BackendManager from "../../src/globalManager/BackendManager";

const Profile = ({ data }) => {
  const session = useSession();
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

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }
  const userData = await BackendManager.getUserProfile(session.user);

  return {
    props: { data: userData },
  };
}
