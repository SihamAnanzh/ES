import { Container, Grid, Pagination } from "@mui/material";
import { FlexBetween } from "components/flex-box";
import SaleLayout2 from "components/layouts/SaleLayout2";
import ProductCard1 from "components/product-cards/ProductCard1";
import { Span } from "components/Typography";
import { renderProductCount } from "lib";
import { useEffect, useState } from "react";
import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import BackendManager from "../../src/globalManager/BackendManager";
const Index = ({ data, singleCategoryData, mainID }) => {
  const [page, setPage] = useState(1);

  // useEffect(() => {
  //   setProductList(
  //     product.slice(page * productPerPage, (page + 1) * productPerPage)
  //   );
  // }, [page]);

  return (
    <SaleLayout2
      title={singleCategoryData.title}
      sx={{ background: "red" }}
      list={data}
    >
      <Container
        sx={{
          mt: 4,
        }}
      >
        <Grid container spacing={3} minHeight={500} className="card-contanier">
          {singleCategoryData && singleCategoryData.has_subcategories ? (
            singleCategoryData.subcategories.map((item, ind) => (
              <Grid item lg={3} md={4} sm={6} xs={12} key={ind}>
                <ProductCard1
                  id={item.id}
                  title={item.title}
                  imgUrl={item.logo_url}
                  haveIcon={false}
                  notProduct={true}
                  isCard={!item.items ? false : true}
                  mainID={mainID}
                />
              </Grid>
            ))
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

  console.log("singleCategoryData", singleCategoryData);
  return {
    props: {
      data: categoryList,
      singleCategoryData,
      mainID: id,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
