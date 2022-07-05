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
import Link from "next/link";
import { useRouter } from "next/router";
import { StyledTableCell } from "pages-sections/admin";
import React, { useCallback, useState } from "react";
import { useEffect } from "react";
import ImageViewer from "react-simple-image-viewer";
import { FlexBetween, FlexBox, FlexRowCenter } from "../flex-box"; // ================================================================

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
  }, [session]);
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

        <Grid
          item
          md={6}
          xs={12}
          alignItems="flex-start"
          justifyContent="flex-start"
        >
          <H1 mb={2}>{title}</H1>
          {console.log(id)}
          {id == "6" ? (
            <Box mb={3}>
              <FlexBox alignItems="center">
                <FlexBox justifyContent="center" m={2} mr={0.7}>
                  Amount :
                </FlexBox>
                <FlexBox>
                  <TextField
                    value="20"
                    m={2.6}
                    onChange={(e) => {
                      setAmount(e.target.value),
                        setObjects({
                          price: 3,
                          id: id,
                          value: amount,
                          currency: "KWD",
                          date: Date().toLocaleString(),
                        });
                    }}
                  />
                </FlexBox>
              </FlexBox>
              <FlexBox alignItems="center">
                <FlexBox justifyContent="center" m={2} mr={1.8}>
                  Phone :
                </FlexBox>
                <FlexBox>
                  <TextField
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
              <FlexBox justifyContent="center" m={2} mr={1.8}>
                Phone :
              </FlexBox>
              <FlexBox>
                <TextField
                  value={phoneNumner}
                  m={2.6}
                  onChange={(e) => setPhonNumber(e.target.value)}
                />
              </FlexBox>
            </FlexBox>
          )}
          <Box mb={3}>
            {items &&
              items.map((item, ind) => (
                <BazarButton
                  className={`btnAmount ${ind == 0 && "selected"} `}
                  id={item.denominationID}
                  key={item.denominationID}
                  color={"inherit"}
                  variant="outlined"
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
                  }}
                  sx={{
                    m: 1,
                    px: "rem",
                    height: " max-content",
                  }}
                >
                  {item.denominationValue}__{item.denominationValue}{" "}
                  {item.sellingCurrency}
                </BazarButton>
              ))}
          </Box>

          <Box mb={3}>
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
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TelecomIntro;
