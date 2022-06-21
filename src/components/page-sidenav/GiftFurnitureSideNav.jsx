import { Box, styled } from "@mui/material";
import Accordion from "components/accordion/Accordion";
import AccordionHeader from "components/accordion/AccordionHeader";
import BazarCard from "components/BazarCard";
import { FlexBetween, FlexBox } from "components/flex-box";
import appIcons from "components/icons";
import NavLink from "components/nav-link/NavLink";
import Scrollbar from "components/Scrollbar";
import { H5, Span } from "components/Typography";
import React, { Fragment } from "react";
const NavbarRoot = styled(BazarCard)(({ theme }) => ({
  height: "auto",
  paddingBottom: 10,
  borderRadius: "8px",
  backgroundColor: theme.palette.primary[50],
  "& .linkList": {
    padding: "8px 20px",
    transition: "all 0.2s",
    "&:hover": {
      color: theme.palette.primary.main,
    },
  },
}));
const StyledList = styled(FlexBox)(({ theme }) => ({
  padding: "4px 20px",
  alignItems: "center",
  transition: "all 0.2s",
  "&:hover": {
    color: theme.palette.primary.main,
    "& .listCircle": {
      background: theme.palette.primary.main,
    },
  },
}));
const BorderBox = styled(FlexBetween)(({ theme }) => ({
  marginTop: 5,
  marginBottom: 15,
  borderBottom: "2px",
  borderStyle: "none none dashed none",
  borderColor: theme.palette.primary.main,
  "& span": {
    width: "100%",
  },
}));
const Circle = styled("span")(({ theme }) => ({
  width: "4px",
  height: "4px",
  marginLeft: "2rem",
  marginRight: "8px",
  borderRadius: "3px",
  backgroundColor: theme.palette.grey[600],
})); // ======================================================================

// ======================================================================
const GiftFurnitureSideNav = (props) => {
  const { navList, sidebarHeight } = props;

  const renderChild = (childList) => {
    return childList.map((item) => (
      <Fragment key={item.title}>
        <NavLink href={item.href} color="grey.700">
          <StyledList>
            <Circle className="listCircle" />
            <Span py={0.75} flex="1 1 0">
              {item.title}
            </Span>
          </StyledList>
        </NavLink>
      </Fragment>
    ));
  };

  return (
    <Scrollbar
      autoHide={false}
      style={{
        maxHeight: sidebarHeight,
      }}
    >
      <NavbarRoot>
        {navList.map((item, ind) => {
          return (
            <Box key={ind}>
              <Box padding="20px 20px 5px 20px">
                <H5>{item.category}</H5>
                <BorderBox />
              </Box>

              {item.categoryItem.map((item, ind) => {
                const Icon = appIcons[item.icon];
                return (
                  <Box mb="2px" color="grey.700" key={ind}>
                    {item.child ? (
                      <Accordion>
                        <AccordionHeader py={0.75} className="linkList">
                          <FlexBox gap={1.2} alignItems="center">
                            <Icon fontSize="small" />
                            <Span fontWeight={600}>{item.title}</Span>
                          </FlexBox>
                        </AccordionHeader>

                        {item.child && renderChild(item.child)}
                      </Accordion>
                    ) : (
                      <NavLink href={item.href} color="grey.700">
                        <FlexBox
                          gap={1.2}
                          py={0.75}
                          color="inherit"
                          key={item.title}
                          className="linkList"
                        >
                          <Icon fontSize="small" />

                          <Span fontWeight={600}>{item.title}</Span>
                        </FlexBox>
                      </NavLink>
                    )}
                  </Box>
                );
              })}
            </Box>
          );
        })}
      </NavbarRoot>
    </Scrollbar>
  );
};

export default GiftFurnitureSideNav;
