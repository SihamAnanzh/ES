import { Pagination } from "@mui/material";
import { FlexBox } from "components/flex-box";
import TableRow from "components/TableRow";
import { H5 } from "components/Typography";
import { useTranslation } from "next-i18next";
import React, { Fragment, useEffect } from "react";
import { useState } from "react";
import OrderRow from "./OrderRow"; // ============================================================

// ============================================================
const OrderList = ({ orderList, quick }) => {
  const { t } = useTranslation();
  const [listofAllOrder, setListOrders] = useState([]);
  const getTrans = (key) => {
    return t(`common:${key}`);
  };

  useEffect(() => {
    setListOrders(orderList);
  }, [orderList]);
  return (
    <Fragment>
      <TableRow
        elevation={0}
        sx={{
          padding: "0px 18px",
          background: "none",
          display: {
            xs: "none",
            md: "flex",
          },
        }}
      >
        <H5 color="grey.600" my={0} mx={0.75} textAlign="left">
          {getTrans("Order#")}
        </H5>

        <H5 color="grey.600" my={0} mx={0.75} textAlign="left">
          {getTrans("Datepurchased")}
        </H5>

        <H5 color="grey.600" my={0} mx={0.75} textAlign="left">
          {getTrans("Total")}
        </H5>
        <H5 flex="0 0 0 !important" color="grey.600" px={2.75} my={0} />
      </TableRow>

      {listofAllOrder.map((item, ind) => (
        <OrderRow item={item} key={ind} quick={quick} />
      ))}

      <FlexBox justifyContent="center" mt={5}></FlexBox>
    </Fragment>
  );
};

export default OrderList;
