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
import SaleLayout2 from "../../src/components/layouts/SaleLayout2";
import BackendManager from "../../src/globalManager/BackendManager";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import TelecomIntro from "../../src/components/product-cards/TelecomIntro";
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
const ProductDetails = ({ data }) => {
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
      {data && (
        <TelecomIntro
          imgGroup={data.imageUrl}
          title={data.serviceName}
          id={data.serviceID}
          mainCatigory={data.serCategory}
          items={data.denominations}
          serviceType={data.serviceType}
        />
      )}
    </NavbarLayout>
  );
};

export default ProductDetails;

export async function getServerSideProps(context) {
  const id = context.query.id;
  const { locale } = context;
  let data = await BackendManager.getOgCatgeroyById(id, locale);

  return {
    props: { data, ...(await serverSideTranslations(locale, ["common"])) },
  };
}
