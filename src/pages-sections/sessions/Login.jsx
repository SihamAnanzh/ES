import { Card } from "@mui/material";
import { styled } from "@mui/material/styles";
import BazarButton from "components/BazarButton";
import BazarTextField from "components/BazarTextField";
import { H3, Small } from "components/Typography";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import * as yup from "yup";
import EyeToggleButton from "./EyeToggleButton";
import SocialButtons from "./SocialButtons";
import { useSession, getSession, signIn, providers } from "next-auth/react";
import { toast, ToastContainer } from "react-toastify";
import { useTranslation } from "next-i18next";
import { CloseOutlined, CollectionsBookmarkRounded } from "@mui/icons-material";
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

const Login = ({ csrfToken, providers, setDialogOpen, dialogOpen }) => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const togglePasswordVisibility = useCallback(() => {
    setPasswordVisibility((visible) => !visible);
  }, []);

  const route = useRouter();

  const { t } = useTranslation();
  const { callbackurl } = route.query;
  const handleFormSubmit = async (values) => {
    const res = await signIn("xpress-login-auth", {
      redirect: false,
      username: values.email,
      password: values.password,
      callbackUrl: callbackurl,
    });
    if (res?.error) {
      toast.warn(getTrans("wrongemailorpassword"), {
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
      console.log("ress", res);
      toast.success(getTrans("Loggedin") + "...", {
        position: "top-center",
        autoClose: 5005,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      if (callbackurl)
        route.push(callbackurl, callbackurl, { locale: route.locale });
      else route.push("/profile", { locale: route.locale });
    }
  };

  const session = useSession();
  const getTrans = (key) => {
    return t(`common:${key}`);
  };
  const formSchema = yup.object().shape({
    password: yup.string().required(getTrans("Passwordisrequired")),
    email: yup
      .string()
      .email(getTrans("invalidemail"))
      .required(getTrans("Emailisrequired")),
  });
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      onSubmit: handleFormSubmit,
      validationSchema: formSchema,
    });

  return (
    <div>
      <ToastContainer />
      <Wrapper elevation={3} passwordVisibility={passwordVisibility}>
        <CloseOutlined
          onClick={() => setDialogOpen(false)}
          sx={{ cursor: "pointer" }}
        />
        <form
          method="post"
          action="/api/auth/callback/xpress-login-auth"
          onSubmit={async (e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <H3 textAlign="center" mb={1}>
            {getTrans("WelcomeToXpressStors")}
          </H3>
          <Small
            mb={4.5}
            display="block"
            fontSize="12px"
            fontWeight="600"
            color="grey.800"
            textAlign="center"
          >
            {getTrans("Loginwithemail&password")}
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
            label={getTrans("Email")}
            placeholder={getTrans("Email")}
            error={!!touched.email && !!errors.email}
            helperText={touched.email && errors.email}
          />

          <BazarTextField
            id="password"
            mb={2}
            fullWidth
            size="small"
            name="password"
            label={getTrans("Password")}
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
              color: "#fff",
            }}
          >
            {getTrans("login")}
          </BazarButton>
        </form>

        <SocialButtons
          t={t}
          sx={{
            mb: "2.65rem",
          }}
          providers={providers}
          redirect="/signup"
          redirectText={getTrans("SignUp")}
        />
      </Wrapper>
    </div>
  );
};

export default Login;
const initialValues = {
  email: "",
  password: "",
};
