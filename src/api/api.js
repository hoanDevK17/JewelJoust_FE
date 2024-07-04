import dayjs from "dayjs";
import api2, { api } from "../config/axios";

export const APIlogin = (userName, passWord) =>
  api.post("login", { username: userName, password: passWord });
export const APIForgotpass = (email) =>
  api.post("forgot-password", { email: email });
export const APIResetPass = (password) =>
  api.post("reset-password", { password: password });

export const APIChangePassword = (oldPassword, newPassword) =>
  api.put("account/changePassword", {
    oldPassword: oldPassword,
    newPassword: newPassword,
  });
export const APIrefreshBalance = () => api.get("refreshBalance");
export const APIUpdateProfile = (profile, id) =>
  api.put("account", {
    fullname: profile.fullname,
    address: profile.address,
    birthday: profile.birthday,
    email: profile.email,
    phone: profile.phone,
    id: id,
    status: profile.status ? profile.status : "ACTIVE",
  });
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
export const APIgetallacount = () => api.get("account");
export const APIgetallacountbyRole = (role) => api.get(`account/${role}`);
export const APIregishaverole = (
  userName,
  passWord,
  fullName,
  email,
  phone,
  address,
  birthday,
  role
) =>
  api.post(`account/register`, {
    username: userName,
    password: passWord,
    fullname: fullName,
    address: address,
    birthday: birthday,
    email: email,
    phone: phone,
    role: role,
  });
export const APIgetallrequest = () => api.get("auctionRequests");
export const APIgetallrequestUser = () =>
  api.get("auctionRequests/accountCurrent");
export const APIauctionrequestsell = (
  jewelryName,
  jewelryDescription,
  jewelryInitialPrice,
  resourceRequests
) =>
  api2.post("auctionRequests", {
    jewelryName: jewelryName,
    jewelryDescription: jewelryDescription,
    initialPrice: jewelryInitialPrice,
    resourceRequests: resourceRequests,
  });

export const APIgetlistrequestbyuserid = () =>
  api.get("`confirmed-initial/${id}`");

export const APIrejectedauctionrequestsell = (id, reason) =>
  api.post(`initialValuations/rejected`, {
    id: id,
    reason: reason,
  });
export const APIsetappraisalprice = (id, price) =>
  api.post(`initialValuations/comfirmed`, {
    id: id,
    price: price,
  });

export const APIshipment = (id) => api.post(`shipments/${id}`);
export const APIultimateValuations = (id, price) =>
  api.post(`ultimateValuations`, { id_auctionRequest: id, price: price });
export const APIultimateValuationsReject = (id, reason) =>
  api.post(`ultimateValuations/rejected`, {
    id_auctionRequest: id,
    reason: reason,
  });
export const APIAcceptUltimate = (id) => api.put(`ultimateValuations/${id}`);
export const APIRejectUltimate = (id, reason) =>
  api.put(`ultimateValuations/${id}/rejected`, { reason });
// Session
export const APIgetallSession = () => api.get("auctionSessions");
export const APIgetallSessionByStatus = (status) =>
  api.get(`auctionSessions/${status}`);
export const APIgetSessionByID = (id) => api.get(`auctionSessions/id/${id}`);
export const APIcreateSession = (values) =>
  api.post("auctionSessions", {
    auction_request_id: values.id_auction_request,
    staff_id: values.staff_id,
    start_time: dayjs(values.range_time[0]).format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
    end_time: dayjs(values.range_time[1]).format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
    min_stepPrice: values.min_stepPrice,
    deposit_amount: values.deposit_amount,
    name_session: values.name_session,
    name_jewelry: values.name_jewelry,
    description: values.description,
  });
// Register the session
export const APIregisSession = (id) =>
  api.post("auctionRegistrations", {
    auctionSession_id: id,
  });
