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

const ProfileEditor = () => {
  const session = useSession();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [emailRquired, setEmailRqueired] = useState(false);
  console.log(session);

  const handleFormSubmit = async () => {
    let data = {
      username: email,
      first_name: firstName,
      last_name: lastName,
      phone: phone,
    };
    let response = await BackendManager.updateUserProfile(
      session.data.user,
      data
    );

    alert(response);
  };

  useEffect(() => {
    if (session.data) {
      BackendManager.getUserProfile(session.data.user).then((res) => {
        setFirstName(res.first_name);
        setLastName(res.last_name);
        setEmail(res.username);
        setPhone(res.phone);
      });

      if (email == "") {
        setEmail(true);
      }
    }
  }, [session]);

  return (
    <CustomerDashboardLayout>
      <DashboardPageHeader
        icon={Person}
        title="Edit Profile"
        navigation={<CustomerDashboardNavigation />}
        button={
          <Link href="/profile" passHref>
            <Button
              color="primary"
              sx={{
                px: 4,
                bgcolor: "primary.light",
              }}
            >
              Back to Profile
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
                  fullWidth
                  name="first_name"
                  label="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  value={lastName}
                  fullWidth
                  name="last_name"
                  label="Last Name"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  aria-readonly="true"
                  value={email}
                  fullWidth
                  name="email"
                  type="email"
                  label="Email"
                  onChange={(e) => {
                    emailRquired && setEmail(e.target.value);
                  }}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  value={phone}
                  fullWidth
                  label="Phone"
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
            Save Changes
          </Button>
        </Box>
      </Card1>
    </CustomerDashboardLayout>
  );
};

const checkoutSchema = yup.object().shape({
  first_name: yup.string().required("required"),
  last_name: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  contact: yup.string().required("required"),
});
export default ProfileEditor;
