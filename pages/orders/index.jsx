import ShoppingBag from "@mui/icons-material/ShoppingBag";
import CustomerDashboardLayout from "components/layouts/customer-dashboard";
import CustomerDashboardNavigation from "components/layouts/customer-dashboard/Navigations";
import DashboardPageHeader from "components/layouts/DashboardPageHeader";
import OrderList from "pages-sections/orders/OrderList";
import React, { useEffect } from "react";
import { getSession, useSession } from "next-auth/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { toast, ToastContainer } from "react-toastify";
import BackEndManager from "../../src/globalManager/BackendManager";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import BackendManager from "../../src/globalManager/BackendManager";
const Orders = ({ orderList }) => {
  const route = useRouter();
  const session = useSession();

  const { t } = useTranslation();
  const getTrans = (key) => {
    return t(`common:${key}`);
  };

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("order")) !== null) {
      if (goSell) {
        goSell.showResult({
          callback: async (response) => {
            if (response.callback.status === "CAPTURED") {
              console.log(response);
              let orderDetails = JSON.parse(localStorage.getItem("order"));
              localStorage.setItem("order", JSON.stringify(null));
              console.log(orderDetails);
              if (session.data) {
                let res = await BackendManager.PurchasePackageTap(
                  orderDetails,
                  session.data.user,
                  route.locale
                );
                console.log(res);
                if (res.status.code == 400) {
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
                if (res.status.code == 200) {
                  toast.success(res.status.message, {
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
              } else {
                toast.warn(getTrans("Somethingwrongtrylater"), {
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
            }
          },
        });
      }
    }
  }, [route, session]);

  return (
    <CustomerDashboardLayout>
      <DashboardPageHeader
        title={getTrans("MyOrders")}
        icon={ShoppingBag}
        navigation={<CustomerDashboardNavigation />}
      />
      <OrderList orderList={orderList} />
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
