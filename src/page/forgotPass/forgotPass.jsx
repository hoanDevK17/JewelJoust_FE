import { useState } from "react";
import AuthenTemplate from "../../component/authen-template";
import { useNavigate } from 'react-router-dom';
import ButtonPrimary from "../../component/button-primary/ButtonPrimary";
import './forgotPass.scss'

export default function ForgotPass() {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = (e) => {
        navigate('/login');
    };
    return (<AuthenTemplate>
        <div className="content">
            <div className="message">
                <h2>FIND YOUR ACCOUNT</h2>
                <p>Please enter your email address to search for your account.</p>
            </div>
            <div className="form">
                <form onSubmit={handleSubmit}>
                    <div className="input-email">
                        <input className="input-mail" type="email"
                            placeholder="Email address"
                            value={email}
                            onChange={handleEmailChange}
                            required></input><br></br>
                    </div>
                    <div className="button-reset">
                        <ButtonPrimary
                            title="Search"
                            Onclick={() => {
                                navigate("/login");
                            }}
                        />
                    </div>
                </form>
            </div>
        </div>

    </AuthenTemplate>)
}
