import { FlexRowCenter } from "components/flex-box";
import Signup from "pages-sections/sessions/Signup";
import React from "react";
import { getSession, getProviders, getCsrfToken } from "next-auth/react";

const SignUpPage = ({ providers }) => {
  console.log(providers);
  return (
    <FlexRowCenter flexDirection="column" minHeight="100vh">
      <Signup providers={providers} />
    </FlexRowCenter>
  );
};

export default SignUpPage;
export async function getServerSideProps(context) {
  const session = await getSession(context);
  const providers = await getProviders();
  console.log(providers);
  return {
    props: {
      csrfToken: await getCsrfToken(context),
      providers: providers,
    },
  };
}
