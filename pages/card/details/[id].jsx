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
import { getSession, useSession } from "next-auth/react";
import SaleLayout2 from "../../../src/components/layouts/SaleLayout2";
import BackendManager from "../../../src/globalManager/BackendManager";
import CardIntro from "../../../src/components/product-cards/CardIntro";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

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
const ProductDetails = ({ data, list, relatedProducts }) => {
  const router = useRouter();
  const [product, setProduct] = useState(data);
  const [selectedOption, setSelectedOption] = useState(0);

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

      <RelatedProducts productsData={relatedProducts} />
    </NavbarLayout>
  );
};

export default ProductDetails;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const id = context.query.id;
  const { locale } = context;
  // const popularProducts = await BackendManager.getPopularProducts(id);
  const { cookies } = context.req;
  let data = await BackendManager.getCategoryById(id, locale);
  console.log(data);
  const [relatedProducts, list] = await Promise.all([
    BackendManager.getRelatedProducts(data.items[0].id, locale),
    BackendManager.getCategoryList(
      cookies.countryId ? cookies.countryId : "1",
      locale
    ),
  ]);
  console.log("relatedProducts", relatedProducts);

  return {
    props: {
      data,
      relatedProducts,
      list,
      relatedProducts,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
