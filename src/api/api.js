import { api } from "../config/axios";

export const APIlogin = (userName, passWord) =>
  api.post("login", { username: userName, password: passWord });
export const APIForgotpass = (email) =>
  api.post("forgot-password", { email: email });
export const APIResetPass = (password, token) =>
  api.post(
    "reset-password",
    { password: password },
    { headers: { Authorization: `Bearer ${token}` } }
  );
export const APIUpdateProfile = (profile, token, id) =>
  api.put(
    "account",
    {
      fullname: profile.fullname,
      address: profile.address,
      birthday: profile.birthday,
      email: profile.email,
      phone: profile.phone,
      id: id,
    },
    { headers: { Authorization: `Bearer ${token}` } }
  );
export const APIregis = (
  userName,
  passWord,
  fullName,
  email,
  phone,
  address,
  birthday
) =>
  api.post("register", {
    username: userName,
    password: passWord,
    fullname: fullName,
    email: email,
    phone: phone,
    address: address,
    birthday: birthday,
  });
export const APIgetallacount = (token) =>
  api.get("accounts", { headers: { Authorization: `Bearer ${token}` } });
export const APIregishaverole = (
  userName,
  passWord,
  fullName,
  email,
  phone,
  address,
  birthday,
  role,
  token
) =>
  api.post("account/register", {
    username: userName,
    password: passWord,
    fullname: fullName,
    email: email,
    phone: phone,
    address: address,
    birthday: birthday,
    role: role,
    headers: { Authorization: `Bearer ${token}` },
  });
export const APIgetallrequest = (token) =>
  api.get("auctionRequest", {
    headers: { Authorization: `Bearer ${token}` },
  });
export const APIgetallrequestUser = (token) =>
  api.get("auctionRequest/accountCurrent", {
    headers: { Authorization: `Bearer ${token}` },
  });
export const APIauctionrequestsell = (
  jewelryName,
  jewelryDescription,
  jewelryInitialPrice,
  resourceRequests,
  token
) =>
  api.post(
    "auctionRequest",
    {
      jewelryName: jewelryName,
      jewelrydescription: jewelryDescription,
      jewelryinitialprice: jewelryInitialPrice,
      resourceRequests: resourceRequests,
    },
    { headers: { Authorization: `Bearer ${token}` } }
  );
export const APIrejectedauctionrequestsell = (id, reason, token) =>
  api.post(
    `initialValuation/${id}/rejected`,
    {
      reason: reason,
    },
    { headers: { Authorization: `Bearer ${token}` } }
  );
export const APIsetappraisalprice = (id, price, token) =>
  api.post(
    `initialValuation/${id}/comfirmed`,
    {
      price: price,
    },
    { headers: { Authorization: `Bearer ${token}` } }
  );
export const APIgetallSession = (token) =>
  api.get("auctionSessions", {
    headers: { Authorization: `Bearer ${token}` },
  });
