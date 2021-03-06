import { CreditCard, FavoriteBorder, Person, Place } from "@mui/icons-material";
import ShoppingBagOutlined from "@mui/icons-material/ShoppingBagOutlined";
import { Typography } from "@mui/material";
import { FlexBox } from "components/flex-box";
import CustomerService from "components/icons/CustomerService";
import {
  DashboardNavigationWrapper,
  StyledDashboardNav,
} from "components/layouts/DashboardStyle";
import { useRouter } from "next/router";
import React, { Fragment } from "react";
import { useTranslation } from "next-i18next";

const Navigations = () => {
  const { t } = useTranslation();

  const getTrans = (key) => {
    return t(`common:${key}`);
  };

  const linkList = [
    {
      title: getTrans("DASHBOARD"),
      list: [
        {
          href: "/profile",
          title: getTrans("ProfileInfo"),
          icon: Person,
        },
        {
          href: "/orders",
          title: getTrans("Orders"),
          icon: ShoppingBagOutlined,
        },
        {
          href: "/quickPay",
          title: getTrans("QuickPay"),
          icon: ShoppingBagOutlined,
        },
      ],
    },
  ];

  const { pathname } = useRouter();
  return (
    <DashboardNavigationWrapper
      sx={{
        px: "0px",
        pb: "1.5rem",
        color: "grey.900",
      }}
    >
      {linkList.map((item) => (
        <Fragment key={item.title}>
          <Typography p="26px 30px 1rem" color="grey.600" fontSize="12px">
            {item.title}
          </Typography>

          {item.list.map((item) => (
            <StyledDashboardNav
              href={item.href}
              key={item.title}
              isCurrentPath={pathname.includes(item.href)}
            >
              <FlexBox alignItems="center">
                <item.icon
                  color="inherit"
                  fontSize="small"
                  className="nav-icon"
                  sx={{
                    mr: "10px",
                  }}
                />

                <span>{item.title}</span>
              </FlexBox>
              <span>{item.count}</span>
            </StyledDashboardNav>
          ))}
        </Fragment>
      ))}
    </DashboardNavigationWrapper>
  );
};

export default Navigations;
