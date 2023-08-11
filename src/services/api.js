import axios from "axios";
import configs from "../config";

export const Register = async (payload) => {
    // {
    //     firstName: "deji",
    //     lastName: "sarumi",
    //     email: "devferanmi@gmail.com",
    //     password: "password",
    //   }
  var data = JSON.stringify(payload);
  var config = {
    method: "post",
    url: `${configs.USER_SERVICE_URL}/auth/register`,
    headers: {
      appKey: configs.USER_SERVICE_KEY,
      "Content-Type": "application/json",
    },
    data: data,
  };
  try {
    const req = await axios(config);
    return {
      success: true,
      ...req.data,
    };
  } catch (err) {
    return {
      success: false,
      message: err?.response?.data?.message || "Request failed ",
    };
  }
};

export const Login = async (payload) => {
    // {
    //     email: "devferanmi@gmail.com",
    //     password: "password",
    //   }
  var data = JSON.stringify(payload);
  var config = {
    method: "post",
    url: `${configs.USER_SERVICE_URL}/auth/login`,
    headers: {
      appKey: configs.USER_SERVICE_KEY,
      "Content-Type": "application/json",
    },
    data: data,
  };
  try {
    const req = await axios(config);
    return {
      success: true,
      ...req.data,
    };
  } catch (err) {
    return {
      success: false,
      message: err?.response?.data?.message || "Request failed ",
    };
  }
};

export const CreateEmail = async (payload, token) => {
    // {
    //     email: "devferanmi@gmail.com",
    //     password: "password",
    //   }
  var data = JSON.stringify(payload);
  var config = {
    method: "post",
    url: `${configs.API_BASE_URL}/email/create`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };
  try {
    const req = await axios(config);
    return {
      success: true,
      ...req.data,
    };
  } catch (err) {
    return {
      success: false,
      message: err?.response?.data?.message || "Request failed ",
    };
  }
}