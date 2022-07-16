/* eslint-disable react-hooks/exhaustive-deps */
import { Add, Remove } from "@mui/icons-material";
import { Box, Grid } from "@mui/material";
import BazarAvatar from "components/BazarAvatar";
import BazarButton from "components/BazarButton";
import BazarRating from "components/BazarRating";
import LazyImage from "components/LazyImage";
import { H1, H2, H3, H6, Span } from "components/Typography";
import { useAppContext } from "contexts/AppContext";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";
import { useEffect } from "react";
import ImageViewer from "react-simple-image-viewer";
import { FlexBox, FlexRowCenter } from "../flex-box"; // ================================================================
import { toast, ToastContainer } from "react-toastify";
import BackendManager from "globalManager/BackendManager";
import RelatedProducts from "components/products/RelatedProducts";
import { useTranslation } from "next-i18next";

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
const CardIntro = ({ imgGroup, title, id, mainCatigory, items, price }) => {
  const router = useRouter();
  const routerId = router.query.id;
  const [selectedImage, setSelectedImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const { state, dispatch } = useAppContext();
  const [amount, setAmount] = useState("1");
  const [itemPrice, setPrice] = useState();
  const [dataObjects, setObjects] = useState({});
  const [mainId, setMaiaId] = useState("");
  const route = useRouter();
  const cartList = state.cart;
  const [cart, setCart] = useState(state.cart);
  let buyNow = true;
  const cartItem = cartList.find(
    (item) => item.id === id || item.id === routerId
  );

  let { t, i18n } = useTranslation();

  const getTrans = (key) => {
    return t(`common:${key}`);
  };

  useEffect(() => {
    BackendManager.getItemslistById(id, route.locale).then((res) => {
      let data = res[0];
      setMaiaId(data.main_category.id);
      items &&
        setObjects({
          price: data.price,
          name: data.title,
          id: data.id,
          imgUrl: imgGroup,
          mainId: data.main_category.id,
        });
      setPrice(data.price);
    });

    handleCartAmountChange(dataObjects, amount);
  }, []);

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
    console.log(state.cart);
  };
  const handleClose = () => {
    setOpen(false);
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
          <DialogTitle>{message}</DialogTitle>
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
      <ToastContainer />
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
          </FlexBox>

          <FlexBox overflow="auto"></FlexBox>
        </Grid>

        <Grid item md={6} xs={12} alignItems="center">
          <H1 color="#595959" mb={2}>
            {title}
          </H1>

          <FlexBox alignItems="center" mb={2}>
            <H2 color="#595959" mb={0.5} lineHeight="1">
              {getTrans("Amounts")} :
            </H2>
          </FlexBox>

          <Box mb={3}>
            {items &&
              items.map((item, ind) => (
                <BazarButton
                  className={`btnAmount ${ind == 0 && "selected"} `}
                  key={ind}
                  color="inherit"
                  variant="contained"
                  onClick={(e) => {
                    Array.from(document.querySelectorAll(".btnAmount")).map(
                      (btn) => {
                        btn.classList.remove("selected");
                      }
                    );

                    e.target.classList.add("selected");
                    setObjects({
                      price: item.price,
                      qty: item.qty,
                      name: item.title,
                      id: item.id,
                      imgUrl: imgGroup,
                      mainId: mainId,
                    });
                    setPrice(item.price);
                  }}
                  sx={{
                    m: 1,
                    px: "rem",
                    height: 40,
                  }}
                >
                  {item.title}
                </BazarButton>
              ))}
          </Box>

          <Box mb={3}>
            <H2 color="#595959" mb={5.5} lineHeight="1">
              {getTrans("Quantity")} :
            </H2>

            {[1, 2, 3, 4].map((qty, ind) => (
              <BazarButton
                key={ind}
                className={`btnQuntity ${ind == 0 && "selectedAmount"} `}
                color="inherit"
                variant="contained"
                onClick={(e) => {
                  Array.from(document.querySelectorAll(".btnQuntity")).map(
                    (btn) => {
                      btn.classList.remove("selectedAmount");
                    }
                  );
                  e.target.classList.add("selectedAmount");
                  setAmount(qty);
                }}
                sx={{
                  ml: 1.1,
                  px: "1.75rem",
                  height: 40,
                }}
              >
                {qty}
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
            <H3 color="#FF8236" style={{ display: "inline" }}>
              {`${itemPrice} * ${amount}`} = ${itemPrice * amount}
            </H3>
          </Box>
          <Box mb={3}>
            <BazarButton
              className="add"
              color="primary"
              variant="contained"
              onClick={handleCartAmountChange(amount, dataObjects)}
              sx={{
                mt: 1.1,
                ml: 1.1,
                px: "1.75rem",
                height: 40,
                width: "140px",
                minWidth: "fit-content",
              }}
            >
              {getTrans("AddToCart")}
            </BazarButton>
            <BazarButton
              className="add"
              color="primary"
              variant="contained"
              onClick={handleCartAmountChange(amount, dataObjects, buyNow)}
              sx={{
                mt: 1.1,
                ml: 1.1,
                px: "1.75rem",
                height: 40,
                width: "140px",
              }}
            >
              {getTrans("BuyNow")}
            </BazarButton>
          </Box>
          {/* {!cartItem?.qty ? (
            <BazarButton
              color="primary"
              variant="contained"
              onClick={1}
              sx={{
                m: 0.5,
                px: "1.75rem",
                height: 40,
              }}
            >
              Add to Cart
            </BazarButton>
          ) : (
            <FlexBox alignItems="center" mb={4.5}>
              <BazarButton
                size="small"
                sx={{
                  p: 1,
                }}
                color="primary"
                variant="outlined"
                onClick={handleCartAmountChange(cartItem?.qty - 1)}
              >
                <Remove fontSize="small" />
              </BazarButton>

              <H3 fontWeight="600" mx={2.5}>
                {cartItem?.qty.toString().padStart(2, "0")}
              </H3>

              <BazarButton
                size="small"
                sx={{
                  p: 1,
                }}
                color="primary"
                variant="outlined"
                onClick={handleCartAmountChange(cartItem?.qty + 1)}
              >
                <Add fontSize="small" />
              </BazarButton>
            </FlexBox>
          )} */}

          {/* <FlexBox alignItems="center" mb={2}>
            <Box>Sold By:</Box>
            <Link href="/shops/fdfdsa">
              <a>
                <H6 ml={1}>Mobile Store</H6>
              </a>
            </Link>
          </FlexBox> */}
        </Grid>
      </Grid>
    </Box>
  );
};

export default CardIntro;
