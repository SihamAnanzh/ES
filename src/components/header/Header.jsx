import { KeyboardArrowDown, PersonOutline } from "@mui/icons-material";
import { Badge, Box, Dialog, Drawer, styled } from "@mui/material";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import clsx from "clsx";
import BazarButton from "components/BazarButton";
import Image from "components/BazarImage";
import CategoryMenu from "components/categories/CategoryMenu";
import { FlexBox } from "components/flex-box";
import Category from "components/icons/Category";
import ShoppingBagOutlined from "components/icons/ShoppingBagOutlined";
import MiniCart from "components/mini-cart/MiniCart";
import { useAppContext } from "contexts/AppContext";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import Login from "pages-sections/sessions/Login";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { layoutConstant } from "utils/constants";
import SearchBox from "../search-box/SearchBox"; // styled component

export const HeaderWrapper = styled(Box)(({ theme }) => ({
  zIndex: 3,
  position: "relative",
  height: layoutConstant.headerHeight,
  transition: "height 250ms ease-in-out",
  background: theme.palette.background.paper,
  [theme.breakpoints.down("sm")]: {
    height: layoutConstant.mobileHeaderHeight,
  },
})); // ==============================================================

// ==============================================================
const Header = ({ isFixed, className, csrfToken, providers, list }) => {
  const theme = useTheme();
  const { state } = useAppContext();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [sidenavOpen, setSidenavOpen] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const session = useSession();
  const route = useRouter();

  const toggleDialog = () => {
    //check if there is a session
    if (!session.data) {
      setDialogOpen(true);
    } else {
      route.push("/profile", "/profile", { locale: route.locale });
    }
  };
  const loginRef = useRef();

  const toggleSidenav = () => setSidenavOpen(!sidenavOpen);

  const cartHandle = (
    <Badge badgeContent={state.cart.length} color="primary">
      <Box
        component={IconButton}
        ml={2.5}
        bgcolor="grey.200"
        p={1.25}
        onClick={toggleSidenav}
      >
        <ShoppingBagOutlined />
      </Box>
    </Badge>
  );
  return (
    <HeaderWrapper className={clsx(className)}>
      <Container
        sx={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <FlexBox
          mr={2}
          alignItems="center"
          sx={{
            display: {
              xs: "none",
              md: "flex",
            },
          }}
        >
          <Link href="/">
            <a>
              <Image
                sx={{
                  margin: "20px",
                  marginTop: "30px",
                }}
                height={50}
                mb={0.5}
                src="/assets/images/logo.svg"
                alt="logo"
              />
            </a>
          </Link>

          {/* {isFixed && (
            <CategoryMenu>
              <FlexBox color="grey.600" alignItems="center" ml={2}>
                <BazarButton color="inherit">
                  <Category fontSize="small" color="inherit" />
                  <KeyboardArrowDown fontSize="small" color="inherit" />
                </BazarButton>
              </FlexBox>
            </CategoryMenu>
          )} */}
        </FlexBox>

        <FlexBox justifyContent="center" flex="1 1 0">
          <SearchBox list={list} />
        </FlexBox>

        <FlexBox
          alignItems="center"
          gap={2}
          sx={{
            display: {
              xs: "none",
              md: "flex",
            },
          }}
        >
          <Box
            component={IconButton}
            p={1.25}
            bgcolor="grey.200"
            onClick={toggleDialog}
          >
            <PersonOutline />
          </Box>

          {cartHandle}
        </FlexBox>

        <Dialog
          ref={loginRef}
          open={dialogOpen}
          fullWidth={isMobile}
          scroll="body"
          onClose={toggleDialog}
        >
          <Login
            dialogOpen={dialogOpen}
            setDialogOpen={setDialogOpen}
            providers={providers}
            csrfToken={csrfToken}
          />
        </Dialog>

        <Drawer open={sidenavOpen} anchor="right" onClose={toggleSidenav}>
          <MiniCart />
        </Drawer>
      </Container>
    </HeaderWrapper>
  );
};

export default Header;
