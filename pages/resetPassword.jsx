import { Card } from "@mui/material";
import { styled } from "@mui/material/styles";
import BazarButton from "components/BazarButton";
import BazarTextField from "components/BazarTextField";
import { H3, Small } from "components/Typography";
import React, { useCallback, useState } from "react";
import { useSession, getSession, getProviders } from "next-auth/react";
import BackendManager from "../src/globalManager/BackendManager";
import { useRouter } from "next/router";

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

const resetPassword = () => {
  const [email, setEmail] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const route = useRouter();
  const togglePasswordVisibility = useCallback(() => {
    setPasswordVisibility((visible) => !visible);
  }, []);
  const session = useSession();

  return (
    <div
      className=""
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Wrapper elevation={3} passwordVisibility={passwordVisibility}>
        <form>
          <H3 textAlign="center" mb={1}>
            Welcome To Xpress Stors
          </H3>
          <Small
            mb={4.5}
            display="block"
            fontSize="12px"
            fontWeight="600"
            color="grey.800"
            textAlign="center"
          >
            Enter your email
          </Small>

          <BazarTextField
            id="email"
            mb={1.5}
            fullWidth
            name="email"
            size="small"
            type="email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <BazarButton
            onClick={async () => {
              email != ""
                ? await BackendManager.resetPassword(email).then((res) => {
                    alert(res);
                    route.push("/");
                  })
                : alert("invalid email");
            }}
            fullWidth
            color="primary"
            variant="contained"
            sx={{
              mb: "1.65rem",
              height: 44,
            }}
          >
            Reset
          </BazarButton>
        </form>
      </Wrapper>
    </div>
  );
};

export default resetPassword;
