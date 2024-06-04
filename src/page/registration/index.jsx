import { Button, Form, Input, Spin, DatePicker } from "antd";
import AuthenTemplate from "../../component/authen-template";
import ButtonPrimary from "../../component/button-primary/ButtonPrimary";
import "./index.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../config/axios";
import { APIregis } from "../../api/api";

export default function Registration() {
  const navigate = useNavigate();
  const onChangeDate = (date, dateString) => {
    console.log(date, dateString);
  };

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const regis =(user) => {
    console.log(user)
    setIsLoading(true)
    APIregis(user.username, user.password, user.fullname, user.email, user.phone, user.address, user.birthday).then((rs) => {
      console.log(rs)
      if(rs.status === 200){
        navigate("/login")
      }
    }).catch((error) => {
      console.error("Error logging in:", error);
      setErrorMessage(error.response.data)
    }).finally(() => {
      setIsLoading(false)
    })

  }

  return (
    <>
      {isLoading?(<Spin style={{height:"100vh",width:"100%", backgroundColor:"#fff9e8",paddingTop:'50vh'}}></Spin>):(
        <AuthenTemplate>
        <div className="big">
          <div className="wellcome">
            <p className="welcome-name">WELCONE JEWELJOUST!</p>
            <p className="wellcome-mess">
              Enter your details to register your account !
            </p>
          </div>
          <button className="buttion-regis-google">
            <img className="google-icon" src="public/IconGoogle.svg" alt="" />
            <p className="regis-google-text">Continue With Google</p>
          </button>
          <div className="boxs-conten">
            <Form className="boxs-conten" labelCol={{
              span: 24 
              }}
              onFinish={regis}
            >
              <Form.Item className="conten-name" label="Username" name="username" rules={[
                {
                  required: true,
                  message: 'This box cannot be left blank'
                }
              ]}>
                <Input className="conten-mess"
                type="text"
                placeholder=" Enter your username" />
              </Form.Item>
              <Form.Item className="conten-name" label="password" name="password" rules={[
                {
                  required: true,
                  message: 'This box cannot be left blank'
                }
              ]}>
                <Input className="conten-mess"
                type="password"
                placeholder=" Enter your Password"/>
              </Form.Item>
              <Form.Item className="conten-name" label="Confirm password" name="Confirm-password" rules={[
                {
                  required: true,
                  message: 'This box cannot be left blank'
                }
              ]}>
                <Input className="conten-mess"
                type="password"
                placeholder=" Enter your Password"/>
              </Form.Item>
              <Form.Item className="conten-name" label="Full Name" name="fullname" rules={[
                {
                  required: true,
                  message: 'This box cannot be left blank'
                }
              ]}>
                <Input className="conten-mess"
                type="text"
                placeholder=" Enter your Full Name"/>
              </Form.Item>
              <Form.Item className="conten-name" label="Email address" name="email" rules={[
                {
                  required: true,
                  message: 'This box cannot be left blank'
                }
              ]}>
                <Input className="conten-mess"
                type="text"
                placeholder=" Enter your Email address"/>
              </Form.Item>
              <Form.Item className="conten-name" label="Phone Number" name="phone" rules={[
                {
                  required: true,
                  message: 'This box cannot be left blank, just enter number'
                }
              ]}>
                <Input className="conten-mess"
                type="number"
                placeholder="Enter your PhoneNumber"/>
              </Form.Item>
              <Form.Item className="conten-name" label="Address" name="address" rules={[
                {
                  required: true,
                  message: 'This box cannot be left blank'
                }
              ]}>
                <Input className="conten-mess"
                type="text"
                placeholder="Enter your Address"/>
              </Form.Item>
              <Form.Item className="conten-name" label="Birth Day" name="birthday" rules={[
                {
                  required: true,
                  message: 'This box cannot be left blank, just enter date'
                }
              ]}>
                <DatePicker 
                className="conten-mess"
                type="date"
                placeholder="Enter your Birth Day" onChange={onChangeDate} needConfirm />
              </Form.Item>
              <p style={{
                  color:'red'
                }}>{
                  errorMessage ? errorMessage : ''
                }</p>
              <Form.Item className="button-regis">
              <Button className="button-regis-in" type="primary" htmlType="submit" style={{
                backgroundColor: '#ffbe98',
                border: 'solid 4px #ffbe98',
                color: '#ffffff',
                borderRadius: '20px',
                fontFamily: 'Poppins',
                fontSize: '16px',
                fontStyle: 'normal',
                fontWeight: '600',
                lineHeight: 'normal',
                width:'100%',
                textAlign:'center',
                height: '69px'
              }}> 
                  Register 
                </Button>
              </Form.Item>
            </Form>
          <div className="login">
            <p className="login-text">Already have an account?</p>
            <span
              className="login-link"
              onClick={() => {
                navigate("/login");
              }}
            >
              Log in
            </span>
          </div>
        </div>
      </div>
      </AuthenTemplate>)}
    </>  
  );
}
