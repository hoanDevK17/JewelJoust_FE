import { Form, Input } from "antd";
import AuthenTemplate from "../../component/authen-template";
import ButtonPrimary from "../../component/button-primary/ButtonPrimary";
import "./index.scss";
import { useNavigate } from "react-router-dom";
export default function Registration() {
  const navigate = useNavigate();
  return (
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
          }}>
            <Form.Item className="conten-name" label="Username" name="Username" rules={[
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
            <Form.Item className="conten-name" label="Full Name" name="Full-Name" rules={[
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
          </Form>
        </div>
        <div className="button-regis">
          {/* <button className="button-star-regis">Register</button>
           */}
          <ButtonPrimary
            title="Register"
            Onclick={() => {
              navigate("/login");
            }}
          />
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
    </AuthenTemplate>
  );
}
