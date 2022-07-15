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
import ImageViewer from "react-simple-image-viewer";
import { FlexBetween, FlexBox, FlexRowCenter } from "../flex-box"; // ================================================================

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

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
  serviceType,
}) => {
  const router = useRouter();
  const routerId = router.query.id;
  const [selectedImage, setSelectedImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const { state, dispatch } = useAppContext();
  const [amount, setAmount] = useState(1);
  const [itemPrice, setPrice] = useState("");
  const [dataObjects, setObjects] = useState({});
  const [phoneNumner, setPhonNumber] = useState("");

  const [aciveClass, setAddClass] = useState(false);
  const session = useSession();

  useEffect(() => {
    console.log(items[0].sellingPrice);

    items &&
      setObjects({
        price: items[0].sellingPrice,
        id: items[0].denominationID,
        value: items[0].denominationValue,
      });
    setPrice(items[0].sellingPrice);

    handleCartAmountChange(dataObjects, amount);
  }, []);

  useEffect(() => {
    if (session.data) {
      BackendManager.getUserProfile(session.data.user, router.locale).then(
        (res) => {
          setPhonNumber(res.phone);
        }
      );
    }
  }, [session]);

  let { t, i18n } = useTranslation();

  const getTrans = (key) => {
    return t(`common:${key}`);
  };

  const handleCartAmountChange = useCallback(
    (amount, product, buyNow) => () => {
      let duplicate;
      console.log(state.cart);
      console.log("product", product);
      state.cart.map((item) => {
        item.mainId != product.mainId ? (duplicate = true) : "";
      });

      duplicate
        ? setOpen(true)
        : (dispatch({
            type: "CHANGE_CART_AMOUNT",
            payload: { ...product, qty: amount },
          }),
          buyNow && router.push("/cart"));
    },

    [state.cart]
  );
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
    console.log(state.cart);
    if (state.cart.length > 0) {
      setOpen(true);
    }

    if (!session.data) {
      alert("you need to login");
    } else {
      dataObjects.length == 0
        ? alert("pick one")
        : await BackendManager.getOgLinkCheckout(dataObjects, phoneNumner).then(
            (res) => {
              router.push(res);
            }
          );
    }
  };

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
          <DialogTitle>{getTrans('"clearCart!"')}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              {getTrans("message")}
            </DialogContentText>
          </DialogContent>
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
      <Grid container spacing={3} justifyContent="space-around">
        <Grid item md={6} xs={12} alignItems="center">
          <FlexBox justifyContent="center" mb={6}>
            <LazyImage
              width={300}
              alt={title}
              height={300}
              loading="eager"
              objectFit="contain"
              src={imgGroup}
            />
            {/* {isViewerOpen && (
              <ImageViewer
                src={imgGroup}
                onClose={closeImageViewer}
                currentIndex={currentImage}
                backgroundStyle={{
                  backgroundColor: "rgba(0,0,0,0.9)",
                  zIndex: 1501,
                }}
              />
            )} */}
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
                          price: amount,
                          id: id,
                          value: amount,
                          currency: "KWD",
                          date: Date().toLocaleString(),
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
                    price: item.sellingPrice,
                    id: item.denominationID,
                    value: item.denominationValue,
                    currency: item.sellingCurrency,
                    date: Date().toLocaleString(),
                  });

                  setPrice(item.sellingPrice);
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
                {`${itemPrice} * ${amount}`} = ${itemPrice * amount}
              </H3>
            ) : (
              <H3 color="#FF8236" style={{ display: "inline" }}>
                {`${amount} * ${amount}`} = ${amount * amount}
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
