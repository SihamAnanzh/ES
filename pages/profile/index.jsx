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
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import Head from "next/head";

const Profile = ({ data }) => {
  const session = useSession();
  const { t } = useTranslation();
  const getTrans = (key) => {
    return t(`common:${key}`);
  };
  return (
    <CustomerDashboardLayout>
      <Head>
        <title>Profile</title>
      </Head>
      <DashboardPageHeader
        color="#595959"
        icon={Person}
        title={getTrans("MyProfile")}
        navigation={<CustomerDashboardNavigation />}
        button={
          <Link href="/profile/edit" passHref>
            <Button
              sx={{
                px: 4,
                bgcolor: "primary.light",
                color: "#595959",
              }}
            >
              {getTrans("EditProfile")}
            </Button>
          </Link>
        }
      />

      <TableRow
        sx={{
          p: "0.75rem 1.5rem",
        }}
      >
        <FlexBox flexDirection="column" p={1}>
          <Small color="grey.600" mb={0.5} textAlign="left">
            {getTrans("FirstName")}
          </Small>
          <span>{data.first_name}</span>
        </FlexBox>

        <FlexBox flexDirection="column" p={1}>
          <Small color="grey.600" mb={0.5} textAlign="left">
            {getTrans("LastName")}
          </Small>
          <span>{data.last_name}</span>
        </FlexBox>

        <FlexBox flexDirection="column" p={1}>
          <Small color="grey.600" mb={0.5} textAlign="left">
            {getTrans("Email")}
          </Small>
          <span>{data.username}</span>
        </FlexBox>

        <FlexBox flexDirection="column" p={1}>
          <Small color="grey.600" mb={0.5} textAlign="left">
            {getTrans("Phone")}
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
  const { locale } = context;

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/" + locale,
      },
    };
  }
  const userData = await BackendManager.getUserProfile(session.user);

  return {
    props: {
      data: userData,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
