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
import { useRouter } from "next/router";
import { Instagram, WhatsApp } from "@mui/icons-material";
import { useAppContext } from "contexts/AppContext";
import { useTranslation } from "next-i18next";

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
    title: "",
    imgUrl: "",
  });
  const [language, setLanguage] = useState(languageList[0]);
  const [countryList, setCountrylist] = useState([]);
  const [logOut, setLogOut] = useState(false);
  const { state, dispatch } = useAppContext();
  const [phonNumber, setPhoneNumber] = useState("");
  let { t, i18n } = useTranslation();

  const route = useRouter();
  const handleCountryClick = (curr, id) => () => {
    setCountry(curr);
    setCookie("countryId", id);
    route.push(route.asPath, route.asPath, { locale: route.locale });
  };

  const session = useSession();

  const handleCartAmountChange = (product, amount) => {
    dispatch({
      type: "CHANGE_CART_AMOUNT",
      payload: { ...product, qty: amount },
    });
  };

  const handleLanguageClick = (lang) => () => {
    setLanguage(lang);
    route.push(route.asPath, route.asPath, { locale: route.locale });
  };

  const getTrans = (key) => {
    return t(`common:${key}`);
  };

  const getCountry = async () => {
    const country = await BackendManager.getCountryList(route.locale);

    setCountrylist(country);
  };

  useEffect(() => {
    getwhatsapp();
    getCountry();

    let id = getCookie("countryId");
    if (id) {
      BackendManager.getCountryById(getCookie("countryId"), route.locale).then(
        (res) => {
          setCountry(res);
        }
      );
    } else {
      let initCountry = BackendManager.getCountryById(1, route.locale).then(
        (res) => {
          setCountry(res);
        }
      );
    }

    let items = JSON.parse(localStorage.getItem("cart"));
    items &&
      items.map(async (data) => {
        let res = await BackendManager.getItemById(data.id, route.locale);

        let product = {
          name: res.title,
          qty: data.qty,
          price: res.price,
          imgUrl: res.category.logo_url,
          id: res.id,
          mainId: data.mainId,
          currency: res.currency.id,
        };
        dispatch({
          type: "CHANGE_CART_AMOUNT",
          payload: { ...product, qty: data.qty },
        });
      });
  }, []);

  const getwhatsapp = async () => {
    let res = await BackendManager.getWhatsappNumber();
    setPhoneNumber(res);
  };

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
          <div className="logo hideLogo">
            <Link href="/" passHref>
              <Image
                width={138}
                display="block"
                height="28px"
                src="/assets/images/logoPhone.svg"
                alt="logo"
              />
            </Link>
          </div>
          <div className="logo showLogo">
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
            <WhatsApp fontSize="small" />
            <Span color="#fff" className="title">
              <a href={`https://api.whatsapp.com/send?phone=${phonNumber}`}>
                {phonNumber}
              </a>{" "}
            </Span>
          </FlexBox>
          <FlexBox alignItems="center" ml={2.5}>
            <Instagram fontSize="small" />
            <Span color="#fff" className="title">
              <a
                href="https://www.instagram.com/xprestoreskw/?igshid=YmMyMTA2M2Y="
                target="_balank"
              >
                xprestoreskw
              </a>
            </Span>
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
                  <Span className="menuTitle">{getTrans("logout")}</Span>
                </TouchRipple>
              }
            ></BazarMenu>
          )}
          <BazarMenu
            handler={
              <TouchRipple className="handler marginRight">
                <Span className="menuTitle">
                  {route.locale != "ar" ? "EN" : "AR"}{" "}
                </Span>
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
                <a
                  href={item.title != "AR" ? "/en" : "/ar"}
                  className="menuTitle"
                >
                  {item.title}
                </a>
              </MenuItem>
            ))}
          </BazarMenu>

          <BazarMenu
            direction="right"
            handler={
              <TouchRipple className="handler">
                <Span
                  className="menuTitle"
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {" "}
                  <img
                    style={{
                      objectFit: "contain",
                      width: "20px",
                      height: "20px",
                      marginRight: "10px",
                    }}
                    src={country.logo_url}
                    alt=""
                  />
                  {country.title}{" "}
                </Span>
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
                <Span
                  className="menuTitle"
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <img
                    style={{
                      objectFit: "contain",
                      width: "20px",
                      height: "20px",
                      marginRight: "10px",
                    }}
                    src={item.logo_url}
                    alt=""
                  />
                  {item.title}{" "}
                </Span>
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
    title: "AR",
    imgUrl: "/assets/images/flags/in.png",
  },
];

export default Topbar;
