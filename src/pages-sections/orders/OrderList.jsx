import { Pagination } from "@mui/material";
import { FlexBox } from "components/flex-box";
import TableRow from "components/TableRow";
import { H5 } from "components/Typography";
import React, { Fragment, useEffect } from "react";
import OrderRow from "./OrderRow"; // ============================================================

// ============================================================
const OrderList = ({ orderList }) => {
  console.log(orderList);
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
          Order #
        </H5>

        <H5 color="grey.600" my={0} mx={0.75} textAlign="left">
          Status
        </H5>

        <H5 color="grey.600" my={0} mx={0.75} textAlign="left">
          Date purchased
        </H5>

        <H5 color="grey.600" my={0} mx={0.75} textAlign="left">
          Total
        </H5>
        <H5 flex="0 0 0 !important" color="grey.600" px={2.75} my={0} />
      </TableRow>

      {orderList.map((item, ind) => (
        <OrderRow item={item} key={ind} />
      ))}

      <FlexBox justifyContent="center" mt={5}>
        {/* <Pagination
          count={5}
          color="primary"
          variant="outlined"
          onChange={(data) => console.log(data)}
        /> */}
      </FlexBox>
    </Fragment>
  );
};

export default OrderList;
