/* eslint-disable react-hooks/exhaustive-deps */
import { Add, Remove } from "@mui/icons-material";
import { Box, Checkbox, Grid, Radio, TextField } from "@mui/material";
import BazarAvatar from "components/BazarAvatar";
import BazarButton from "components/BazarButton";
import BazarRating from "components/BazarRating";
import LazyImage from "components/LazyImage";
import { H1, H2, H3, H6, Span } from "components/Typography";
import { useAppContext } from "contexts/AppContext";
import BackendManager from "globalManager/BackendManager";
import { useSession } from "next-auth/react";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useRouter } from "next/router";
import { StyledTableCell } from "pages-sections/admin";
import React, { useCallback, useState } from "react";
import { useEffect } from "react";
import { FlexBetween, FlexBox, FlexRowCenter } from "../flex-box"; // ================================================================

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { toast } from "react-toastify";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
// ================================================================
const TelecomIntro = ({
  imgGroup,
  price,
  title,
  id,
  mainCatigory,
  items,
  serviceCode,
}) => {
  const router = useRouter();
  const routerId = router.query.id;
  const [selectedImage, setSelectedImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const { state, dispatch } = useAppContext();
  const [amount, setAmount] = useState(10);
  const [itemPrice, setPrice] = useState("");
  const [dataObjects, setObjects] = useState({});
  const [phoneNumner, setPhonNumber] = useState("");
  const [denominationValue, setDenominationValue] = useState();
  const [aciveClass, setAddClass] = useState(false);
  const [userInfo, setUserInfo] = useState();
  const session = useSession();

  useEffect(() => {
    items.length > 0
      ? (setObjects({
          price: items[0].sellingPrice,
          id: items[0].denominationID,
          value: items[0].denominationValue,
          serviceID: router.query.id,
          serviceCode,
        }),
        setPrice(items[0].sellingPrice),
        setDenominationValue(items[0].denominationValue))
      : setObjects({
          price: amount,
          id: "",
          value: amount,
          serviceID: router.query.id,
          serviceCode,
        });
  }, []);

  useEffect(() => {
    if (session.data) {
      BackendManager.getUserProfile(session.data.user, router.locale).then(
        (res) => {
          setUserInfo(res);

          setPhonNumber(res.phone);
        }
      );
    }
  }, [session]);

  let { t, i18n } = useTranslation();

  const getTrans = (key) => {
    return t(`common:${key}`);
  };

  const [open, setOpen] = React.useState(false);
  const handleClearCart = (product) => {
    dispatch({
      type: "CHANGE_CART_AMOUNT",
      payload: { ...product, qty: 0 },
    });
  };

  const claerCart = () => {
    state.cart.map((item) => {
      handleClearCart(item);
    });
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleOgPayment = async () => {
    if (state.cart.length > 0) {
      setOpen(true);
    } else if (!session.data) {
      router.push(
        "/login?callbackurl=" + router.asPath,
        "/login?callbackurl=" + router.asPath,
        {
          locale: router.locale,
        }
      );
    } else {
      if ((userInfo.email == "", userInfo.phone == "")) {
        return toast.warn(
          "The profile is not complete, you need to enter all your information",
          {
            position: "top-center",
            autoClose: 5005,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
      } else {
        await BackendManager.getOgCehckout(
          dataObjects,
          phoneNumner,
          session.data.user,
          router.locale
        ).then((res) => {
          if (res.status.code == 400) {
            toast.warn(res.status.message, {
              position: "top-center",
              autoClose: 5005,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              autoClose: false,
            });
          }
          if (res.status.code == 200) {
            toast.warn(res.status.message, {
              position: "top-center",
              autoClose: 5005,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              autoClose: false,
            });
          } else {
            toast.warn(res.status.message, {
              position: "top-center",
              autoClose: 5005,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              autoClose: false,
            });
          }
        });
      }
    }
  };

  let message = getTrans("titleDiaglog");
  return (
    <Box width="100%">
      <div>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          {" "}
          <DialogTitle fontSize={8}>{message}</DialogTitle>
          <DialogContent></DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>{getTrans("cancel")}</Button>
            <Button
              onClick={() => {
                claerCart();
                setOpen(false);
              }}
            >
              {getTrans("Agree")}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <Grid
        container
        spacing={3}
        justifyContent="space-around"
        height="max-content"
        pb={8}
        pt={8}
      >
        <Grid item md={6} xs={12} alignItems="center">
          <FlexBox justifyContent="center" mb={6}>
            {imgGroup && (
              <LazyImage
                width={300}
                alt={title}
                height={300}
                loading="eager"
                objectFit="contain"
                src={imgGroup}
              />
            )}
          </FlexBox>
        </Grid>

        <Grid
          item
          md={6}
          xs={12}
          alignItems="flex-start"
          justifyContent="flex-start"
        >
          <H1 color="#595959" mb={2}>
            {title}
          </H1>

          {id == "6" ? (
            <Box mb={3}>
              <FlexBox alignItems="center">
                <FlexBox color="#595959" justifyContent="center" m={2} mr={0.7}>
                  {getTrans("Amounts")} :
                </FlexBox>
                <FlexBox>
                  <TextField
                    className="textAmount"
                    inputProps={{
                      style: {
                        color: "#000",
                        border: "#000",
                        outline: "none",
                      },
                    }}
                    variant="standard"
                    value={amount}
                    m={2.6}
                    onChange={(e) => {
                      setAmount(e.target.value),
                        setObjects({
                          amount: e.target.value,
                          price: amount,
                          id: id,
                          value: amount,
                          serviceCode,
                          serviceID: router.query.id,
                        });
                      setPrice(e.target.value);
                    }}
                  ></TextField>
                </FlexBox>
              </FlexBox>
              <FlexBox alignItems="center">
                <FlexBox color="#595959" justifyContent="center" m={2} mr={1.8}>
                  {getTrans("Phone")} :
                </FlexBox>
                <FlexBox>
                  <TextField
                    className="textAmount"
                    variant="standard"
                    inputProps={{
                      style: {
                        color: "#000",
                        border: "#000",
                        "&:foucs": {
                          color: "#000",
                        },
                      },
                    }}
                    value={phoneNumner}
                    m={2.6}
                    onChange={(e) => setPhonNumber(e.target.value)}
                  />
                </FlexBox>
              </FlexBox>
            </Box>
          ) : (
            ""
          )}
          {id == "5" && (
            <FlexBox alignItems="center">
              <FlexBox color="#000" justifyContent="center" m={2} mr={1.8}>
                {getTrans("Phone")} :
              </FlexBox>
              <FlexBox>
                <TextField
                  inputProps={{
                    style: {
                      color: "#000",
                    },
                  }}
                  variant="standard"
                  value={phoneNumner}
                  m={2.6}
                  onChange={(e) => setPhonNumber(e.target.value)}
                />
              </FlexBox>
            </FlexBox>
          )}
          <Box mb={3}>
            {items?.map((item, ind) => (
              <BazarButton
                className={`btnAmount ${ind == 0 && "selected"} `}
                id={item.denominationID}
                key={item.denominationID}
                color={"inherit"}
                variant="contained"
                onClick={(e) => {
                  Array.from(document.querySelectorAll(".btnAmount")).map(
                    (btn) => {
                      btn.classList.remove("selected");
                    }
                  );
                  e.target.classList.add("selected");
                  setObjects({
                    serviceCode,
                    serviceID: router.query.id,
                    price: item.sellingPrice,
                    id: item.denominationID,
                    value: item.denominationValue,
                    currency: item.sellingCurrency,
                  });

                  setPrice(item.sellingPrice);
                  setDenominationValue(item.denominationValue);
                }}
                sx={{
                  m: 1,
                  px: "rem",
                  height: " max-content",
                }}
              >
                {router.locale == "ar" ? "القيمة" : "value"} :{" "}
                {item.denominationValue}
              </BazarButton>
            ))}
          </Box>

          <Box mb={3}>
            <H2
              color="#595959"
              mb={5.5}
              lineHeight="1"
              style={{ display: "inline" }}
            >
              {getTrans("Total")} :{" "}
            </H2>
            {id == 5 ? (
              <H3 color="#FF8236" style={{ display: "inline" }}>
                {`KWD ${itemPrice} * ${denominationValue}`} =KWD{" "}
                {itemPrice * denominationValue}
              </H3>
            ) : (
              <H3 color="#FF8236" style={{ display: "inline" }}>
                {`KWD ${amount} * ${amount}`} = KWD {amount * amount}
              </H3>
            )}
          </Box>
          <Box mb={3}>
            <BazarButton
              className="add"
              variant="contained"
              onClick={handleOgPayment}
              sx={{
                ml: 1.1,
                px: "1.75rem",
                height: 40,
              }}
            >
              {getTrans("BuyNow")}
            </BazarButton>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TelecomIntro;
