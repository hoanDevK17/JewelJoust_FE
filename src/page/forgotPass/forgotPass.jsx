import { useState } from "react";
import AuthenTemplate from "../../component/authen-template";
import { useNavigate } from 'react-router-dom';
import ButtonPrimary from "../../component/button-primary/ButtonPrimary";
import './forgotPass.scss'
import { Form, Input } from "antd";
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
            <Form labelCol={{
                    span:24
                }}>
                    <Form.Item label="Email" type='email' name="email" rules={[{
                        required: true,
                        message :'Please enter your email address'
                    }]}>
                        <Input placeholder="Email Address"/>
                    </Form.Item>
                    <div className="button-reset">
                        <ButtonPrimary
                            title="Search"
                            Onclick={() => {
                                navigate("/login");
                            }}
                        />
                    </div>
                </Form>
            </div>
        </div>
    </AuthenTemplate>)
}

