/* eslint-disable react-hooks/exhaustive-deps */
import { Add, Remove } from "@mui/icons-material";
import { Box, Checkbox, Grid, Radio } from "@mui/material";
import BazarAvatar from "components/BazarAvatar";
import BazarButton from "components/BazarButton";
import BazarRating from "components/BazarRating";
import LazyImage from "components/LazyImage";
import { H1, H2, H3, H6, Span } from "components/Typography";
import { useAppContext } from "contexts/AppContext";
import BackendManager from "globalManager/BackendManager";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { StyledTableCell } from "pages-sections/admin";
import React, { useCallback, useState } from "react";
import { useEffect } from "react";
import ImageViewer from "react-simple-image-viewer";
import { FlexBox, FlexRowCenter } from "../flex-box"; // ================================================================

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
  const [dataObjects, setObjects] = useState({});
  const [phoneNumner, setPhonNumber] = useState("");
  const cartList = state.cart;
  const [aciveClass, setAddClass] = useState(false);
  const session = useSession();
  useEffect(() => {
    if (session.data) {
      BackendManager.getUserProfile(session.data.user).then((res) => {
        setPhonNumber(res.phone);
      });
    }
  }, []);
  const handleOgPayment = async () => {
    if (!session.data) {
      alert("you need to login");
    } else {
      dataObjects.length == 0 ? alert("pick one") : console.log(dataObjects);

      await BackendManager.getOgLinkCheckout(dataObjects, phoneNumner).then(
        (res) => {
          router.push(res);
        }
      );
    }
  };

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
        </Grid>

        <Grid item md={6} xs={12} alignItems="center">
          <H1 mb={2}>{title}</H1>

          <FlexBox alignItems="center" mb={2}>
            <Box>Category</Box>
            <H6 ml={1}>{mainCatigory}</H6>
          </FlexBox>
          <FlexBox alignItems="center" mb={2}>
            <Box>Service Type</Box>
            <H6 ml={1}>{serviceType}</H6>
          </FlexBox>

          <Box mb={3}>
            {items &&
              items.map((item) => (
                <BazarButton
                  id={item.denominationID}
                  key={item.denominationID}
                  color={aciveClass ? "primary" : "inherit"}
                  variant="outlined"
                  onClick={(e) => {
                    setObjects({
                      price: item.sellingPrice,
                      id: item.denominationID,
                      value: item.denominationValue,
                      currency: item.sellingCurrency,
                      date: Date().toLocaleString(),
                    });
                  }}
                  sx={{
                    m: 1,
                    px: "rem",
                    height: " max-content",
                  }}
                >
                  <Radio />
                  <div
                    className=""
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    <Span style={{ color: "red" }}>
                      value : {item.denominationValue}
                    </Span>
                    <span>
                      {" "}
                      price: {item.denominationValue}{" "}
                      <span>{item.sellingCurrency}</span>
                    </span>
                  </div>
                </BazarButton>
              ))}
          </Box>
          <Box mb={3}>
            {items.length > 0 && (
              <BazarButton
                color="primary"
                variant="contained"
                onClick={handleOgPayment}
                sx={{
                  ml: 1.1,
                  px: "1.75rem",
                  height: 40,
                }}
              >
                By Now
              </BazarButton>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TelecomIntro;
