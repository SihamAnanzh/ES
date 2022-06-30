import { FlexRowCenter } from "components/flex-box";
import Login from "pages-sections/sessions/Login";
import React from "react";
import { getCsrfToken, getSession, getProviders } from "next-auth/react";

const LoginPage = ({ csrfToken }) => {
  return (
    <FlexRowCenter flexDirection="column" minHeight="100vh">
      <Login csrfToken={csrfToken} />
    </FlexRowCenter>
  );
};

export default LoginPage;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const providers = await getProviders();

  return {
    props: {
      csrfToken: await getCsrfToken(context),
      providers: providers,
    },
  };
}
