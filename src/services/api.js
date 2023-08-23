import axios from "axios";
import configs from "../config";
export const validateEmail = (email) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}
export const LogUserIn = (userObj) => {

  localStorage.setItem('user', JSON.stringify(userObj));
  localStorage.setItem('token', userObj.token);
}
export const getUser = () => {
  const user = localStorage.getItem('user');
  if(user){
    return JSON.parse(user) || {}
  }
  else {
    window.location.href = "/auth/login";
  }
}
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
  }  catch (err) {
    handleStatusCode(err?.response?.status);
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
  }  catch (err) {
    handleStatusCode(err?.response?.status);
    return {
      success: false,
      message: err?.response?.data?.message || "Request failed ",
    };
  }
};
const getTokenFromLocal = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/auth/login";
    return;
  }
  return token;
};
export const CreateEmail = async (payload) => {
  const token = await getTokenFromLocal();
  // {
  //   "userID": "",
  //   "permanent": true,
  //   "emailName": "myownemail"
  // }
  var data = JSON.stringify(payload);
  var config = {
    method: "post",
    url: `${configs.API_BASE_URL}/email/create`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: data,
  };
  try {
    const req = await axios(config);
    return {
      success: true,
      ...req.data,
    };
  }  catch (err) {
    handleStatusCode(err?.response?.status);
    return {
      success: false,
      message: err?.response?.data?.message || "Request failed ",
    };
  }
};
export const handleStatusCode = (statusCode) => {
  if(statusCode === 403){
    window.location.href = "/auth/login";
  }
}
export const GetUserEmails = async () => {
  const token = await getTokenFromLocal();
  // {
  //   "userID": "",
  //   "permanent": true,
  //   "emailName": "myownemail"
  // }
  var config = {
    method: "get",
    url: `${configs.API_BASE_URL}/emails`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const req = await axios(config);
    return {
      success: true,
      ...req.data,
    };
  } catch (err) {
    handleStatusCode(err?.response?.status);
    return {
      success: false,
      message: err?.response?.data?.message || "Request failed ",
    };
  }
};
export const GetEmails = async (emailID) => {
  const token = await getTokenFromLocal();
  // {
  //   "userID": "",
  //   "permanent": true,
  //   "emailName": "myownemail"
  // }
  var config = {
    method: "get",
    url: `${configs.API_BASE_URL}/emails/${emailID}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const req = await axios(config);
    return {
      success: true,
      ...req.data,
    };
  }  catch (err) {
    handleStatusCode(err?.response?.status);
    return {
      success: false,
      message: err?.response?.data?.message || "Request failed ",
    };
  }
};
export const GetEmailDetails = async (emailID, emailAddressID) => {
  const token = await getTokenFromLocal();
  // {
  //   "userID": "",
  //   "permanent": true,
  //   "emailName": "myownemail"
  // }
  var config = {
    method: "get",
    url: `${configs.API_BASE_URL}/mails/${emailAddressID}/${emailID}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const req = await axios(config);
    return {
      success: true,
      ...req.data,
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: err?.response?.data?.message || "Request failed ",
    };
  }
};
export const GetAllEmails = async (emails) => {
  const email = [];
  for(var i=0; i<emails.length; i++){
    const mail = emails[i];
    const mails = await GetEmails(mail.emailAddressID)
    if(mails.success){
        email.push(mails.emails)
    }
  }
  return email.flat(1);
};
