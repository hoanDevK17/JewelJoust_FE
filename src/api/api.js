import { api } from "../config/axios";



export const APIlogin = (userName, passWord) => api.post("login",{username: userName,password:passWord})
export const APIForgotpass =(email)=> api.post("forgot-password",{email:email})
export const APIResetPass =(password,token)=> api.post("reset-password",{password:password},{headers:{ 'Authorization': `Bearer ${token}`}})
export const APIUpdateProfile =(profile,token,id)=>api.put("update-profile",{fullname:profile.fullname,address:profile.address,birthday:profile.birthday,email:profile.email,phone:profile.phone,id:id},{headers:{ 'Authorization': `Bearer ${token}`}})
export const APIregis = (userName, passWord, fullName, email, phone, address, birthday) => api.post("register",{username: userName,password:passWord, fullname: fullName, email: email, phone: phone, address: address, birthday: birthday})
export const APIgetallacount = (token) => api.get("accounts", {headers: {'Authorization': `Bearer ${token}`}})
export const APIregishaverole = (userName, passWord, fullName, email, phone, address, birthday, role, token) => api.post("register-have-role",{username: userName,password:passWord, fullname: fullName, email: email, phone: phone, address: address, birthday: birthday, role: role, headers: {'Authorization': `Bearer ${token}`}})
export const APIgetallrequest = (token) => api.get("get-all-auction-request", {headers: {'Authorization': `Bearer ${token}`}})
export const APIgetallrequestUser=(token) => api.get("auction-request-by-userid", {headers: {'Authorization': `Bearer ${token}`}})
export const APIauctionrequestsell = (
  jewelryName,
  jewelryDescription,
  jewelryInitialPrice,
  resourceRequests,
  token
) =>
  api.post(
    "request-sale",
    {
      jewelryName: jewelryName,
      jewelrydescription: jewelryDescription,
      jewelryinitialprice: jewelryInitialPrice,
      resourceRequests: resourceRequests,
    },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  export const APIrejectedauctionrequestsell = (
    id,
    reason,
    token
  ) =>
    api.post(
      `rejected-initial/${id}`,
      {
        reason: reason,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    export const APIsetappraisalprice = (
      id,
      price,
      token
    ) =>
      api.post(
        `confirmed-initial/${id}`,
        {
          price: price,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

