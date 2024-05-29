import { api } from "../config/axios";
 
export const APIlogin = (userName, passWord) => api.post("login",{username: userName,password:passWord})