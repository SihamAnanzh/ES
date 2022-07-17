import { Container, Grid, Pagination } from "@mui/material";
import { FlexBetween } from "components/flex-box";
import SaleLayout2 from "components/layouts/SaleLayout2";
import ServiceCard from "../../src/components/product-cards/ServiceCard";
import { Span } from "components/Typography";
import { renderProductCount } from "lib";
import { useEffect, useState } from "react";
import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import BackendManager from "../../src/globalManager/BackendManager";
const Index = ({ data, singleCategoryData }) => {
  const productPerPage = 28;
  const [page, setPage] = useState(1);
  const [productList, setProductList] = useState([]);
  const [singleCategory, setSingleCategory] = useState([singleCategoryData]);
  const handlePageChange = (_, page) => setPage(page);

  console.log(singleCategoryData);
  return (
    <SaleLayout2 title={singleCategoryData.title} list={data}>
      <Container
        sx={{
          mt: 4,
        }}
      >
        <Grid
          container
          spacing={3}
          minHeight={500}
          style={{
            justifyContent: "flex-start",
          }}
        >
          {singleCategory.map((item, ind) =>
            item.has_subcategories
              ? item.subcategories.map((item) => (
                  <Grid item lg={3} md={4} sm={6} xs={12} key={ind}>
                    <ServiceCard
                      id={item.id}
                      title={item.title}
                      imgUrl={item.logo_url}
                      isCard={item.is_card}
                      price={item.price}
                      newPrice={item.mewPrice}
                      items={item.denominations}
                    />
                  </Grid>
                ))
              : ""
          )}
          {/* {singleCategory.map(
            (item, ind) =>
              item.items &&
              item.items.map(
                (data) => (
                  console.log(data),
                  (
                    <Grid item lg={3} md={4} sm={6} xs={12} key={ind}>
                      <ProductCard1
                        id={data.id}
                        title={data.title}
                        imgUrl={data.images[0].image_url}
                        haveIcon={false}
                        notProduct={false}
                        newPrice={data.new_price}
                        price={data.price}
                      />
                    </Grid>
                  )
                )
              )
          )} */}
        </Grid>

        <FlexBetween flexWrap="wrap" my={8}>
          <Span>
            {renderProductCount(page, productPerPage, productPerPage.length)}
          </Span>

          {/* <Pagination
            page={page}
            color="primary"
            variant="outlined"
            onChange={handlePageChange}
            count={Math.ceil(productPerPage.length / productPerPage)}
          /> */}
        </FlexBetween>
      </Container>
    </SaleLayout2>
  );
};

export default Index;
export async function getServerSideProps(context) {
  let data = [{}];
  let id = context.query.id;
  const { cookies } = context.req;
  const { locale } = context;

  const [categoryList, singleCategoryData] = await Promise.all([
    BackendManager.getCategoryList(
      cookies.countryId ? cookies.countryId : "1",
      locale
    ),
    BackendManager.getCategoryById(id, locale),
  ]);

  return {
    props: {
      data: categoryList,
      singleCategoryData,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
