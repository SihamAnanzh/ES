import { Container, Grid, Pagination } from "@mui/material";
import { FlexBetween } from "components/flex-box";
import SaleLayout2 from "components/layouts/SaleLayout2";
import ProductCard1 from "components/product-cards/ProductCard1";
import { Span } from "components/Typography";
import { renderProductCount } from "lib";
import { useCallback, useEffect, useState } from "react";
import BackendManager from "../src/globalManager/BackendManager";
import { useAppContext } from "contexts/AppContext";
import { signOut, useSession } from "next-auth/react";
import {
  getCsrfToken,
  getSession,
  getProviders,
  providers,
} from "next-auth/react";
import { getCookie } from "cookies-next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
const SalePage2 = ({ categoryList, product, csrfToken, providers, games }) => {
  const productPerPage = 5;
  const [page, setPage] = useState(1);
  const [productList, setProductList] = useState([]);

  const handlePageChange = (_, page) => setPage(page);
  const { t } = useTranslation();

  const session = useSession();

  const { state, dispatch } = useAppContext();

  const handleCartAmountChange = (product, amount) => {
    dispatch({
      type: "CHANGE_CART_AMOUNT",
      payload: { ...product, qty: amount },
    });
  };

  return (
    <SaleLayout2
      csrfToken={csrfToken}
      providers={providers}
      list={categoryList}
    >
      <Container
        sx={{
          mt: 4,
        }}
      >
        <Grid container spacing={3} minHeight={500}>
          {games.has_subcategories
            ? games.subcategories.map((item) => (
                <Grid item lg={3} md={4} sm={6} xs={12} key={item}>
                  <ProductCard1
                    id={item.id}
                    title={item.title}
                    imgUrl={item.logo_url}
                    haveIcon={false}
                    notProduct={true}
                    isCard={!item.items ? false : true}
                  />
                </Grid>
              ))
            : ""}
        </Grid>

        <FlexBetween flexWrap="wrap" my={8}>
          {/* <Span>
            {renderProductCount(page, productPerPage, product.length)}
          </Span> */}
          {/* 
          <Pagination
            page={page}
            color="primary"
            variant="outlined"
            onChange={handlePageChange}
            count={Math.ceil(product.length / productPerPage)}
          /> */}
        </FlexBetween>
      </Container>
    </SaleLayout2>
  );
};

export default SalePage2;

export async function getServerSideProps(context) {
  const { cookies } = context.req;
  const { locale } = context;

  const [categoryList, product, games] = await Promise.all([
    BackendManager.getCategoryList(
      cookies.countryId ? JSON.parse(cookies.countryId) : "1",
      locale
    ),
    BackendManager.getProdcutsList(),
    BackendManager.getCategoryById("24", locale),
  ]);

  let csrfToken = await getCsrfToken(context);
  const providers = await getProviders();
  return {
    props: {
      categoryList,
      product: product.results,
      providers,
      csrfToken,
      games,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  }; // will be passed to the page component as props
}
