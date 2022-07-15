import { Box, Container, Grid, styled } from "@mui/material";
import AppStore from "components/AppStore";
import BazarIconButton from "components/BazarIconButton";
import Image from "components/BazarImage";
import { FlexBox } from "components/flex-box";
import Facebook from "components/icons/Facebook";
import Google from "components/icons/Google";
import Instagram from "components/icons/Instagram";
import Twitter from "components/icons/Twitter";
import Youtube from "components/icons/Youtube";
import { Paragraph } from "components/Typography";
import Link from "next/link";
import React, { useState } from "react"; // styled component
import { useTranslation } from "next-i18next";
import { WhatsApp, WhatsappSharp } from "@mui/icons-material";
import { useEffect } from "react";
import BackendManager from "globalManager/BackendManager";
import { Span } from "components/Typography";

const StyledLink = styled("a")(({ theme }) => ({
  position: "relative",
  display: "block",
  padding: "0.3rem 0rem",
  color: theme.palette.grey[500],
  cursor: "pointer",
  borderRadius: 4,
  "&:hover": {
    color: theme.palette.grey[100],
  },
}));

const Footer = () => {
  let { t, i18n } = useTranslation();
  const [whatsapp, setWhatsapp] = useState("");
  const getTrans = (key) => {
    return t(`common:${key}`);
  };

  const aboutLinks = [getTrans("Terms&Conditions"), getTrans("PrivacyPolicy")];
  useEffect(() => {
    getwhatsapp();
  }, []);
  const getwhatsapp = async () => {
    let res = await BackendManager.getWhatsappNumber();
    setWhatsapp(res);
  };

  return (
    <footer>
      <Box bgcolor="#A8123E">
        <Container
          sx={{
            p: "1rem",
            color: "white",
          }}
        >
          <Box py={10} overflow="hidden">
            <Grid container spacing={3}>
              <Grid item lg={4} md={6} sm={6} xs={12}>
                <Link href="/">
                  <a>
                    <Image
                      width="200px"
                      src="/assets/images/logoFooter.svg"
                      alt="logo"
                      mb={3.5}
                      sx={{
                        margin: "0",
                        padding: "20",
                        width: "220px",
                        marginBottom: "20px",
                      }}
                    />
                  </a>
                </Link>

                <AppStore />
              </Grid>

              <Grid item lg={2} md={6} sm={6} xs={12}>
                <Box
                  fontSize="25px"
                  fontWeight="600"
                  mb={2.5}
                  lineHeight="1"
                  color="#fff"
                >
                  {getTrans("AboutUs")}
                </Box>

                <div>
                  {aboutLinks.map((item, ind) => (
                    <Link href="/" key={ind} passHref>
                      <StyledLink>{item}</StyledLink>
                    </Link>
                  ))}
                </div>
              </Grid>

              <Grid item lg={3} md={6} sm={6} xs={12}>
                <Box
                  fontSize="25px"
                  fontWeight="600"
                  mb={2.5}
                  lineHeight="1"
                  color="#fff"
                >
                  {getTrans("ContactUs")}
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "flex-start",
                    width: "150px",
                  }}
                  mb={2}
                  color="grey.500"
                >
                  {/* {getTrans("instagram")}:{" "} */}
                  <Instagram fontSize="small" />
                  <a
                    href="https://www.instagram.com/xprestoreskw/?igshid=YmMyMTA2M2Y="
                    target="_balank"
                  >
                    xprestoreskw
                  </a>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "flex-start",
                    width: "150px",
                  }}
                  color="grey.500"
                >
                  <WhatsApp />
                  <Span color="#fff" className="title">
                    <a href={`https://api.whatsapp.com/send?phone=${whatsapp}`}>
                      {whatsapp}
                    </a>{" "}
                  </Span>
                </Box>

                {/* <FlexBox className="flex" mx={-0.625}>
                  {iconList.map((item, ind) => (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer noopenner"
                      key={ind}
                    >
                      <BazarIconButton
                        m={0.5}
                        bgcolor="rgba(0,0,0,0.2)"
                        fontSize="12px"
                        padding="10px"
                      >
                        <item.icon fontSize="inherit" />
                      </BazarIconButton>
                    </a>
                  ))}
                </FlexBox> */}
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </footer>
  );
};

const iconList = [
  {
    icon: WhatsApp,
    url: "/",
  },

  {
    icon: Instagram,
    url: "https://www.instagram.com/uilibofficial/",
  },
];
export default Footer;
