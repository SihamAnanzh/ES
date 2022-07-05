import CallOutlined from "@mui/icons-material/CallOutlined";
import ExpandMore from "@mui/icons-material/ExpandMore";
import MailOutline from "@mui/icons-material/MailOutline";
import { Container, MenuItem } from "@mui/material";
import TouchRipple from "@mui/material/ButtonBase";
import { styled } from "@mui/material/styles";
import Image from "components/BazarImage";
import BazarMenu from "components/BazarMenu";
import { FlexBox } from "components/flex-box";
import NavLink from "components/nav-link/NavLink";
import { Span } from "components/Typography";
import { getCookie, setCookie, setCookies } from "cookies-next";
import BackendManager from "../../../src/globalManager/BackendManager";
import { signOut, useSession } from "next-auth/react";
import { getCookieParser } from "next/dist/server/api-utils";
import Link from "next/link";
import { title } from "process";
import React, { useEffect, useState } from "react";
import { layoutConstant } from "utils/constants";

const TopbarWrapper = styled("div")(({ theme }) => ({
  background: theme.palette.secondary.main,
  color: theme.palette.secondary.contrastText,
  height: layoutConstant.topbarHeight,
  fontSize: 12,
  "& .topbarLeft": {
    "& .logo": {
      display: "none",
    },
    "& .title": {
      marginLeft: "10px",
    },
    "@media only screen and (max-width: 900px)": {
      "& .logo": {
        display: "block",
      },
      "& > *:not(.logo)": {
        display: "none",
      },
    },
  },
  "& .topbarRight": {
    "& .link": {
      paddingRight: 30,
      color: theme.palette.secondary.contrastText,
    },
    "@media only screen and (max-width: 900px)": {
      "& .link": {
        display: "none",
      },
    },
  },
  "& .smallRoundedImage": {
    height: 15,
    width: 25,
    borderRadius: 2,
  },
  "& .handler": {
    height: layoutConstant.topbarHeight,
  },
  "& .menuTitle": {
    fontSize: 12,
    marginLeft: "0.5rem",
    fontWeight: 600,
  },
  "& .menuItem": {
    minWidth: 100,
  },
  "& .marginRight": {
    marginRight: "1.25rem",
  },
}));

const Topbar = () => {
  const [country, setCountry] = useState({
    title: setCookie("country"),
    imgUrl: "",
  });
  const [language, setLanguage] = useState(languageList[0]);
  const [countryList, setCountrylist] = useState([]);
  const [logOut, setLogOut] = useState(false);

  const handleCountryClick = (curr, id) => () => {
    setCountry(curr);
    setCookie("countryId", id);
    window.location.reload();
  };

  useEffect(() => {
    let id = getCookie("countryId");
    console.log(getCookie("countryId"));
    BackendManager.getCountryById(getCookie("countryId")).then((res) => {
      console.log(res);
      setCountry(res);
    });
  }, []);
  const session = useSession();

  const handleLanguageClick = (lang) => () => {
    setLanguage(lang);
  };

  const getCountry = async () => {
    const country = await BackendManager.getCountryList();
    setCountrylist(country);
  };
  useEffect(() => {
    getCountry();
  }, []);
  useEffect(() => {
    setLogOut(!!session.data ? true : false);
  }, [session]);
  return (
    <TopbarWrapper>
      <Container
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "100%",
        }}
      >
        <FlexBox className="topbarLeft" alignItems="center">
          <div className="logo">
            <Link href="/" passHref>
              <Image
                display="block"
                height="28px"
                src="/assets/images/logo.png"
                alt="logo"
              />
            </Link>
          </div>

          <FlexBox alignItems="center">
            <CallOutlined fontSize="small" />
            <Span className="title">+88012 3456 7894</Span>
          </FlexBox>
          <FlexBox alignItems="center" ml={2.5}>
            <MailOutline fontSize="small" />
            <Span className="title">support@ui-lib.com</Span>
          </FlexBox>
        </FlexBox>

        <FlexBox className="topbarRight" alignItems="center">
          {/* <NavLink className="link" href="/help">
            Need Help?
          </NavLink> */}
          {logOut && (
            <BazarMenu
              handler={
                <TouchRipple className="handler marginRight" onClick={signOut}>
                  <Span className="menuTitle">logout</Span>
                </TouchRipple>
              }
            ></BazarMenu>
          )}
          <BazarMenu
            handler={
              <TouchRipple className="handler marginRight">
                <Span className="menuTitle">{language.title} </Span>
                <ExpandMore fontSize="inherit" />
              </TouchRipple>
            }
          >
            {languageList.map((item) => (
              <MenuItem
                className="menuItem"
                key={item.title}
                onClick={handleLanguageClick(item)}
              >
                <Span className="menuTitle">{item.title}</Span>
              </MenuItem>
            ))}
          </BazarMenu>

          <BazarMenu
            direction="right"
            handler={
              <TouchRipple className="handler">
                <Span className="menuTitle">{country && country.title}</Span>
                <ExpandMore fontSize="inherit" />
              </TouchRipple>
            }
          >
            {countryList.map((item) => (
              <MenuItem
                className="menuItem"
                key={item.title}
                onClick={handleCountryClick(item, item.id)}
              >
                <Span className="menuTitle">{item.title}</Span>
              </MenuItem>
            ))}
          </BazarMenu>
        </FlexBox>
      </Container>
    </TopbarWrapper>
  );
};

const languageList = [
  {
    title: "EN",
    imgUrl: "/assets/images/flags/usa.png",
  },

  {
    title: "Ar",
    imgUrl: "/assets/images/flags/in.png",
  },
];

export default Topbar;
