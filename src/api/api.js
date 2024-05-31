import { api } from "../config/axios";
 
export const APIlogin = (userName, passWord) => api.post("login",{username: userName,password:passWord})
export const APIregis = (userName, passWord, fullName, email, phone) => api.post("register",{username: userName,password:passWord, fullname: fullName, email: email, phone: phone})