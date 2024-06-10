
import { api } from "../config/axios";



export const APIlogin = (userName, passWord) => api.post("login",{username: userName,password:passWord})
export const APIregis = (userName, passWord, fullName, email, phone, address, birthday) => api.post("register",{username: userName,password:passWord, fullname: fullName, email: email, phone: phone, address: address, birthday: birthday})
export const APIgetallacount = (token) => api.get("accounts", {headers: {'Authorization': `Bearer ${token}`}})
export const APIregishaverole = (userName, passWord, fullName, email, phone, address, birthday, role, token) => api.post("register-have-role",{username: userName,password:passWord, fullname: fullName, email: email, phone: phone, address: address, birthday: birthday, role: role, headers: {'Authorization': `Bearer ${token}`}})


