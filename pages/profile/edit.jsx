import CameraEnhance from "@mui/icons-material/CameraEnhance";
import Person from "@mui/icons-material/Person";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DateTimePicker from "@mui/lab/DateTimePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { Avatar, Box, Button, Grid, TextField } from "@mui/material";
import Card1 from "components/Card1";
import { FlexBox } from "components/flex-box";
import CustomerDashboardLayout from "components/layouts/customer-dashboard";
import CustomerDashboardNavigation from "components/layouts/customer-dashboard/Navigations";
import DashboardPageHeader from "components/layouts/DashboardPageHeader";
import { Formik } from "formik";
import Link from "next/link";
import React, { useEffect } from "react";
import * as yup from "yup";
import BackendManager from "../../src/globalManager/BackendManager";
import { getSession, useSession } from "next-auth/react";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

const ProfileEditor = ({ res }) => {
  const [emailRquired, setEmailRqueired] = useState(false);

  const session = useSession();
  const [email, setEmail] = useState(
    res.username == "" ? setEmailRqueired(true) : res.username
  );
  const [phone, setPhone] = useState(res.phone);
  const [lastName, setLastName] = useState(res.last_name);
  const [firstName, setFirstName] = useState(res.first_name);
  const route = useRouter();
  const { t } = useTranslation();
  const getTrans = (key) => {
    return t(`common:${key}`);
  };
  const handleFormSubmit = async () => {
    let data = {
      username: email,
      first_name: firstName,
      last_name: lastName,
      phone: phone,
    };
    let response = await BackendManager.updateUserProfile(
      session.data.user,
      data,
      route.locale
    );

    if (response.data.status.code == 200) {
      toast.success(response.data.status.message, {
        position: "top-center",
        autoClose: 5005,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        autoClose: false,
      });
    } else {
      toast.warn(response.data.status.message, {
        position: "top-center",
        autoClose: 5005,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        autoClose: false,
      });
    }
  };

  useEffect(() => {}, []);

  return (
    <CustomerDashboardLayout>
      <ToastContainer />
      <DashboardPageHeader
        icon={Person}
        title={getTrans("EditProfile")}
        navigation={<CustomerDashboardNavigation />}
        button={
          <Link href="/profile" passHref>
            <Button
              sx={{
                px: 4,
                bgcolor: "primary.light",
              }}
            >
              {getTrans("BacktoProfile")}
            </Button>
          </Link>
        }
      />

      <Card1>
        <FlexBox alignItems="flex-end" mb={3}></FlexBox>

        <Box>
          <Box mb={4}>
            <Grid container spacing={3}>
              <Grid item md={6} xs={12}>
                <TextField
                  autoComplete="off"
                  fullWidth
                  name="first_name"
                  label={getTrans("FirstName")}
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  autoComplete="off"
                  value={lastName}
                  fullWidth
                  name="last_name"
                  label={getTrans("LastName")}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                {emailRquired ? (
                  <TextField
                    autoComplete="off"
                    value={email}
                    name="email"
                    fullWidth
                    label={getTrans("Email")}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                ) : (
                  <TextField
                    autoComplete="off"
                    value={email}
                    name="email"
                    fullWidth
                    label={getTrans("Email")}
                  />
                )}
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  autoComplete="off"
                  value={phone}
                  fullWidth
                  label={getTrans("Phone")}
                  name="contact"
                  onChange={(e) => setPhone(e.target.value)}
                />
              </Grid>
            </Grid>
          </Box>

          <Button
            variant="contained"
            onClick={handleFormSubmit}
            color="primary"
          >
            {getTrans("SaveChanges")}
          </Button>
        </Box>
      </Card1>
    </CustomerDashboardLayout>
  );
};

export default ProfileEditor;

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
  let res = await BackendManager.getUserProfile(session.user, locale);

  return {
    props: { res, ...(await serverSideTranslations(locale, ["common"])) },
  };
}
