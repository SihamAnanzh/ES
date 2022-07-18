/* eslint-disable react-hooks/exhaustive-deps */
import Add from "@mui/icons-material/Add";
import Close from "@mui/icons-material/Close";
import Remove from "@mui/icons-material/Remove";
import { Box, Divider } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import BazarAvatar from "components/BazarAvatar";
import BazarButton from "components/BazarButton";
import BazarIconButton from "components/BazarIconButton";
import { FlexBox } from "components/flex-box";
import ShoppingBagOutlined from "components/icons/ShoppingBagOutlined";
import LazyImage from "components/LazyImage";
import { H5, Tiny } from "components/Typography";
import { useAppContext } from "contexts/AppContext";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import React, { useCallback, useEffect } from "react";

const MiniCart = ({ toggleSidenav }) => {
  const { palette } = useTheme();
  const { state, dispatch } = useAppContext();
  const cartList = state.cart;

  const { t } = useTranslation();

  const getTrans = (key) => {
    return t(`common:${key}`);
  };

  const handleCartAmountChange = useCallback(
    (amount, product) => () => {
      console.log(amount);
      let qty = amount;
      if (amount >= 4) {
        qty = 4;
      } else {
        qty = qty;
      }
      dispatch({
        type: "CHANGE_CART_AMOUNT",
        payload: { ...product, qty: qty },
      });
    },
    []
  );

  const getTotalPrice = () => {
    return cartList.reduce((accum, item) => accum + item.price * item.qty, 0);
  };

  return (
    <Box width="380px">
      <Box
        overflow="auto"
        height={`calc(100vh - ${!!cartList.length ? "80px - 3.25rem" : "0px"})`}
      >
        <FlexBox alignItems="center" m="0px 20px" height="74px" color="#FF8236">
          <ShoppingBagOutlined color="inherit" />
          <Box color="#595959" fontWeight={600} fontSize="16px" ml={1}>
            {cartList.length} {getTrans("item")}
          </Box>
        </FlexBox>

        <Divider />

        {!!!cartList.length && (
          <FlexBox
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="calc(100% - 74px)"
          >
            <LazyImage
              src="/assets/images/logos/shopping-bag.svg"
              width={90}
              height={100}
            />
            <Box
              component="p"
              mt={2}
              color="grey.600"
              textAlign="center"
              maxWidth="200px"
            >
              {getTrans("emptyCart")}
            </Box>
          </FlexBox>
        )}
        {cartList.map((item) => (
          <FlexBox
            alignItems="center"
            py={2}
            px={2.5}
            borderBottom={`1px solid ${palette.divider}`}
            key={item.id}
          >
            <FlexBox alignItems="center" flexDirection="column">
              <BazarButton
                variant="outlined"
                sx={{
                  height: "32px",
                  width: "32px",
                  borderRadius: "300px",
                  color: "#FF8236",
                }}
                onClick={handleCartAmountChange(
                  Number(Number(item.qty) + 1),
                  item
                )}
              >
                <Add fontSize="small" />
              </BazarButton>
              <Box color={"#595959"} fontWeight={600} fontSize="15px" my="3px">
                {item.qty}
              </Box>
              <BazarButton
                variant="outlined"
                sx={{
                  height: "32px",
                  width: "32px",
                  borderRadius: "300px",
                  color: "#FF8236",
                }}
                onClick={handleCartAmountChange(item.qty - 1, item)}
              >
                <Remove fontSize="small" />
              </BazarButton>
            </FlexBox>

            <BazarAvatar
              src={item.imgUrl}
              mx={2}
              alt={item.name}
              height={76}
              width={76}
            />

            <Box flex="1 1 0">
              <H5 color="#595959" className="title" fontSize="14px">
                {item.name}
              </H5>

              <Tiny color="grey.600">
                {/* ${item.price.toFixed(2)} x {item.qty} */}
              </Tiny>
              <Box fontWeight={600} fontSize="14px" color="#FF8236" mt={0.5}>
                KWD {(item.qty * item.price).toFixed(2)}
              </Box>
            </Box>

            <BazarIconButton
              ml={2.5}
              size="small"
              onClick={handleCartAmountChange(0, item)}
            >
              <Close fontSize="small" />
            </BazarIconButton>
          </FlexBox>
        ))}
      </Box>

      {!!cartList.length && (
        <Box m={2.5}>
          <Link href="/cart">
            <BazarButton
              className="add"
              variant="contained"
              color="primary"
              sx={{
                mb: "0.75rem",
                height: "40px",
              }}
              fullWidth
              onClick={toggleSidenav}
            >
              {getTrans("CheckoutNow")} (KWD {getTotalPrice().toFixed(2)})
            </BazarButton>
          </Link>
        </Box>
      )}
    </Box>
  );
};

MiniCart.defaultProps = {
  toggleSidenav: () => {},
};
export default MiniCart;
