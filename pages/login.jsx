import { FlexRowCenter } from "components/flex-box";
import Login from "pages-sections/sessions/Login";
import React from "react";
import {
  getCsrfToken,
  getSession,
  getProviders,
  providers,
} from "next-auth/react";

const LoginPage = ({ csrfToken, providers }) => {
  console.log(providers);
  return (
    <FlexRowCenter flexDirection="column" minHeight="100vh">
      <Login csrfToken={csrfToken} providers={providers} />
    </FlexRowCenter>
  );
};

export default LoginPage;

export async function getServerSideProps(context) {
  const providers = await getProviders();
  return {
    props: {
      csrfToken: await getCsrfToken(context),
      providers: providers,
    },
  };
}
