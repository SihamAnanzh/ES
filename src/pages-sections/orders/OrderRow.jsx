import East from "@mui/icons-material/East";
import { Box, Chip, IconButton, Typography } from "@mui/material";

import TableRow from "components/TableRow";
import { H5 } from "components/Typography";
import { format } from "date-fns";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const OrderRow = ({ item, quick }) => {
  const route = useRouter();
  return (
    <Link href={item.href}>
      <a>
        <TableRow
          sx={{
            my: "1rem",
            padding: "6px 18px",
          }}
        >
          <H5 m={0.75} textAlign="left">
            {item.orderNo}
          </H5>

          <Typography className="pre" m={0.75} textAlign="left">
            {item.purchaseDate}
          </Typography>
          <Typography m={0.75} textAlign="left">
            {item.currency == "1" ? "$" : item.currency} {item.price.toFixed(2)}
          </Typography>

          <Typography
            textAlign="center"
            color="grey.600"
            sx={{
              flex: "0 0 0 !important",
              display: {
                xs: "none",
                md: "block",
              },
            }}
          >
            <IconButton>
              <East fontSize="small" color="inherit" />
            </IconButton>
          </Typography>
        </TableRow>
      </a>
    </Link>
  );
};

export default OrderRow;
