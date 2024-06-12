import { useState } from "react";
import AuthenTemplate from "../../component/authen-template";
import { Form, useSearchParams } from "react-router-dom";
import { Button, Input } from "antd";
import { APIResetPass } from "../../api/api";



export default function ResetPass() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const handleSubmit = ()=>{APIResetPass("123456",token).then((rs)=>{console.log(rs)})}

    // console.log(token)
    return (<AuthenTemplate>
   <button onClick={handleSubmit}>Submitg</button>
   
     
    </AuthenTemplate>)

 }
    
   

// pretieer