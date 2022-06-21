import { Settings, Close } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  styled,
  ClickAwayListener,
  Tooltip,
} from "@mui/material";
import useSettings from "hooks/useSettings";
import { useRouter } from "next/router";
import { useState } from "react";
import { FlexBox } from "./flex-box";
import { H6 } from "./Typography";
const StyledIconButton = styled(IconButton)(({ theme }) => ({
  right: 50,
  zIndex: 99,
  bottom: 50,
  color: "#fff",
  borderRadius: "50%",
  position: "fixed",
  backgroundColor: theme.palette.primary.main,
  ":hover": {
    backgroundColor: theme.palette.primary.main,
  },
  boxShadow: theme.shadows[12],
  padding: 12, //   "& svg": { animation: `${circle} 4s linear infinite` },
}));
const BodyWrapper = styled(Box)(({ theme, showBody }) => ({
  padding: 24,
  overflow: "auto",
  borderRadius: "4px",
  transition: "all 0.3s",
  backgroundColor: "white",
  opacity: showBody ? 1 : 0,
  width: showBody ? 300 : 0,
  maxHeight: "calc(100vh - 100px)",
  boxShadow: theme.shadows[3],
}));
const StyledAvatar = styled(Avatar)(() => ({
  flexGrow: 1,
  height: 100,
  width: "45%",
  borderRadius: "10px",
  cursor: "pointer",
  ":last-of-type": {
    flexGrow: 0,
  },
  ":hover": {
    "&::after": {
      opacity: 0.5,
    },
  },
  "::after": {
    opacity: 0,
    content: '""',
    width: "100%",
    height: "100%",
    position: "absolute",
    background: "black",
    transition: "all 0.3s",
  },
}));

const Setting = () => {
  const { push } = useRouter();
  const { updateSettings, settings } = useSettings();
  const [showBody, setShowBody] = useState(false);
  return (
    <ClickAwayListener onClickAway={() => setShowBody(false)}>
      <Box
        sx={{
          position: "fixed",
          right: 50,
          top: 50,
          zIndex: 1501,
        }}
      >
        <Tooltip title="Settings & Demos" placement="left">
          <StyledIconButton onClick={() => setShowBody((state) => !state)}>
            {!showBody && <Settings />}
            {showBody && <Close />}
          </StyledIconButton>
        </Tooltip>
        <BodyWrapper showBody={showBody ? 1 : 0}>
          <FlexBox gap={2}>
            <Button
              variant={settings.direction === "rtl" ? "contained" : "outlined"}
              color={settings.direction === "rtl" ? "primary" : "secondary"}
              fullWidth
              onClick={() =>
                updateSettings({
                  direction: "rtl",
                })
              }
            >
              RTL
            </Button>

            <Button
              variant={settings.direction === "ltr" ? "contained" : "outlined"}
              color={settings.direction === "ltr" ? "primary" : "secondary"}
              fullWidth
              onClick={() =>
                updateSettings({
                  direction: "ltr",
                })
              }
            >
              LTR
            </Button>
          </FlexBox>

          <Divider
            sx={{
              my: 3,
            }}
          />

          <H6 textAlign="center" mb={2}>
            Bazar Demos
          </H6>

          <FlexBox gap={2} flexWrap="wrap">
            <StyledAvatar
              src="/assets/images/landing/page-1.png"
              onClick={() => push("/superstore-shop")}
            />

            <StyledAvatar
              src="/assets/images/landing/page-2.png"
              onClick={() => push("/grocery2")}
            />

            <StyledAvatar
              src="/assets/images/landing/page-3.png"
              onClick={() => push("/fashion-shop")}
            />

            <StyledAvatar
              src="/assets/images/landing/page-4.png"
              onClick={() => push("/gadget-shop")}
            />

            <StyledAvatar
              src="/assets/images/landing/furniture.png"
              onClick={() => push("/furniture-shop")}
            />

            <StyledAvatar
              src="/assets/images/landing/gift-shop.png"
              onClick={() => push("/gift-shop")}
            />

            <StyledAvatar
              src="/assets/images/landing/grocery1.png"
              onClick={() => push("/grocery1")}
            />

            <StyledAvatar
              src="/assets/images/landing/grocery3.png"
              onClick={() => push("/grocery3")}
            />

            <StyledAvatar
              src="/assets/images/landing/healthbeauty.png"
              onClick={() => push("/healthbeauty-shop")}
            />
          </FlexBox>
        </BodyWrapper>
      </Box>
    </ClickAwayListener>
  );
};

export default Setting;
