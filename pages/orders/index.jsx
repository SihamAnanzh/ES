import ShoppingBag from "@mui/icons-material/ShoppingBag";
import CustomerDashboardLayout from "components/layouts/customer-dashboard";
import CustomerDashboardNavigation from "components/layouts/customer-dashboard/Navigations";
import DashboardPageHeader from "components/layouts/DashboardPageHeader";
import OrderList from "pages-sections/orders/OrderList";
import React from "react";
import { getSession } from "next-auth/react";
import BackEndManager from "../../src/globalManager/BackendManager";
const Orders = ({ orderList }) => {
  return (
    <CustomerDashboardLayout>
      <DashboardPageHeader
        title="My Orders"
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
  const orderList = [];
  const lists = await BackEndManager.getUserOrders(session.user);

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
    props: { orderList },
  };
}
