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
    <Box mb={7.5} height="auto" pb={2}>
      <H3 mb={3} p={2}>
        {getTrans("RelatedProducts")}
      </H3>
      <Grid
        container
        spacing={1}
        minHeight={500}
        className="card-contanier"
        rowSpacing={2}
      >
        {productsData &&
          productsData.map((item, ind) => (
            <Grid item lg={3} md={4} sm={6} xs={6} key={ind}>
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
