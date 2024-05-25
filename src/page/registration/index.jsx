import AuthenTemplate from "../../component/authen-template";
import './index.scss'
import logo from './src/Frame.svg';
import google from './src/google.svg';
import eye from './src/eye.svg';
export default function Registration() {
  return <AuthenTemplate>
    <div class="big">
      <div class ="logo-head">     
        <img class="logo-icon" src={logo} alt=""/>      
      </div>
      <div class ="wellcome">
        <p class="welcome-name">WELCONE JEWELJOUST!</p>
        <p class="wellcome-mess">Enter your details to register your account !</p>
      </div>
      <button class="buttion-regis-google">
        <img class="google-icon" src={google} alt="" />
        <p class ="regis-google-text">Continue With Google</p>
      </button>
      <div class ="boxs-conten">
        <div class="input-details">
          <p class="conten-name">Username</p>
          <input class="conten-mess" type="text" placeholder=" Enter your Username" />
        </div>
        <div class="input-pass">
          <p class="conten-name">Password</p>
          <div class="icon-mess">
            <input class="conten-mess" type="password" placeholder=" Enter your Password"/>
            <img class="icon-eye"src={eye} alt="" />
          </div>
        </div>
        <div class="input-pass">
          <p class="conten-name">Confirm password</p>
          <div class="icon-mess">
            <input class="conten-mess" type="password" placeholder=" Enter your Password"/>
            <img class="icon-eye"src={eye} alt="" />
          </div>
        </div>
        <div class="input-details">
          <p class="conten-name">Full Name</p>
          <input class="conten-mess" type="text" placeholder=" Enter your Full Name" />
        </div>
        <div class="input-details">
          <p class="conten-name">Email address</p>
          <input class="conten-mess" type="text" placeholder=" Enter your Email address" />
        </div>
        <div class="input-details">
          <p class="conten-name">PhoneNumber</p>
          <input class="conten-mess" type="text" placeholder="Enter your PhoneNumber" />
        </div>
      </div>
      <div class ="button-regis">
        <button class="button-star-regis">register</button>
        <div class="login">
          <p class="login-text">Already have an account?</p>
          <a class="login-link" href="http://localhost:5173/login">Log in</a>
        </div>
      </div>
    </div>
  </AuthenTemplate>
}