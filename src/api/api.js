import { api } from "../config/axios";
 
export const APIlogin = (userName, passWord) => api.post("login",{username: userName,password:passWord})
export const APIregis = (userName, passWord, fullName, email, phone) =>
 api.post("register",{username: userName,password:passWord, fullname: fullName, 
    email: email, phone: phone})
export const APIForgotpass =(email)=> api.post("forgot-password",{email:email})
export const APIResetPass =(password,token)=> api.post("reset-password",{password:password},
    {headers:{ 'Authorization': `Bearer ${token}`}})

