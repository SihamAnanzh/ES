import ChevronRight from "@mui/icons-material/ChevronRight";
import { Box, Container, styled } from "@mui/material";
import BazarButton from "components/BazarButton";
import BazarCard from "components/BazarCard";
import CategoryMenu from "components/categories/CategoryMenu";
import { FlexBox } from "components/flex-box";
import Category from "components/icons/Category";
import NavLink from "components/nav-link/NavLink";
import { H6, Paragraph } from "components/Typography";
import navbarNavigations, { megaMenus } from "data/navbarNavigations";
import React from "react";
import MegaMenu from "./MegaMenu"; // =================================================================================

// =================================================================================
// style components
const NavItem = styled(Box)(({ theme }) => ({
  cursor: "pointer",
  marginRight: "2rem",
  transition: "color 150ms ease-in-out",
  "&:last-child": {
    marginRight: 0,
  },
  "&:hover": {
    color: theme.palette.primary.main,
  },
}));
const NavBarWrapper = styled(BazarCard)(({ theme }) => ({
  height: "60px",
  borderRadius: 0,
  display: "block",
  position: "relative",
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));
const InnerContainer = styled(Container)(() => ({
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}));
const CategoryMenuButton = styled(BazarButton)(({ theme }) => ({
  width: "278px",
  height: "40px",
  paddingLeft: "1rem",
  paddingRight: "1rem",
  backgroundColor: theme.palette.grey[100],
}));
const ChildNavsWrapper = styled(Box)(() => ({
  left: 0,
  zIndex: 5,
  top: "100%",
  display: "none",
  position: "absolute",
}));

const Navbar = ({ navListOpen, hideCategories }) => {
  const renderNestedNav = (list, isRoot = false) => {
    return list.map((nav) => {
      if (isRoot) {
        if (nav.url && nav.extLink) {
          return (
            <NavLink
              href={nav.url}
              key={nav.title}
              target="_blank"
              rel="noopener noreferrer"
            >
              {nav.title}
            </NavLink>
          );
        } // show megamenu

        if (nav.megaMenu)
          return (
            <MegaMenu key={nav.title} title={nav.title} menuList={megaMenus} />
          );

        if (nav.url) {
          return (
            <NavLink href={nav.url} key={nav.title}>
              {nav.title}
            </NavLink>
          );
        }

        if (nav.child) {
          return (
            <Box
              key={nav.title}
              position="relative"
              sx={{
                ":hover": {
                  "& > .child-nav": {
                    display: "block",
                  },
                },
              }}
            >
              <NavItem>{nav.title}</NavItem>

              <ChildNavsWrapper className="child-nav">
                <BazarCard
                  elevation={3}
                  sx={{
                    mt: 2.5,
                    py: 1,
                    minWidth: 200,
                  }}
                >
                  {renderNestedNav(nav.child)}
                </BazarCard>
              </ChildNavsWrapper>
            </Box>
          );
        }
      } else {
        if (nav.url)
          return (
            <NavLink
              href={nav.url}
              key={nav.title}
              style={{
                display: "block",
                padding: ".3rem 1rem",
              }}
            >
              {nav.title}
            </NavLink>
          );
        if (nav.child)
          return (
            <Box key={nav.title}>
              <H6 padding=".4rem 1rem">{nav.title}</H6>
              {renderNestedNav(nav.child)}
            </Box>
          );
      }
    });
  };

  return (
    <NavBarWrapper elevation={2} hoverEffect={false}>
      {!hideCategories ? (
        <InnerContainer>
          <CategoryMenu open={navListOpen}>
            <CategoryMenuButton variant="text">
              <Category fontSize="small" />

              <Paragraph
                fontWeight="600"
                textAlign="left"
                flex="1 1 0"
                ml={1.25}
                color="grey.600"
              >
                Categories
              </Paragraph>

              <ChevronRight className="dropdown-icon" fontSize="small" />
            </CategoryMenuButton>
          </CategoryMenu>

          <FlexBox>{renderNestedNav(navbarNavigations, true)}</FlexBox>
        </InnerContainer>
      ) : (
        <InnerContainer
          sx={{
            justifyContent: "flex-end",
          }}
        >
          <FlexBox>{renderNestedNav(navbarNavigations, true)}</FlexBox>
        </InnerContainer>
      )}
    </NavBarWrapper>
  );
};

export default Navbar;
