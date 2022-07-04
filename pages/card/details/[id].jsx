import { Box, styled, Tab, Tabs } from "@mui/material";
import NavbarLayout from "components/layouts/NavbarLayout";
import AvailableShops from "components/products/AvailableShops";
import FrequentlyBought from "components/products/FrequentlyBought";
import ProductDescription from "components/products/ProductDescription";
import ProductIntro from "components/products/ProductIntro";
import ProductReview from "components/products/ProductReview";
import RelatedProducts from "components/products/RelatedProducts";
import { H2 } from "components/Typography";
import bazarReactDatabase from "data/bazar-react-database";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import CardIIntro from "../../../src/components/product-cards/CardIntro";
import { getSession, useSession } from "next-auth/react";
import SaleLayout2 from "../../../src/components/layouts/SaleLayout2";
import BackendManager from "../../../src/globalManager/BackendManager";
import CardIntro from "../../../src/components/product-cards/CardIntro";
const StyledTabs = styled(Tabs)(({ theme }) => ({
  minHeight: 0,
  marginTop: 80,
  marginBottom: 24,
  borderBottom: `1px solid ${theme.palette.text.disabled}`,
  "& .inner-tab": {
    minHeight: 40,
    fontWeight: 600,
    textTransform: "capitalize",
  },
})); // ===============================================================

// ===============================================================
const ProductDetails = ({ data, list }) => {
  console.log(data);
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(data);
  const [selectedOption, setSelectedOption] = useState(0);

  useEffect(() => {
    if (id) {
      const productData = bazarReactDatabase.find(
        (item) => item.id === parseInt(`${id}`)
      );
      setProduct(productData);
    }
  }, [id]);

  const handleOptionClick = (_, newValue) => {
    setSelectedOption(newValue);
  };

  return (
    <NavbarLayout list={list}>
      {data && (
        <CardIntro
          imgGroup={data.logo_url}
          title={data.title}
          id={data.id}
          mainCatigory={data.title}
          items={data.items}
        />
      )}
    </NavbarLayout>
  );
};

export default ProductDetails;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const id = context.query.id;

  // const popularProducts = await BackendManager.getPopularProducts(id);
  const { cookies } = context.req;

  const [relatedProducts, list] = await Promise.all([
    BackendManager.getRelatedProducts(id),
    BackendManager.getCategoryList(cookies.countryId ? cookies.countryId : "1"),
  ]);
  let data = await BackendManager.getCategoryById(id);
  console.log(data);
  return {
    props: { data, relatedProducts, list },
  };
}
