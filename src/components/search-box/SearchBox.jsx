/* eslint-disable react-hooks/exhaustive-deps */
import KeyboardArrowDownOutlined from "@mui/icons-material/KeyboardArrowDownOutlined";
import SearchOutlined from "@mui/icons-material/SearchOutlined";
import { Box, Card, MenuItem, TextField } from "@mui/material";
import TouchRipple from "@mui/material/ButtonBase";
import { styled } from "@mui/material/styles";
import { debounce } from "@mui/material/utils";
import BazarButton from "components/BazarButton";
import BazarMenu from "components/BazarMenu";
import { FlexBox } from "components/flex-box";
import { Span } from "components/Typography";
import { getCookie } from "cookies-next";
import BackendManager from "globalManager/BackendManager";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react"; // styled components
import { Button } from "react-scroll";
import { toast, ToastContainer } from "react-toastify";

export const SearchOutlinedIcon = styled(SearchOutlined)(({ theme }) => ({
  color: theme.palette.grey[600],
  marginRight: 6,
})); // also used in the GrocerySearchBox component

export const SearchResultCard = styled(Card)(() => ({
  zIndex: 99,
  top: "100%",
  width: "100%",
  position: "absolute",
  paddingTop: "0.5rem",
  paddingBottom: "0.5rem",
}));

const SearchBox = () => {
  const [category, setCategory] = useState("All Categories");
  const [categoryId, setCategoryId] = useState(0);
  const [resultList, setResultList] = useState([]);
  const parentRef = useRef();
  const [searchContent, setSearchContent] = useState("");
  const session = useSession();
  const [categories, setCategories] = useState([]);
  const router = useRouter();
  const handleCategoryChange = (cat, id) => () => {
    setCategory(cat);
    setCategoryId(id);
    search();
  };

  useEffect(() => {
    let id = getCookie("countryId");
    BackendManager.getCategoryList(id ? id : 1, router.locale).then((res) => {
      setCategories(res);
    });
  }, []);

  // const search = debounce((event) => {
  //   if (searchContent != "") {
  //     router.push(`/product/search/${categoryId}?f=${searchContent}`);
  //     setSearchContent("");
  //   }
  // }, 2000);

  const handleSearch = async () => {
    if (searchContent != "") {
      router.push(`/product/search/${categoryId}?f=${searchContent}`);
    } else {
      toast.warn(
        router.locale == "ar"
          ? "املأ حقل البحث من فضلك"
          : "Fill in the search field please",
        {
          position: "top-center",
          autoClose: 5005,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          autoClose: false,
        }
      );
    }
  };

  const handleDocumentClick = () => {
    setResultList([]);
  };
  const StyledButton = styled(BazarButton)(() => ({
    marginTop: "2rem",
    padding: "11px 24px",
  }));

  useEffect(() => {
    window.addEventListener("click", handleDocumentClick);
    return () => {
      window.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  return (
    <Box
      position="relative"
      flex="1 1 0"
      maxWidth="670px"
      mx="auto"
      {...{
        ref: parentRef,
      }}
    >
      <ToastContainer />
      <TextField
        variant="outlined"
        placeholder={router.locale == "ar" ? "...البحث عن" : "Searching for..."}
        fullWidth
        onChange={(e) => setSearchContent(e.target.value)}
        InputProps={{
          sx: {
            height: 44,
            borderRadius: 300,
            paddingRight: 0,
            color: "grey.700",

            overflow: "hidden",
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "grey.700",
            },
            "&:focus .MuiOutlinedInput-notchedOutline": {
              borderColor: "grey.700",
            },
          },
          endAdornment: (
            <BazarButton
              className="add"
              fullWidth
              color="primary"
              variant="contained"
              sx={{
                height: 44,
              }}
              onClick={handleSearch}
              style={{
                border: "none",
                height: "100%",
                width: "100px",
                color: "#fff",
              }}
            >
              {router.locale == "ar" ? "بحث" : "Search"}
            </BazarButton>
          ),

          startAdornment: <SearchOutlinedIcon fontSize="small" />,
        }}
      />

      {!!resultList.length && (
        <SearchResultCard elevation={2}>
          {/* {resultList.map((item) => (
            <Link
              href={{
                pathname: `/product/search/${categoryId}`,
                query: { resultList },
              }}
              key={item}
              passHref
            >
              <MenuItem key={item}>{item}</MenuItem>
            </Link>
          ))} */}
        </SearchResultCard>
      )}
    </Box>
  );
};

const categories = [
  "All Categories",
  "Car",
  "Clothes",
  "Electronics",
  "Laptop",
  "Desktop",
  "Camera",
  "Toys",
];
const dummySearchResult = [
  "Macbook Air 13",
  "Asus K555LA",
  "Acer Aspire X453",
  "iPad Mini 3",
];
export default SearchBox;
