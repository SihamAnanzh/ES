/* eslint-disable react-hooks/exhaustive-deps */
import { Add, Favorite, Remove } from "@mui/icons-material";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import { Box, Button, Chip, IconButton, styled } from "@mui/material";
import BazarCard from "components/BazarCard";
import BazarRating from "components/BazarRating";
import LazyImage from "components/LazyImage";
import { H3, Span } from "components/Typography";
import { useAppContext } from "contexts/AppContext";
import Link from "next/link";
import React, { Fragment, useCallback, useEffect, useState } from "react";
import { FlexBox } from "../flex-box";
const StyledBazarCard = styled(BazarCard)(() => ({
  height: "80%",
  margin: "auto",
  display: "flex",
  overflow: "hidden",
  borderRadius: "8px",
  position: "relative",
  flexDirection: "column",
  justifyContent: "space-between",
  transition: "all 250ms ease-in-out",
}));
const ImageWrapper = styled(Box)(({ theme }) => ({
  textAlign: "center",
  position: "relative",
  display: "inline-block",
  [theme.breakpoints.down("sm")]: {
    display: "block",
  },
}));
const StyledChip = styled(Chip)(() => ({
  zIndex: 1,
  top: "10px",
  left: "10px",
  paddingLeft: 3,
  paddingRight: 3,
  fontWeight: 600,
  fontSize: "10px",
  position: "absolute",
}));
const LoveIconWrapper = styled(Box)(() => ({
  zIndex: 2,
  top: "7px",
  right: "15px",
  cursor: "pointer",
  position: "absolute",
}));
const ContentWrapper = styled(Box)(() => ({
  padding: "1rem",
  "& .title, & .categories": {
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
})); // ========================================================

// ========================================================
const Card = ({
  id,
  title,
  price,
  imgUrl,
  hoverEffect,
  showProductSize,
  discount,
  newPrice,
  haveIcon,
  isCard,
}) => {
  const { state, dispatch } = useAppContext();
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <StyledBazarCard hoverEffect={hoverEffect}>
      <ImageWrapper>
        {!!discount && (
          <StyledChip color="primary" size="small" label={`${discount}% off`} />
        )}

        {haveIcon && (
          <LoveIconWrapper>
            <IconButton
              sx={{
                p: "6px",
              }}
              onClick={toggleIsFavorite}
            >
              {isFavorite ? (
                <Favorite color="primary" fontSize="small" />
              ) : (
                <FavoriteBorder fontSize="small" />
              )}
            </IconButton>
          </LoveIconWrapper>
        )}

        <Link href={`/card/details/${id}`}>
          <a>
            <LazyImage
              src={imgUrl}
              width={0}
              height={0}
              layout="responsive"
              alt={title}
            />
          </a>
        </Link>
      </ImageWrapper>

      <ContentWrapper>
        <FlexBox>
          <Box flex="1 1 0" minWidth="0px" mr={1}>
            <Link href={`/card/details/${id}`}>
              <a>
                <H3
                  mb={1}
                  title={title}
                  fontSize="14px"
                  fontWeight="600"
                  className="title"
                  color="text.secondary"
                >
                  {title}
                </H3>
              </a>
            </Link>

            {showProductSize && (
              <Span color="grey.600" mb={1} display="block">
                300ml
              </Span>
            )}
            {newPrice && (
              <FlexBox alignItems="center" gap={1} mt={0.5}>
                <Box fontWeight="600" color="primary.main">
                  ${newPrice.toFixed(2)}
                </Box>

                {price == newPrice && (
                  <Box color="grey.600" fontWeight="600">
                    <del>${price?.toFixed(2)}</del>
                  </Box>
                )}
              </FlexBox>
            )}
          </Box>
        </FlexBox>
      </ContentWrapper>
    </StyledBazarCard>
  );
};

export default Card;
