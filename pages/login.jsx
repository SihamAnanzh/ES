import { FlexRowCenter } from "components/flex-box";
import Login from "pages-sections/sessions/Login";
import React from "react";
import {
  getCsrfToken,
  getSession,
  getProviders,
  providers,
} from "next-auth/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const LoginPage = ({ csrfToken, providers }) => {
  return (
    <FlexRowCenter flexDirection="column" minHeight="100vh">
      <Login csrfToken={csrfToken} providers={providers} />
    </FlexRowCenter>
  );
};

export default LoginPage;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const { locale } = context;

  if (session) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }
  const providers = await getProviders();
  return {
    props: {
      csrfToken: await getCsrfToken(context),
      providers: providers,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
