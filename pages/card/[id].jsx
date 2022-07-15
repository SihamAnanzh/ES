import { Container, Grid, Pagination } from "@mui/material";
import { FlexBetween } from "components/flex-box";
import SaleLayout2 from "components/layouts/SaleLayout2";
import Card from "components/product-cards/Card";
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
  return (
    <SaleLayout2
      sx={{
        background: "#fff",
      }}
      list={data}
    >
      <Container
        sx={{
          mt: 4,
          background: "#fff",
        }}
      >
        <Grid
          sx={{
            background: "#fff",
          }}
          container
          spacing={3}
          minHeight={500}
        >
          {singleCategory.map((item, ind) => {
            {
              <Grid item lg={3} md={4} sm={6} xs={12} key={ind}>
                <Card
                  id={item.id}
                  title={item.title}
                  imgUrl={item.logo_url}
                  items={item.items}
                />
              </Grid>;
            }
          })}
          {/* {singleCategory.items.map((item, ind) => (
            <Grid item lg={3} md={4} sm={6} xs={12} key={ind}>
              <Card
                id={item.id}
                title={item.title}
                imgUrl={item.logo_url}
                items={item.items}
              />
            </Grid>
          ))} */}
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
