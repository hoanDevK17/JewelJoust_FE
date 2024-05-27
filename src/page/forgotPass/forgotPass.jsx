import { useState } from "react";
import AuthenTemplate from "../../component/authen-template";
import { useNavigate } from 'react-router-dom';
import ButtonPrimary from "../../component/button-primary/ButtonPrimary";
import './forgotPass.scss'
import {Form,Input} from "antd";
import FormItem from "antd/es/form/FormItem";

export default function ForgotPass() {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };
    return (<AuthenTemplate>
        <div className="content">
            <div className="message">
                <h2>FIND YOUR ACCOUNT</h2>
                <p>Please enter your email address to search for your account.</p>
            </div>
            <div className="form">
                
            </div>
        </div>

    </AuthenTemplate>)
}
