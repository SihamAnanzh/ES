import { Container, Grid, Pagination } from "@mui/material";
import { FlexBetween } from "components/flex-box";
import SaleLayout2 from "components/layouts/SaleLayout2";
import ProductCard1 from "components/product-cards/ProductCard1";
import { Span } from "components/Typography";
import { renderProductCount } from "lib";
import { useEffect, useState } from "react";
import React from "react";
import BackendManager from "../../../src/globalManager/BackendManager";
import { getSession, SessionProvider, useSession } from "next-auth/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import ServiceCard from "../../../src/components/product-cards/ServiceCard";

const Index = ({ data, searchResult }) => {
  const [page, setPage] = useState(1);

  // useEffect(() => {
  //   setProductList(
  //     product.slice(page * productPerPage, (page + 1) * productPerPage)
  //   );
  // }, [page]);

  return (
    <SaleLayout2 sx={{ background: "red" }} list={data}>
      <Container
        sx={{
          mt: 4,
        }}
      >
        <Grid
          container
          spacing={1}
          minHeight={500}
          className="card-contanier"
          rowSpacing={2}
          style={{ justifyContent: "flex-start" }}
        >
          {searchResult.length > 0 ? (
            searchResult.map((item, ind) =>
              item.category.id == 600 ? (
                <Grid item lg={3} md={4} sm={6} xs={6} key={ind}>
                  <ServiceCard
                    id={item.id}
                    title={item.title}
                    imgUrl={item.category.logo_url}
                    isCard={item.is_card}
                    price={item.price}
                    newPrice={item.mewPrice}
                    items={item.denominations}
                  />
                </Grid>
              ) : (
                <Grid item lg={3} md={4} sm={6} xs={6} key={ind}>
                  <ProductCard1
                    id={item.category.id}
                    title={item.title}
                    imgUrl={item.category.logo_url}
                    haveIcon={false}
                    notProduct={true}
                    isCard={true}
                  />
                </Grid>
              )
            )
          ) : (
            <>
              <h1>No Content Found</h1>
            </>
          )}
        </Grid>

        <FlexBetween flexWrap="wrap" my={8}>
          {/* <Span>
            {renderProductCount(page, productPerPage, productPerPage.length)}
          </Span> */}
          {/* 
          <Pagination
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
  let criteria = context.query.f;
  let categoryId = context.query.id;
  const { cookies } = context.req;
  const { locale } = context;

  const [categoryList, searchResult] = await Promise.all([
    BackendManager.getCategoryList(
      cookies.countryId ? cookies.countryId : "1",
      locale
    ),
    BackendManager.searchResult(criteria, 0, locale),
  ]);

  console.log(searchResult);
  return {
    props: {
      data: categoryList,
      searchResult,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
