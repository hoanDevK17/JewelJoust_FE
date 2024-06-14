
import AuthenTemplate from "../../component/authen-template";
import { useSearchParams } from "react-router-dom";
import { Button, Form, Input } from "antd";
import { APIResetPass } from "../../api/api";



export default function ResetPass() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const handleSubmit = () => { APIResetPass("123456", token).then((rs) => { console.log(rs) }) }
    // console.log(token)

   
    return (<AuthenTemplate>
        {/* <button onClick={handleSubmit}>Submitg</button> */}
        <div >
            <h1>Please enter your new password!</h1>
            <div className="reset-form" >
                <Form className="form-reset"
                    labelCol={{
                        span: 24,
                    }}
                    onFinish={(values) => {
                        console.log(values)
                    }}>
                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                        hasFeedback
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="confirm"
                        label="Confirm Password"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('The new password that you entered do not match!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        style={{
                            backgroundColor: "#ffbe98",
                            border: "solid 4px #ffbe98",
                            color: "#ffffff",
                            borderRadius: "20px",
                            fontFamily: "Poppins",
                            fontSize: "16px",
                            fontStyle: "normal",
                            fontWeight: "600",
                            lineHeight: "normal",
                            width: "100%",
                            textAlign: "center",
                        }}
                    >
                        Login
                    </Button>
                </Form>
            </div>
        </div>
    </AuthenTemplate>)

}



// pretieer