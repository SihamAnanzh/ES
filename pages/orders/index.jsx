import ShoppingBag from "@mui/icons-material/ShoppingBag";
import CustomerDashboardLayout from "components/layouts/customer-dashboard";
import CustomerDashboardNavigation from "components/layouts/customer-dashboard/Navigations";
import DashboardPageHeader from "components/layouts/DashboardPageHeader";
import OrderList from "pages-sections/orders/OrderList";
import React from "react";
import { getSession } from "next-auth/react";
import BackEndManager from "../../src/globalManager/BackendManager";
const Orders = ({}) => {
  return (
    <CustomerDashboardLayout>
      <DashboardPageHeader
        title="My Orders"
        icon={ShoppingBag}
        navigation={<CustomerDashboardNavigation />}
      />

      <OrderList />
    </CustomerDashboardLayout>
  );
};

export default Orders;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  // const orderList = BackEndManager.getUserOrders(session.user);

  return {
    props: {},
  };
}
