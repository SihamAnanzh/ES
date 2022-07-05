/* eslint-disable react-hooks/exhaustive-deps */
import { Add, Remove } from "@mui/icons-material";
import { Box, Grid } from "@mui/material";
import BazarAvatar from "components/BazarAvatar";
import BazarButton from "components/BazarButton";
import BazarRating from "components/BazarRating";
import LazyImage from "components/LazyImage";
import { H1, H2, H3, H6 } from "components/Typography";
import { useAppContext } from "contexts/AppContext";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";
import ImageViewer from "react-simple-image-viewer";
import { FlexBox, FlexRowCenter } from "../flex-box"; // ================================================================

// ================================================================
const CardIntro = ({ imgGroup, price, title, id, mainCatigory, items }) => {
  const router = useRouter();
  const routerId = router.query.id;
  const [selectedImage, setSelectedImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const { state, dispatch } = useAppContext();
  const [amount, setAmount] = useState(1);
  const [dataObjects, setObjects] = useState([]);
  const cartList = state.cart;
  let byNow = true;
  const cartItem = cartList.find(
    (item) => item.id === id || item.id === routerId
  );

  //   let imgGroup = [];
  //   images.map((img) => {
  //     imgGroup.push(img.image_url);
  //   });

  const handleCartAmountChange = useCallback(
    (amount, product, byNow) => () => {
      if (product.length == 0) {
        alert("choose amount");
      }
      dispatch({
        type: "CHANGE_CART_AMOUNT",
        // payload: {
        //   price,
        //   qty: amount,
        //   name: title,
        //   imgUrl: imgGroup,
        //   id: id || routerId,
        // },
        payload: { ...product, qty: amount },
      });
      if (byNow) {
        router.push("/cart");
      }
    },
    []
  );

  return (
    <Box width="100%">
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

          <FlexBox overflow="auto">
            {/* {imgGroup.map((url, ind) => (
              <FlexRowCenter
                key={ind}
                width={64}
                height={64}
                minWidth={64}
                bgcolor="white"
                border="1px solid"
                borderRadius="10px"
                ml={ind === 0 ? "auto" : 0}
                style={{
                  cursor: "pointer",
                }}
                onClick={handleImageClick(ind)}
                mr={ind === imgGroup.length - 1 ? "auto" : "10px"}
                borderColor={
                  selectedImage === ind ? "primary.main" : "grey.400"
                }
              >
                <BazarAvatar src={url} variant="square" height={40} />
              </FlexRowCenter>
            ))} */}
          </FlexBox>
        </Grid>

        <Grid item md={6} xs={12} alignItems="center">
          <H1 mb={2}>{title}</H1>

          <FlexBox alignItems="center" mb={2}>
            <H2 color="primary.main" mb={0.5} lineHeight="1">
              Ammounts :
            </H2>
          </FlexBox>

          <Box mb={3}>
            {items &&
              items.map((item, ind) => (
                <BazarButton
                  className={`btnAmount ${ind == 0 && "selected"} `}
                  key={item.id}
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
                      price: item.new_price,
                      qty: item.qty,
                      name: item.title,
                      id: item.id,
                      imgUrl: imgGroup,
                    });
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
            <H2 color="primary.main" mb={5.5} lineHeight="1">
              Quantity :
            </H2>

            {[1, 2, 3, 4].map((qty, ind) => (
              <BazarButton
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
            <BazarButton
              color="primary"
              variant="contained"
              onClick={handleCartAmountChange(amount, dataObjects)}
              sx={{
                mt: 1.1,
                ml: 1.1,
                px: "1.75rem",
                height: 40,
                width: "140px",
              }}
            >
              Add to Cart
            </BazarButton>
            <BazarButton
              color="primary"
              variant="contained"
              onClick={handleCartAmountChange(amount, dataObjects, byNow)}
              sx={{
                mt: 1.1,
                ml: 1.1,
                px: "1.75rem",
                height: 40,
                width: "140px",
              }}
            >
              By Now
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
