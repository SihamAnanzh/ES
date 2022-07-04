import { Box, Divider } from "@mui/material";
import axios from "axios";
import BazarButton from "components/BazarButton";
import Image from "components/BazarImage";
import { FlexBox, FlexRowCenter } from "components/flex-box";
import { H6 } from "components/Typography";
import BackendManager from "globalManager/BackendManager";

import Link from "next/link";
import React, { Fragment } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSession, getSession, signIn, providers } from "next-auth/react";

const SocialButtons = (props) => {
  const { redirect = "/login", redirectText = "Login", providers } = props;

  return (
    <Fragment>
      <Box mb={2} mt={3.3}>
        <Box width="200px" mx="auto">
          <Divider />
        </Box>

        <FlexBox justifyContent="center" mt={-1.625}>
          <Box color="grey.600" bgcolor="background.paper" px={2}>
            or
          </Box>
        </FlexBox>
      </Box>
      {providers &&
        Object.values(providers)
          .filter((q) => q.type !== "credentials")
          .map(
            (provider) => (
              console.log(provider.id),
              (
                <BazarButton
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  key={provider.name}
                  className={
                    provider.name == "Facebook"
                      ? "facebookButton"
                      : "googleButton"
                  }
                  size="medium"
                  fullWidth
                  sx={{
                    mb: 2,
                    height: 44,
                  }}
                >
                  <Image
                    src={
                      provider.name == "Facebook"
                        ? "/assets/images/icons/facebook-filled-white.svg"
                        : "/assets/images/icons/google.svg"
                    }
                    alt="facebook"
                  />
                  <Box fontSize="12px" ml={1}>
                    Continue with
                    {provider.id == "facebook" && " Facebook"}
                    {provider.id == "google" && " Google"}
                  </Box>
                </BazarButton>
              )
            )
          )}

      <FlexRowCenter my="1.25rem">
        <Box>Don&apos;t have account?</Box>
        <Link href={redirect}>
          <a>
            <H6 ml={1} borderBottom="1px solid" borderColor="grey.900">
              {redirectText}
            </H6>
          </a>
        </Link>
      </FlexRowCenter>

      <FlexBox
        justifyContent="center"
        bgcolor="grey.200"
        borderRadius="4px"
        py={2.5}
      >
        Forgot your password?
        <Link href="/resetPassword">
          <a>
            <H6
              ml={1}
              borderBottom="1px solid"
              borderColor="grey.900"
              // onClick={async () => {
              //   alert(await BackendManager.resetPassword());
              // }}
            >
              Reset It
            </H6>
          </a>
        </Link>
      </FlexBox>
    </Fragment>
  );
};

export default SocialButtons;
