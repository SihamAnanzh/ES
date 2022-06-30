import { Card } from "@mui/material";
import { styled } from "@mui/material/styles";
import BazarButton from "components/BazarButton";
import BazarTextField from "components/BazarTextField";
import { H3, Small } from "components/Typography";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";
import * as yup from "yup";
import EyeToggleButton from "./EyeToggleButton";
import SocialButtons from "./SocialButtons";
import { getSession, useSession, signIn } from "next-auth/react";

const fbStyle = {
  background: "#3B5998",
  color: "white",
};
const googleStyle = {
  background: "#4285F4",
  color: "white",
};
export const Wrapper = styled(({ children, passwordVisibility, ...rest }) => (
  <Card {...rest}>{children}</Card>
))(({ theme, passwordVisibility }) => ({
  width: 500,
  padding: "2rem 3rem",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
  ".passwordEye": {
    color: passwordVisibility
      ? theme.palette.grey[600]
      : theme.palette.grey[400],
  },
  ".facebookButton": {
    marginBottom: 10,
    ...fbStyle,
    "&:hover": fbStyle,
  },
  ".googleButton": { ...googleStyle, "&:hover": googleStyle },
  ".agreement": {
    marginTop: 12,
    marginBottom: 24,
  },
}));

const Login = ({ csrfToken }) => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const togglePasswordVisibility = useCallback(() => {
    setPasswordVisibility((visible) => !visible);
  }, []);
  const route = useRouter();
  const callbackUrl = route.query;
  const handleFormSubmit = async (values) => {
    route.push("/profile");
    // const res = await signIn("xpress-login-auth", {
    //   redirect: false,
    //   username: values.email,
    //   password: values.password,
    //   callbackUrl: route.query,
    //   deviceId: "123",
    // });
    // if (res?.error) {
    // } else {
    //   if (res.url) {
    //     route.push("/profile");
    //   }
    // }
  };
  const session = useSession();
  console.log(session);

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      onSubmit: handleFormSubmit,
      validationSchema: formSchema,
    });
  return (
    <Wrapper elevation={3} passwordVisibility={passwordVisibility}>
      <form
        method="post"
        action="/api/auth/callback/xpress-login-auth"
        onSubmit={async (e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <H3 textAlign="center" mb={1}>
          Welcome To Ecommerce
        </H3>
        <Small
          mb={4.5}
          display="block"
          fontSize="12px"
          fontWeight="600"
          color="grey.800"
          textAlign="center"
        >
          Log in with email & password
        </Small>
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />

        <BazarTextField
          id="email"
          mb={1.5}
          fullWidth
          name="email"
          size="small"
          type="email"
          variant="outlined"
          onBlur={handleBlur}
          value={values.email}
          onChange={handleChange}
          label="Email or Phone Number"
          placeholder="Phone Number"
          error={!!touched.email && !!errors.email}
          helperText={touched.email && errors.email}
        />

        <BazarTextField
          id="password"
          mb={2}
          fullWidth
          size="small"
          name="password"
          label="Password"
          autoComplete="on"
          variant="outlined"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.password}
          placeholder="*********"
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

        <BazarButton
          fullWidth
          type="submit"
          color="primary"
          variant="contained"
          sx={{
            mb: "1.65rem",
            height: 44,
          }}
        >
          login
        </BazarButton>
      </form>

      <SocialButtons redirect="/signup" redirectText="Sign Up" />
    </Wrapper>
  );
};

const initialValues = {
  email: "sihamananzh@outlook.sa",
  password: "123",
};
const formSchema = yup.object().shape({
  password: yup.string().required("Password is required"),
  email: yup.string().email("invalid email").required("Email is required"),
});
export default Login;
