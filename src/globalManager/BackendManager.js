const url = process.env.endPoint;
import axios from "axios";
import { useRouter } from "next/router";
const BackendManager = {};

BackendManager.getCategoryList = async () => {
  const res = await axios({
    method: "GET",
    url: url + "/category/list",
    headers: {
      lang: "en",
      limit: 11,
    },
  });
  return res.data;
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
    url: url + "user/profile",
    headers: {
      lang: "en",
      Authorization: token,
    },
  });

  return res.data.results;
};

BackendManager.updateUserProfile = async (token, updatedData) => {
  const res = await axios({
    method: "PSOT",
    url: url + "/user/update_account",
    headers: {
      lang: "en",
      Authorization: token,
    },
    data: updatedData,
  });

  return res.data.results;
};

BackendManager.getUserOrders = async (token) => {
  const res = await axios({
    method: "GET",
    url: url + "/user/orders/list",
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

  return res.data.results.details;
};

export default BackendManager;
