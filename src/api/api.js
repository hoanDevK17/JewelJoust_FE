
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




