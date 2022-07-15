const url = process.env.endPoint;
import axios from "axios";
import { useRouter } from "next/router";
const BackendManager = {};

BackendManager.getCategoryList = async (id, lang) => {
  const res = await axios({
    method: "GET",
    url: url + "/category/list",
    headers: {
      lang: lang,
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
BackendManager.getCategoryById = async (id, lang) => {
  const res = await axios({
    method: "GET",
    url: url + "/category/" + id,
    headers: {
      lang: lang,
      limit: 5,
      offset: 0,
    },
  });

  return res.data.results;
};

BackendManager.getCountryList = async (lang) => {
  const res = await axios({
    method: "GET",
    url: url + "/country/list",
    headers: {
      lang: lang,
    },
  });

  return res.data.results;
};

BackendManager.getUserProfile = async (token) => {
  const res = await axios({
    method: "GET",
    url: url + "/user/profile",
    headers: {
      Authorization: token,
    },
  });
  return res.data.results;
};

BackendManager.updateUserProfile = async (token, updatedData, lang) => {
  const res = await axios({
    method: "Post",
    url: url + "/user/update_account/",
    headers: {
      lang: lang,
      Authorization: token,
    },
    data: updatedData,
  });

  return res;
};

BackendManager.getUserOrders = async (token, lang) => {
  const res = await axios({
    method: "GET",
    url: url + "/user/orders/list",
    headers: {
      lang: lang,
      Authorization: token,
    },
  });

  return res.data.results;
};

BackendManager.getOrderById = async (token, id, lang) => {
  const res = await axios({
    method: "GET",
    url: url + "/user/orders/" + id,
    headers: {
      lang: lang,
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
      limit: "5",
      offset: "0",
    },
  });
  console.log(res.data);
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

BackendManager.resetPassword = async (email, lang) => {
  const res = await axios({
    method: "POST",
    url: url + "/user/forget_password",
    headers: {
      lang: lang,
    },
    data: { username: email },
  });
  return res;
};

BackendManager.getCountryById = async (id, lang) => {
  const res = await axios({
    method: "get",
    url: url + "/country/" + id,
    headers: {
      lang: lang,
    },
  });

  return res.data.results;
};

BackendManager.getItemslistById = async (id, lnag) => {
  const res = await axios({
    method: "get",
    url: url + "/items/list/" + id,
    headers: {
      lang: lnag,
    },
  });
  return res.data.results;
};
BackendManager.getOgCatgeroyById = async (id, lang) => {
  const res = await axios({
    method: "get",
    url: url + "/og/category/services/" + id,
    headers: {
      lang: lang,
    },
  });
  return res.data.results;
};
BackendManager.getServicByid = async (id, lang) => {
  const res = await axios({
    method: "get",
    url: url + "/og/service/" + id,
    headers: {
      lang: lang,
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
  console.log(data);
  const res = await axios({
    method: "post",
    url: url + "/user/orders/add",
    headers: {
      lang: "en",
      Authorization: token,
    },
    data: {
      category_id: Number(data.id),
      is_quickpay: data.quick,
      details: data.items,
    },
  });
  console.log(res);
  return res.data;
};

BackendManager.tapPaymentCheckOutValidat = async (data, token, lang) => {
  console.log("token", token);
  const res = await axios({
    method: "post",
    url: url + "/user/order/validate_checkout",
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
  return res.data;
};

BackendManager.getQuickPayList = async (token, lang) => {
  const res = await axios({
    method: "get",
    url: url + "/user/orders/quickpay",
    headers: {
      lang: lang,
      Authorization: token,
    },
  });
  return res.data.results;
};

BackendManager.searchResult = async (message, id) => {
  const res = await axios({
    method: "post",
    url: url + "/items/search",
    headers: {
      lang: "en",
    },
    data: {
      search_criteria: message,
      category_id: Number(id),
    },
  });
  console.log("backend Results ", res.data);
  return res.data.results;
};

BackendManager.getWhatsappNumber = async () => {
  const res = await axios({
    method: "get",
    url: url + "/app_settings/whatspp_number",
    headers: {
      lang: "en",
    },
  });

  return res.data.results;
};

export default BackendManager;
