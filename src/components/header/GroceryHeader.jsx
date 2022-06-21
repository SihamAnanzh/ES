/* eslint-disable @next/next/no-img-element */
import { KeyboardArrowDown, PersonOutline } from "@mui/icons-material";
import { Badge, Box, Container, Dialog, Drawer, useTheme } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import useMediaQuery from "@mui/material/useMediaQuery";
import BazarButton from "components/BazarButton";
import CategoryMenu from "components/categories/CategoryMenu";
import { FlexBox } from "components/flex-box";
import Category from "components/icons/Category";
import ShoppingBagOutlined from "components/icons/ShoppingBagOutlined";
import MiniCart from "components/mini-cart/MiniCart";
import GrocerySearchBox from "components/search-box/GrocerySearchBox";
import { useAppContext } from "contexts/AppContext";
import Link from "next/link";
import Login from "pages-sections/sessions/Login";
import React, { useState } from "react";
import { HeaderWrapper } from "./Header"; // =====================================================================

// =====================================================================
const GroceryHeader = ({ isFixed }) => {
  const theme = useTheme();
  const { state } = useAppContext();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [sidenavOpen, setSidenavOpen] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  const toggleSidenav = () => setSidenavOpen(!sidenavOpen);

  const toggleDialog = () => setDialogOpen(!dialogOpen);

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
    <HeaderWrapper>
      <Container
        sx={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <FlexBox
          sx={{
            mr: "1rem",
            minWidth: "170px",
            alignItems: "center",
            display: {
              xs: "none",
              md: "flex",
            },
          }}
        >
          <Link href="/">
            <a>
              <img src="/assets/images/logo2.svg" alt="logo" />
            </a>
          </Link>

          <Box
            sx={{
              visibility: isFixed ? "visible" : "hidden",
            }}
          >
            <CategoryMenu>
              <FlexBox color="grey.600" alignItems="center" ml={2}>
                <BazarButton color="inherit">
                  <Category fontSize="small" color="inherit" />
                  <KeyboardArrowDown fontSize="small" color="inherit" />
                </BazarButton>
              </FlexBox>
            </CategoryMenu>
          </Box>
        </FlexBox>

        <FlexBox justifyContent="center" flex="1 1 0">
          <GrocerySearchBox />
        </FlexBox>

        <FlexBox
          sx={{
            alignItems: "center",
            display: {
              xs: "none",
              md: "flex",
            },
          }}
        >
          <Box
            component={IconButton}
            ml={2}
            p={1.25}
            bgcolor="grey.200"
            onClick={toggleDialog}
          >
            <PersonOutline />
          </Box>
          {cartHandle}
        </FlexBox>

        <Dialog
          open={dialogOpen}
          fullWidth={isMobile}
          scroll="body"
          onClose={toggleDialog}
        >
          <Login />
        </Dialog>

        <Drawer
          anchor="right"
          open={sidenavOpen}
          onClose={toggleSidenav}
          SlideProps={{
            style: {
              overflow: "hidden",
            },
          }}
        >
          <MiniCart toggleSidenav={toggleSidenav} />
        </Drawer>
      </Container>
    </HeaderWrapper>
  );
};

export default GroceryHeader;
