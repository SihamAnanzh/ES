import { Box, Grid } from "@mui/material";
import ProductCard1 from "components/product-cards/ProductCard1";
import { H3 } from "components/Typography";
import React from "react"; // ===================================================
import { useTranslation } from "next-i18next";

// ===================================================
const RelatedProducts = ({ productsData }) => {
  let { t, i18n } = useTranslation();

  const getTrans = (key) => {
    return t(`common:${key}`);
  };
  return (
    <Box mb={7.5}>
      <H3 mb={3}>{getTrans("RelatedProducts")}</H3>
      <Grid container spacing={8}>
        {productsData &&
          productsData.map((item, ind) => (
            <Grid item lg={3} md={4} sm={6} xs={12} key={ind}>
              <ProductCard1
                imgUrl={item.category.logo_url}
                id={item.category.id}
                title={item.title}
                haveIcon={false}
                notProduct={true}
                isCard={true}
              />
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default RelatedProducts;
