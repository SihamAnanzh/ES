import { Checkbox, FormControlLabel } from "@mui/material";
import axios from "axios";
import BazarButton from "components/BazarButton";
import BazarTextField from "components/BazarTextField";
import { FlexBox } from "components/flex-box";
import { H3, H6, Small } from "components/Typography";
import { useFormik } from "formik";
import React, { useCallback, useState } from "react";
import * as yup from "yup";
import EyeToggleButton from "./EyeToggleButton";
import { Wrapper } from "./Login";
import SocialButtons from "./SocialButtons";
import { useEffect } from "react";
import { getSession, useSession, signIn } from "next-auth/react";
import { toast, ToastContainer } from "react-toastify";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

const Signup = ({ providers }) => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const { t } = useTranslation();
  const route = useRouter();
  const getTrans = (key) => {
    return t(`common:${key}`);
  };
  const togglePasswordVisibility = useCallback(() => {
    setPasswordVisibility((visible) => !visible);
  }, []);
  const handleFormSubmit = (values) => {
    console.log(values);
    if (values.agreement) {
      axios
        .post(
          process.env.endPoint + "/user/register",
          {
            username: values.email,
            first_name: values.name,
            phone: values.phone,
            password: values.password,
          },
          { headers: { lang: route.locale } }
        )
        .then(async (response) => {
          console.log(response);
          if (response && response.data.status.code === 200) {
            const res = await signIn("xpress-login-auth", {
              redirect: false,
              username: values.email,
              password: values.password,
            });
            if (res?.error) {
              toast.warn(getTrans("Somethingwrongtrylater"), {
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
              toast.success(getTrans("WelcometoXpressStore"), {
                position: "top-center",
                autoClose: 5005,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                autoClose: false,
              });
              route.push("/profile", "/profile", { locale: route.locale });
            }
          } else if (response.data.status.code == 400) {
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
        });
    } else {
      toast.warn(getTrans("YouhavetoagreewithourTermsandConditions"), {
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
  const session = useSession();
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const formSchema = yup.object().shape({
    name: yup.string().required(getTrans("Nameisrequired")),
    email: yup
      .string()
      .email(getTrans("invalidemail"))
      .required(getTrans("Emailisrequired")),

    password: yup.string().required(getTrans("Passwordisrequired")),
    re_password: yup
      .string()
      .oneOf([yup.ref("password"), null], getTrans("Passwordsmustmatch"))
      .required(getTrans("Pleasere-typepassword")),
  });
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      onSubmit: handleFormSubmit,
      validationSchema: formSchema,
    });

  return (
    <Wrapper elevation={3} passwordVisibility={passwordVisibility}>
      <ToastContainer />
      <form
        method="post"
        action="/api/auth/callback/xpress-login-auth"
        onSubmit={handleSubmit}
      >
        <H3 textAlign="center" mb={1}>
          {getTrans("CreateYourAccount")}
        </H3>
        <Small
          mb={4.5}
          fontSize={12}
          display="block"
          fontWeight={600}
          color="grey.800"
          textAlign="center"
        >
          {getTrans("Pleasefillallfieldstocontinue")}
        </Small>

        <BazarTextField
          mb={1.5}
          fullWidth
          name="name"
          size="small"
          label={getTrans("FullName")}
          variant="outlined"
          onBlur={handleBlur}
          value={values.name}
          onChange={handleChange}
          placeholder={getTrans("FullName")}
          error={!!touched.name && !!errors.name}
          helperText={touched.name && errors.name}
        />

        <BazarTextField
          mb={1.5}
          fullWidth
          name="email"
          size="small"
          type="email"
          variant="outlined"
          onBlur={handleBlur}
          value={values.email}
          onChange={handleChange}
          label={getTrans("Email")}
          placeholder={getTrans("Email")}
          error={!!touched.email && !!errors.email}
          helperText={touched.email && errors.email}
        />
        <BazarTextField
          mb={1.5}
          fullWidth
          name="phone"
          size="small"
          type="phone"
          variant="outlined"
          onBlur={handleBlur}
          value={values.phone}
          onChange={handleChange}
          label={getTrans("Phone")}
          placeholder={getTrans("Phone")}
          error={!!touched.Phone && !!errors.Phone}
          helperText={touched.Phone && errors.Phone}
        />

        <BazarTextField
          mb={1.5}
          fullWidth
          size="small"
          name="password"
          label={getTrans("Passowrd")}
          variant="outlined"
          autoComplete="on"
          placeholder="*********"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.password}
          type={passwordVisibility ? "text" : "password"}
          error={!!touched.password && !!errors.password}
          helperText={touched.password && errors.password}
          InputProps={{
            endAdornment: (
              <EyeToggleButton
                show={passwordVisibility}
                click={togglePasswordVisibility}
              />
            ),
          }}
        />

        <BazarTextField
          fullWidth
          size="small"
          autoComplete="on"
          name="re_password"
          variant="outlined"
          label={getTrans("RetypePassword")}
          placeholder="*********"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.re_password}
          type={passwordVisibility ? "text" : "password"}
          error={!!touched.re_password && !!errors.re_password}
          helperText={touched.re_password && errors.re_password}
          InputProps={{
            endAdornment: (
              <EyeToggleButton
                show={passwordVisibility}
                click={togglePasswordVisibility}
              />
            ),
          }}
        />

        <FormControlLabel
          name="agreement"
          className="agreement"
          onChange={handleChange}
          control={
            <Checkbox
              size="small"
              color="secondary"
              checked={values.agreement || false}
            />
          }
          label={
            <FlexBox
              flexWrap="wrap"
              alignItems="center"
              justifyContent="flex-start"
            >
              {getTrans("agree")}
              <a href="/" target="_blank" rel="noreferrer noopener">
                <H6 ml={1} borderBottom="1px solid" borderColor="grey.900">
                  {getTrans("Terms&Conditions")}
                </H6>
              </a>
            </FlexBox>
          }
        />

        <BazarButton
          fullWidth
          type="submit"
          color="primary"
          variant="contained"
          sx={{
            height: 44,
            color: "#fff",
          }}
        >
          {getTrans("CreateAccount")}
        </BazarButton>
      </form>

      <SocialButtons
        providers={providers}
        redirect="/login"
        redirectText={getTrans("login")}
      />
    </Wrapper>
  );

  function newFunction() {
    return "agreement";
  }
};

const initialValues = {
  name: "",
  email: "",
  password: "",
  re_password: "",
  phone: "",
  agreement: false,
};

export default Signup;
