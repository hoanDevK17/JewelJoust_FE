import { api } from "../config/axios";
 
export const APIlogin = (userName, passWord) => api.post("login",{username: userName,password:passWord})
export const APIregis = (userName, passWord, fullName, email, phone, address, birthday) => api.post("register",{username: userName,password:passWord, fullname: fullName, email: email, phone: phone, address: address, birthday: birthday})
export const APIgetlistacount = () => api.get("accounts") 
export const APIcbr = (jewerlyName, describe, jewelryInitialPrice, imgJewerly, fileJewerly) => api.post('',{jewerlyname: jewerlyName, describe: describe, jewelryinitialprice: jewelryInitialPrice, imgjewerly: imgJewerly, filejewerly: fileJewerly } )