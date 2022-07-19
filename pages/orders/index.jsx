import ShoppingBag from "@mui/icons-material/ShoppingBag";
import CustomerDashboardLayout from "components/layouts/customer-dashboard";
import CustomerDashboardNavigation from "components/layouts/customer-dashboard/Navigations";
import DashboardPageHeader from "components/layouts/DashboardPageHeader";
import OrderList from "pages-sections/orders/OrderList";
import React, { useEffect, useState } from "react";
import { getSession, useSession } from "next-auth/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { toast, ToastContainer } from "react-toastify";
import BackEndManager from "../../src/globalManager/BackendManager";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import BackendManager from "../../src/globalManager/BackendManager";
import { useAppContext } from "contexts/AppContext";
import Head from "next/head";
const Orders = ({ orderList }) => {
  const route = useRouter();
  const session = useSession();
  const { state, dispatch } = useAppContext();
  const { t } = useTranslation();
  const [listOrders, setListOrders] = useState(orderList);
  const getTrans = (key) => {
    return t(`common:${key}`);
  };
  const handleClearCart = (product) => {
    dispatch({
      type: "CHANGE_CART_AMOUNT",
      payload: { ...product, qty: 0 },
    });
  };

  const clearCart = () => {
    state.cart.map((item) => {
      handleClearCart(item);
    });
  };

  useEffect(() => {
    console.log("trgger");
    if (route.query.tap_id) {
      if (goSell) {
        goSell.showResult({
          callback: async (response) => {
            console.log(response);
            if (response.callback.response.code == "000") {
              localStorage.setItem(
                "transaction",
                JSON.stringify(response.callback.response.code)
              );
            } else if (response.callback.response.code == "401") {
              toast.warn("transaction failed try again", {
                position: "top-center",
                autoClose: 5005,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                autoClose: false,
              });
            }
          },
        });
      }
    }

    if (JSON.parse(localStorage.getItem("transaction")) == "000") {
      if (session.data) {
        let orderDetails = JSON.parse(localStorage.getItem("order"));

        let res = BackendManager.PurchasePackageTap(
          orderDetails,
          session.data.user,
          route.locale
        ).then((res) => {
          localStorage.setItem("transaction", null);
          localStorage.setItem("order", JSON.stringify(null));
          console.log(res);

          if (res.status.code == 200) {
            clearCart();
            toast.success(res.results, {
              position: "top-center",
              autoClose: 5005,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              autoClose: false,
            }),
              location.reload();
          } else if (res.status.code == 400) {
            toast.warn(res.status.message, {
              position: "top-center",
              autoClose: 5005,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              autoClose: false,
            });
          }
        });
      }
    }

    setListOrders(orderList);
  }, [session]);

  return (
    <CustomerDashboardLayout>
      <Head>
        <title>Orders</title>
      </Head>
      <DashboardPageHeader
        title={getTrans("MyOrders")}
        icon={ShoppingBag}
        navigation={<CustomerDashboardNavigation />}
      />
      <OrderList orderList={listOrders} />
    </CustomerDashboardLayout>
  );
};

export default Orders;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const { locale } = context;

  const orderList = [];
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/" + locale,
      },
    };
  }
  const lists = await BackEndManager.getUserOrders(session.user, locale);
  lists.map((list, ind) => {
    orderList.push({
      currency: list.currency_id == "1" ? "USD" : list.currency_id,
      orderNo: list.id,
      status: list.order_status.title,
      purchaseDate: list.date_string,
      price: list.total,
      href: "/orders/" + list.id,
    });
  });

  return {
    props: { orderList, ...(await serverSideTranslations(locale, ["common"])) },
  };
}
