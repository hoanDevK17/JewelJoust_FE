import { useState } from "react";
import AuthenTemplate from "../../component/authen-template";
import { useNavigate } from 'react-router-dom';
import ButtonPrimary from "../../component/button-primary/ButtonPrimary";
import './forgotPass.scss'
import { Button, Form, Input } from "antd";
import FormItem from "antd/es/form/FormItem";
import { APIForgotpass } from "../../api/api";

export default function ForgotPass() {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const [Message, setMessage] = useState();
    const [errorMessage, setErrorMessage] = useState("");

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };
    const handleSubmit = (value) => {
        APIForgotpass(value.email).then((response) => {
            console.log("response", response)
            if (response.status == "200") {
                setMessage("Gửi mail thành công");
            }
        })

            .catch((error) => {
                console.log("error", error)
                setErrorMessage("Gửi mail thất bại");
            }).finally(() => {

            })
    }
    const handleSubmitForgotPassword = () => { }
    return (<AuthenTemplate>
        <div className="content">
            <div className="message">
                <h2>FIND YOUR ACCOUNT</h2>
                <p>Please enter your email address to search for your account.</p>
            </div>
            <div className="form">
                <Form onFinish={handleSubmit} labelCol={{
                    span: 24
                }}>
                    <Form.Item label="Email" type='email' name="email" rules={[{
                        required: true,
                        message: 'Please enter your email address'
                    }]}>
                        <Input placeholder="Email Address" />
                    </Form.Item>
                    <p
                        style={{
                            color: "red",
                        }}
                    >
                        {errorMessage && errorMessage}
                    </p>
                    <div className="button-reset">
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </div>
                </Form>

            </div>
        </div>
    </AuthenTemplate>)
}
    // pretieer