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

const Signup = ({ providers }) => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const togglePasswordVisibility = useCallback(() => {
    setPasswordVisibility((visible) => !visible);
  }, []);
  const handleFormSubmit = (values) => {
    console.log(values);
    axios
      .post(process.env.endPoint + "/user/register", {
        username: values.email,
        first_name: values.name,
        phone: values.phone,
        password: values.password,
      })
      .then(async (response) => {
        console.log(response);
        if (response && response.data.status.code === 200) {
          const res = await signIn("xp-login-auth", {
            redirect: false,
            username: values.email,
            password: values.password,
          });
          if (res?.error) {
            console.log(res);
          } else {
            route.push("/profile");
          }
        }
      });
  };
  const session = useSession();

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      onSubmit: handleFormSubmit,
      validationSchema: formSchema,
    });
  return (
    <Wrapper elevation={3} passwordVisibility={passwordVisibility}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <H3 textAlign="center" mb={1}>
          Create Your Account
        </H3>
        <Small
          mb={4.5}
          fontSize={12}
          display="block"
          fontWeight={600}
          color="grey.800"
          textAlign="center"
        >
          Please fill all fields to continue
        </Small>

        <BazarTextField
          mb={1.5}
          fullWidth
          name="name"
          size="small"
          label="Full Name"
          variant="outlined"
          onBlur={handleBlur}
          value={values.name}
          onChange={handleChange}
          placeholder="Ralph Adwards"
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
          label="Email "
          placeholder="email"
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
          label="Phone Number"
          placeholder="Phone Number"
          error={!!touched.Phone && !!errors.Phone}
          helperText={touched.Phone && errors.Phone}
        />

        <BazarTextField
          mb={1.5}
          fullWidth
          size="small"
          name="password"
          label="Password"
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
          label="Retype Password"
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
              By signing up, you agree to
              <a href="/" target="_blank" rel="noreferrer noopener">
                <H6 ml={1} borderBottom="1px solid" borderColor="grey.900">
                  Terms & Condtion
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
          }}
        >
          Create Account
        </BazarButton>
      </form>

      <SocialButtons
        providers={providers}
        redirect="/login"
        redirectText="Login"
      />
    </Wrapper>
  );
};

const initialValues = {
  name: "",
  email: "",
  password: "",
  re_password: "",
  phone: "",
  agreement: false,
};
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const formSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("invalid email").required("Email is required"),
  phone: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .min(10, "to short")
    .max(10, "to long")
    .required("Pone is required"),

  password: yup.string().required("Password is required"),
  re_password: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Please re-type password"),
  agreement: yup
    .bool()
    .test(
      "agreement",
      "You have to agree with our Terms and Conditions!",
      (value) => value === true
    )
    .required("You have to agree with our Terms and Conditions!"),
});
export default Signup;
