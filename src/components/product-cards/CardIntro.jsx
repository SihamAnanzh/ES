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

  const cartItem = cartList.find(
    (item) => item.id === id || item.id === routerId
  );

  //   let imgGroup = [];
  //   images.map((img) => {
  //     imgGroup.push(img.image_url);
  //   });

  const handleCartAmountChange = useCallback(
    (amount, product) => () => {
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
    },
    []
  );

  console.log(items);
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
            <Box>Catigory</Box>
            <H6 ml={1}>{mainCatigory}</H6>
          </FlexBox>

          {/* <FlexBox alignItems="center" mb={2}>
            <Box lineHeight="1">Rated:</Box>
            <Box mx={1} lineHeight="1">
              <BazarRating color="warn" fontSize="1.25rem" value={4} readOnly />
            </Box>
            <H6 lineHeight="1">(50)</H6>
          </FlexBox> */}

          <Box mb={3}>
            {/* <H2 color="primary.main" mb={0.5} lineHeight="1">
              pick one
            </H2> */}
            {items &&
              items.map((item) => (
                <BazarButton
                  key={item.id}
                  color="secondary"
                  variant="contained"
                  onClick={() => {
                    console.log(item),
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
            <BazarButton
              color="primary"
              variant="contained"
              onClick={handleCartAmountChange(amount, dataObjects)}
              sx={{
                ml: 1.1,
                px: "1.75rem",
                height: 40,
              }}
            >
              Add to Cart
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
