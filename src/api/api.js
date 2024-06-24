import dayjs from "dayjs";
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

export const APIChangePassword = (oldPassword, newPassword, token) =>
  api.put(
    "account/changePassword",
    {
      oldPassword: oldPassword,
      newPassword: newPassword,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
export const APIrefreshBalance = (token) =>
  api.get("refreshBalance", { headers: { Authorization: `Bearer ${token}` } });
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
      status: profile.status ? profile.status : "ACTIVE",
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
  api.get("account", { headers: { Authorization: `Bearer ${token}` } });
export const APIgetallacountbyRole = (role, token) =>
  api.get(`account/${role}`, { headers: { Authorization: `Bearer ${token}` } });
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
  api.post(
    `account/register`,
    {
      username: userName,
      password: passWord,
      fullname: fullName,
      address: address,
      birthday: birthday,
      email: email,
      phone: phone,
      role: role,
    },
    { headers: { Authorization: `Bearer ${token}` } }
  );
export const APIgetallrequest = (token) =>
  api.get("auctionRequests", {
    headers: { Authorization: `Bearer ${token}` },
  });
export const APIgetallrequestUser = (token) =>
  api.get("auctionRequests/accountCurrent", {
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
    "auctionRequests",
    {
      jewelryName: jewelryName,
      jewelryDescription: jewelryDescription,
      initialPrice: jewelryInitialPrice,
      resourceRequests: resourceRequests,
    },
    { headers: { Authorization: `Bearer ${token}` } }
  );

export const APIgetlistrequestbyuserid = (token) =>
  api.get("`confirmed-initial/${id}`", {
    headers: { Authorization: `Bearer ${token}` },
  });

export const APIrejectedauctionrequestsell = (id, reason, token) =>
  api.post(
    `initialValuations/rejected`,
    {
      id: id,
      reason: reason,
    },
    { headers: { Authorization: `Bearer ${token}` } }
  );
export const APIsetappraisalprice = (id, price, token) =>
  api.post(
    `initialValuations/comfirmed`,
    {
      id: id,
      price: price,
    },
    { headers: { Authorization: `Bearer ${token}` } }
  );

export const APIshipment = (id, token) =>
  api.post(
    `shipments/${id}`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
export const APIultimateValuations = (id, price, token) =>
  api.post(
    `ultimateValuations`,
    { id_auctionRequest: id, price: price },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
export const APIultimateValuationsReject = (id, reason, token) =>
  api.post(
    `ultimateValuations/rejected`,
    { id_auctionRequest: id, reason: reason },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
export const APIAcceptUltimate = (id, token) =>
  api.put(
    `ultimateValuations/${id}`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
export const APIRejectUltimate = (id, reason, token) =>
  api.put(
    `ultimateValuations/${id}/rejected`,
    { reason: reason },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
// Session
export const APIgetallSession = () => api.get("auctionSessions");
export const APIgetSessionByID = (id) => api.get(`auctionSessions/id/${id}`);
export const APIcreateSession = (values, token) =>
  api.post(
    "auctionSessions",
    {
      auction_request_id: values.id_auction_request,
      staff_id: values.staff_id,
      start_time: dayjs(values.range_time[0]).format(
        "YYYY-MM-DDTHH:mm:ss.SSSZ"
      ),
      end_time: dayjs(values.range_time[1]).format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
      min_stepPrice: values.min_stepPrice,
      deposit_amount: values.deposit_amount,
      name_session: values.name_session,
      name_jewelry: values.name_jewelry,
      description: values.description,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
