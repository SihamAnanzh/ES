/* eslint-disable react-hooks/exhaustive-deps */
import KeyboardArrowDownOutlined from "@mui/icons-material/KeyboardArrowDownOutlined";
import SearchOutlined from "@mui/icons-material/SearchOutlined";
import { Box, Card, MenuItem, TextField } from "@mui/material";
import TouchRipple from "@mui/material/ButtonBase";
import { styled } from "@mui/material/styles";
import { debounce } from "@mui/material/utils";
import BazarMenu from "components/BazarMenu";
import { FlexBox } from "components/flex-box";
import { getCookie } from "cookies-next";
import BackendManager from "globalManager/BackendManager";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react"; // styled components
// also used in the GrocerySearchBox component

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
const DropDownHandler = styled(FlexBox)(({ theme }) => ({
  whiteSpace: "pre",
  borderTopRightRadius: 300,
  borderBottomRightRadius: 300,
  borderLeft: `1px solid ${theme.palette.text.disabled}`,
  [theme.breakpoints.down("xs")]: {
    display: "none",
  },
}));

const SearchBox = ({ list }) => {
  const [category, setCategory] = useState("All Categories");
  const [categoryId, setCategoryId] = useState(0);
  const [resultList, setResultList] = useState([]);
  const [listItem, setListItem] = useState([]);
  const parentRef = useRef();

  const handleCategoryChange = (cat, id) => () => {
    setCategory(cat);
    setCategoryId(id);
  };

  useEffect(() => {
    BackendManager.getCategoryList(getCookie("countyId")).then((res) => {
      console.log(res);
    });
  }, []);
  const search = debounce((e) => {
    const value = e.target?.value;
    if (!value) setResultList([]);
    else setResultList(dummySearchResult);
  }, 200);
  const hanldeSearch = useCallback((event) => {
    event.persist();
    search(event);
  }, []);

  const handleDocumentClick = () => {
    setResultList([]);
  };

  useEffect(() => {
    window.addEventListener("click", handleDocumentClick);
    return () => {
      window.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  useEffect(() => {}, []);

  const categories = list.map((item) => {
    listItem.push({ title: item.title, id: item.id });
  });
  const categoryDropdown = (
    <BazarMenu
      direction="left"
      handler={
        <DropDownHandler
          alignItems="center"
          bgcolor="grey.100"
          height="100%"
          px={3}
          color="grey.700"
          component={TouchRipple}
        >
          <Box mr={0.5}>{category}</Box>
          <KeyboardArrowDownOutlined fontSize="small" color="inherit" />
        </DropDownHandler>
      }
    >
      {/* {listItem.map((item, ind) => (
      <MenuItem key={ind} onClick={handleCategoryChange(item.title, item.id)}>
        {item.title}
      </MenuItem>
    ))} */}
    </BazarMenu>
  );

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
      <TextField
        variant="outlined"
        placeholder="Searching for..."
        fullWidth
        onChange={hanldeSearch}
        InputProps={{
          sx: {
            height: 44,
            borderRadius: 300,
            paddingRight: 0,
            color: "grey.700",
            overflow: "hidden",
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "primary.main",
            },
          },
          endAdornment: categoryDropdown,
          startAdornment: <SearchOutlinedIcon fontSize="small" />,
        }}
      />

      {!!resultList.length && (
        <SearchResultCard elevation={2}>
          {resultList.map((item) => (
            <Link href={`/product/search/${item}`} key={item} passHref>
              <MenuItem key={item}>{item}</MenuItem>
            </Link>
          ))}
        </SearchResultCard>
      )}
    </Box>
  );
};

const dummySearchResult = [
  "Macbook Air 13",
  "Asus K555LA",
  "Acer Aspire X453",
  "iPad Mini 3",
];
export default SearchBox;
