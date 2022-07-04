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
const SalePage2 = ({ categoryList, product, csrfToken, providers }) => {
  const productPerPage = 28;
  const [page, setPage] = useState(1);
  const [productList, setProductList] = useState([]);

  const handlePageChange = (_, page) => setPage(page);

  // useEffect(() => {
  //   setProductList(
  //     product.slice(page * productPerPage, (page + 1) * productPerPage)
  //   );
  // }, [page]);
  const session = useSession();

  const { state, dispatch } = useAppContext();

  const handleCartAmountChange = (product, amount) => {
    dispatch({
      type: "CHANGE_CART_AMOUNT",
      payload: { ...product, qty: amount },
    });
  };

  useEffect(() => {
    let items = JSON.parse(localStorage.getItem("cart"));

    items.map(async (data) => {
      let res = await BackendManager.getItemById(data.id);
      handleCartAmountChange(
        {
          name: res.title,
          qty: data.qty,
          price: res.new_price,
          imgUrl: res.images[0].image_url,
          id: res.id,
        },
        data.qty
      );
    });
  }, []);
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);

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
          {product.map((item, ind) => (
            <Grid item lg={3} md={4} sm={6} xs={12} key={item.id}>
              <ProductCard1
                id={item.id}
                price={item.price}
                imgUrl={item.images[0].image_url}
                newPrice={item.new_price}
                haveIcon={false}
                notProduct={false}
                {...item}
              />
            </Grid>
          ))}
        </Grid>

        <FlexBetween flexWrap="wrap" my={8}>
          <Span>
            {renderProductCount(page, productPerPage, product.length)}
          </Span>

          {/* <Pagination
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

  const [categoryList, product] = await Promise.all([
    BackendManager.getCategoryList(cookies.countryId ? cookies.countryId : "1"),
    BackendManager.getProdcutsList(),
  ]);

  let csrfToken = await getCsrfToken(context);
  const providers = await getProviders();
  return {
    props: { categoryList, product: product.results, providers, csrfToken },
  }; // will be passed to the page component as props
}
