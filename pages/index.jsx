import { Container, Grid, Pagination } from "@mui/material";
import { FlexBetween } from "components/flex-box";
import SaleLayout2 from "components/layouts/SaleLayout2";
import ProductCard1 from "components/product-cards/ProductCard1";
import { Span } from "components/Typography";
import { renderProductCount } from "lib";
import { useEffect, useState } from "react";
import BackendManager from "../src/globalManager/BackendManager";
const SalePage2 = ({ data, product }) => {
  const productPerPage = 28;
  const [page, setPage] = useState(1);
  const [productList, setProductList] = useState([]);

  const handlePageChange = (_, page) => setPage(page);

  // useEffect(() => {
  //   setProductList(
  //     product.slice(page * productPerPage, (page + 1) * productPerPage)
  //   );
  // }, [page]);
  return (
    <SaleLayout2 list={data}>
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
                haveIcon={true}
                {...item}
              />
            </Grid>
          ))}
        </Grid>

        <FlexBetween flexWrap="wrap" my={8}>
          <Span>
            {renderProductCount(page, productPerPage, product.length)}
          </Span>

          <Pagination
            page={page}
            color="primary"
            variant="outlined"
            onChange={handlePageChange}
            count={Math.ceil(product.length / productPerPage)}
          />
        </FlexBetween>
      </Container>
    </SaleLayout2>
  );
};

export default SalePage2;

export async function getServerSideProps(context) {
  let data = [{}];
  const categoryList = await BackendManager.getCategoryList();
  categoryList.results.map((res) => {
    data.push({ title: res.title, icon: res.logo_url, id: res.id });
  });
  const product = await BackendManager.getProdcutsList();

  return {
    props: { data, product: product.results }, // will be passed to the page component as props
  };
}
