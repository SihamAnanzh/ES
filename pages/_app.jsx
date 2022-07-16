import "../styles/styles.css";
import RTL from "components/RTL";
import { AppProvider } from "contexts/AppContext";
import SettingsProvider from "contexts/SettingContext";
import Head from "next/head";
import Router from "next/router";
import nProgress from "nprogress";
import "nprogress/nprogress.css";
import { Fragment, useCallback, useContext, useEffect, useState } from "react";
// import "react-quill/dist/quill.snow.css";
import "simplebar/dist/simplebar.min.css";
import MuiTheme from "theme/MuiTheme";
import GoogleAnalytics from "utils/GoogleAnalytics";
import OpenGraphTags from "utils/OpenGraphTags";
import { appWithTranslation, useTranslation } from "next-i18next";
import { getSession, SessionProvider, useSession } from "next-auth/react";
import { useAppContext } from "contexts/AppContext";
import BackendManager from "../src/globalManager/BackendManager";
import { getCookie } from "cookies-next";
import "react-toastify/dist/ReactToastify.css";

//Binding events.
Router.events.on("routeChangeStart", () => nProgress.start());
Router.events.on("routeChangeComplete", () => nProgress.done());
Router.events.on("routeChangeError", () => nProgress.done()); // small change

nProgress.configure({
  showSpinner: false,
});

const App = ({ Component, pageProps }) => {
  const getLayout = Component.getLayout ?? ((page) => page);
  const { state, dispatch } = useAppContext();
  const cartList = state.cart;

  // const handleCartAmountChange = (product, amount) => {
  //   console.log("Product in dispatch", product);
  //   dispatch({
  //     type: "CHANGE_CART_AMOUNT",
  //     payload: product,
  //   });
  //   console.log("Cart Context: ", state.cart);
  // };

  const handleCartAmountChange = useCallback(
    (product, amount) => () => {
      dispatch({
        type: "CHANGE_CART_AMOUNT",
        payload: { ...product, qty: amount },
      });
      console.log("State Cart: ", state.cart);
    },
    []
  );

  useEffect(async () => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");

    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }

    let items = JSON.parse(localStorage.getItem("cart"));
    items &&
      items.map(async (data) => {
        let res = await BackendManager.getItemById(data.id);

        let product = {
          name: res.title,
          qty: data.qty,
          price: res.new_price,
          imgUrl: res.category.logo_url,
          id: res.id,
        };
        dispatch({
          type: "CHANGE_CART_AMOUNT",
          payload: { ...product, qty: data.qty },
        });
      });
  }, []);

  return (
    <Fragment>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />

        <GoogleAnalytics />
        <OpenGraphTags />
      </Head>
      <SessionProvider session={pageProps.session}>
        <SettingsProvider>
          <AppProvider>
            <MuiTheme>
              <RTL>{getLayout(<Component {...pageProps} />)}</RTL>
            </MuiTheme>
          </AppProvider>
        </SettingsProvider>
      </SessionProvider>
    </Fragment>
  );
}; // Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// App.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//   return { ...appProps };
// };

export default appWithTranslation(App);
export async function getServerSideProps(context) {
  const { locale } = context;

  return {
    props: {
      ...(await serverSideTranslations(locale, ["default"])),
    },
  }; // will be passed to the page component as props
}
