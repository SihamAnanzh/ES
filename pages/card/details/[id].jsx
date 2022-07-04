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
const ProductDetails = (props) => {
  const { data, relatedProducts } = props;

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
    <NavbarLayout>
      <CardIntro
        imgGroup={data.logo_url}
        title={data.title}
        id={data.id}
        mainCatigory={data.title}
        items={data.items}
      />

      <RelatedProducts productsData={relatedProducts} />
    </NavbarLayout>
  );
};

export default ProductDetails;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const id = context.query.id;
  // const popularProducts = await BackendManager.getPopularProducts(id);

  const [relatedProducts, res] = await Promise.all([
    BackendManager.getRelatedProducts(id),
    BackendManager.getCategoryById(id),
  ]);

  return {
    props: { data: res, relatedProducts },
  };
}
