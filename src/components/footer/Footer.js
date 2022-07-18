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
import {
  Phone,
  PhoneAndroid,
  StoreSharp,
  WhatsApp,
  WhatsappSharp,
} from "@mui/icons-material";
import { useEffect } from "react";
import BackendManager from "globalManager/BackendManager";
import { Span } from "components/Typography";
import { MobileDatePicker } from "@mui/lab";

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
    <footer bgcolor="#A8123E">
      <Box bgcolor="#A8123E">
        <Container
          sx={{
            p: "1rem",
            color: "white",
          }}
        >
          <div className="footer-contanier">
            <div className="logo">
              <a>
                <Image
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
            </div>
            <div className="aboutus">
              <h1>{getTrans("AboutUs")}</h1>
              <div className="items">{getTrans("PrivacyPolicy")}</div>
              <div className="items">{getTrans("Terms&Conditions")}</div>
            </div>
            <div className="contactus">
              <h1>{getTrans("ContacttUs")}</h1>
              <div className="items itemContact">
                {" "}
                <Instagram fontSize="small" className="whatIcon" />
                <a
                  href="https://www.instagram.com/xprestoreskw/?igshid=YmMyMTA2M2Y="
                  target="_balank"
                >
                  xprestoreskw
                </a>
              </div>
              <div className="items itemContact">
                {" "}
                <WhatsApp className="whatIcon" />
                <Span color="#fff" className="title">
                  <a href={`https://api.whatsapp.com/send?phone=${whatsapp}`}>
                    {whatsapp}
                  </a>{" "}
                </Span>
              </div>
            </div>
            <div className="footerLInks imgLink">
              <div className="twoImg items">
                <img width={120} src="/assets/images/stors.png" alt="" />
                <img width={120} src="/assets/images/stors.png" alt="" />
              </div>
              <img
                width={120}
                src="/assets/images/stors.png"
                alt=""
                className="items"
              />
            </div>
          </div>
        </Container>
      </Box>
    </footer>
  );
};

export default Footer;
