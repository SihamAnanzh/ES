const url = process.env.endPoint;
import axios from "axios";
import { useRouter } from "next/router";
const BackendManager = {};

BackendManager.getCategoryList = async (id) => {
  const res = await axios({
    method: "GET",
    url: url + "/category/list",
    headers: {
      lang: "en",
      limit: 11,
      country_id: id,
    },
  });
  return res.data.results;
};

BackendManager.getProdcutsList = async () => {
  const res = await axios({
    method: "GET",
    url: url + "/items/list",
    headers: {
      lang: "en",
      limit: 11,
    },
  });
  return res.data;
};
BackendManager.getCategoryById = async (id) => {
  const res = await axios({
    method: "GET",
    url: url + "/category/" + id,
    headers: {
      lang: "en",
    },
  });

  return res.data.results;
};

BackendManager.getCountryList = async () => {
  const res = await axios({
    method: "GET",
    url: url + "/country/list",
    headers: {
      lang: "en",
    },
  });

  return res.data.results;
};

BackendManager.getUserProfile = async (token) => {
  const res = await axios({
    method: "GET",
    url: url + "/user/profile",
    headers: {
      lang: "en",
      Authorization: token,
    },
  });
  return res.data.results;
};

BackendManager.updateUserProfile = async (token, updatedData) => {
  const res = await axios({
    method: "Post",
    url: url + "/user/update_account/",
    headers: {
      lang: "en",
      Authorization: token,
    },
    data: updatedData,
  });

  return res.data.status.message;
};

BackendManager.getUserOrders = async (token) => {
  const res = await axios({
    method: "GET",
    url: url + "/user/orders/ongoing/list",
    headers: {
      lang: "en",
      Authorization: token,
    },
  });

  return res.data.results;
};

BackendManager.getOrderById = async (token, id) => {
  const res = await axios({
    method: "GET",
    url: url + "/user/orders/" + id,
    headers: {
      lang: "en",
      Authorization: token,
    },
  });
  return res.data.results;
};

BackendManager.getItemById = async (id) => {
  const res = await axios({
    method: "GET",
    url: url + "/item/details/" + id,
    headers: {
      lang: "en",
    },
  });
  return res.data.results;
};

BackendManager.getRelatedProducts = async (id) => {
  const res = await axios({
    method: "GET",
    url: url + "/items/similar/" + id,
    headers: {
      lang: "en",
    },
  });
  return res.data.results;
};
BackendManager.getPopularProducts = async (id) => {
  const res = await axios({
    method: "GET",
    url: url + "/items/popular/list" + id,
    headers: {
      lang: "en",
    },
  });
  return res.data.results;
};

BackendManager.resetPassword = async (email) => {
  const res = await axios({
    method: "POST",
    url: url + "/user/forget_password",
    headers: {
      lang: "en",
    },
    data: { username: email },
  });
  return res.data.results;
};

BackendManager.getCountryById = async (id) => {
  const res = await axios({
    method: "get",
    url: url + "/country/" + id,
    headers: {
      lang: "en",
    },
  });
  return res.data.results;
};
BackendManager.getOgCatgeroyById = async (id) => {
  const res = await axios({
    method: "get",
    url: url + "/og/category/services/" + id,
    headers: {
      lang: "en",
    },
  });
  return res.data.results;
};

BackendManager.getOgLinkCheckout = async (dataObjects, phoneNumner) => {
  const res = await axios({
    method: "post",
    url: url + "/og/payment/get_link",
    headers: {
      lang: "en",
    },
    data: {
      amount: dataObjects.value,
      msisdn: phoneNumner,
      timestamp: "20211212",
      description: "description",
      description2: "description2",
    },
  });
  return res.data.results;
};

BackendManager.PurchasePackageTap = async (data, token) => {
  const res = await axios({
    method: "post",
    url: url + "/user/orders/add",
    headers: {
      lang: "en",
      Authorization: token,
    },
    data: {
      category_id: data.id,
      is_quickpay: data.quick,
      details: data.items,
    },
  });
  console.log(res);
  return res.data.results;
};

export default BackendManager;
