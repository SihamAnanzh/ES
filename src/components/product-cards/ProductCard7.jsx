/* eslint-disable react-hooks/exhaustive-deps */
import { Add, Close, Remove } from "@mui/icons-material";
import { Button, Card, IconButton, styled } from "@mui/material";
import Image from "components/BazarImage";
import { FlexBox } from "components/flex-box";
import { Span } from "components/Typography";
import { useAppContext } from "contexts/AppContext";
import Link from "next/link";
import React, { useCallback } from "react"; // styled components

const Wrapper = styled(Card)(({ theme }) => ({
  display: "flex",
  overflow: "hidden",
  alignItems: "center",
  position: "relative",
  borderRadius: "10px",
  marginBottom: "1.5rem",
  boxShadow: theme.shadows[2],
  backgroundColor: theme.palette.background.paper,
  "@media only screen and (max-width: 425px)": {
    flexWrap: "wrap",
    img: {
      height: "auto",
      minWidth: "100%",
    },
  },
})); // =========================================================

// =========================================================
const ProductCard7 = ({ id, name, qty, price, imgUrl }) => {
  const { dispatch } = useAppContext(); // handle change cart

  const handleCartAmountChange = useCallback(
    (amount) => () => {
      let qty = amount;
      if (qty > 4) {
        qty = 4;
      } else {
        qty = amount;
      }
      dispatch({
        type: "CHANGE_CART_AMOUNT",
        payload: {
          id,
          name,
          price,
          imgUrl,
          qty,
        },
      });
    },
    []
  );
  return (
    <Wrapper>
      <Image
        alt={name}
        width={140}
        height={140}
        display="block"
        src={imgUrl || "/assets/images/products/iphone-xi.png"}
      />

      <IconButton
        size="small"
        onClick={handleCartAmountChange(0)}
        sx={{
          position: "absolute",
          right: 15,
          top: 15,
        }}
      >
        <Close fontSize="small" />
      </IconButton>

      <FlexBox p={2} rowGap={2} width="100%" flexDirection="column">
        <a>
          <Span color="#595959" ellipsis fontWeight="600" fontSize={18}>
            {name}
          </Span>
        </a>

        <FlexBox gap={1} flexWrap="wrap" alignItems="center">
          <Span color="grey.600">
            KWD {price.toFixed(2)} x {qty}
          </Span>

          <Span fontWeight={600} color="#595959">
            KWD {(price * qty).toFixed(2)}
          </Span>
        </FlexBox>

        <FlexBox alignItems="center">
          <Button
            sx={{
              p: "5px",
              color: "#FF8236",
              marginRight: "5px",
            }}
            variant="outlined"
            disabled={qty === 1}
            onClick={handleCartAmountChange(qty - 1)}
          >
            <Remove fontSize="small" />
          </Button>

          <Span color="#595959" mx={1} fontWeight={600} fontSize={15}>
            {qty}
          </Span>
          <Button
            sx={{
              p: "5px",
              color: "#FF8236",
              marginLeft: "5px",
            }}
            variant="outlined"
            onClick={handleCartAmountChange(qty + 1)}
          >
            <Add fontSize="small" />
          </Button>
        </FlexBox>
      </FlexBox>
    </Wrapper>
  );
};

export default ProductCard7;
