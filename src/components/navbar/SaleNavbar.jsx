/* eslint-disable react-hooks/exhaustive-deps */
import { styled } from "@mui/material";
import { FlexRowCenter } from "components/flex-box";
import Scrollbar from "components/Scrollbar";
import React, { useCallback, useState } from "react";
import { H5 } from "../Typography"; // ==========================================================================
import BackendManager from "../../../src/globalManager/BackendManager";
import axios from "axios";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Tshirt from "components/icons/Tshirt";
import Link from "next/link";
// ==========================================================================
// styled compoentents
const Wrapper = styled(Scrollbar)(() => ({
  "& .simplebar-offset": {
    bgcolor: "#fff",
  },
  "& .simplebar-content-wrapper": {
    bgcolor: "#fff",
  },
  "& .simplebar-content": {
    height: "5rem",
    display: "flex",
    backgroundColor: "white",
    justifyContent: "center",
  },
}));
const Title = styled(H5)(({ selected, theme }) => ({
  fontSize: "10px",
  textAlign: "center",
  fontWeight: selected ? "600" : "400",
  color: selected ? theme.palette.primary.main : "inherit",
  width: "80%",
}));

const SaleNavbar = ({ saleCategoryList, onChange }) => {
  const [selected, setSelected] = useState(1);
  const route = useRouter();
  // const handleCategoryClick = useCallback(
  //   (categoryIndex, id) => () => {
  //     setSelected(categoryIndex);
  //     if (onChange) onChange(saleCategoryList[categoryIndex]);
  //     console.log("this is catgeroy id" + id);
  //   },
  //   []
  // );

  return (
    <Wrapper autoHide={false}>
      {saleCategoryList.map((item, ind) => (
        <Link
          key={ind}
          href={
            item.from_og == true
              ? `/telecom/${item.id}`
              : `/category/${item.id}`
          }
        >
          <FlexRowCenter
            key={ind}
            sx={{
              cursor: "pointer",
              minWidth: "100px",
              flexDirection: "column",
              background: ind === selected ? "primary.light" : "transparent",
            }}
          >
            {ind !== 0 ? (
              <>
                <img
                  key={ind}
                  width={40}
                  height={30}
                  style={{ objectFit: "cover" }}
                  src={item.icon}
                  alt=""
                />
                <Title selected={ind === selected}>{item.title}</Title>
              </>
            ) : (
              ""
            )}
          </FlexRowCenter>
        </Link>
      ))}
    </Wrapper>
  );
};

export default SaleNavbar;
