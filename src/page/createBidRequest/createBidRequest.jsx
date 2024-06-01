import AuthenTemplate from "../../component/authen-template";
import './createBidRequest.scss'
import { Button, Form, Input, Spin } from "antd";
import { useState } from "react";


export default function CreateBidRequest () {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
  return (
    <>
        {isLoading?(<Spin style={{height:"100vh",width:"100%", backgroundColor:"#fff9e8",paddingTop:'50vh'}}></Spin>):(
            <AuthenTemplate>
                <div className="createBidRequest">
                    <div className="heard">
                        
                    </div>
                    <div className="body">
                        <div className="content">
                            <div className="title">

                            </div>
                            <Form
                                className="form-creat-bid"
                                labelCol={{
                                span: 24,
                                }}
                                // onFinish={onFinish}
                                >
                                <Form.Item
                                    className="input-conten"
                                    label="Jewerly name"
                                    name="jewerlyname"
                                    rules={[
                                        {
                                        required: true,
                                        message: "This box cannot be left blank",
                                        },
                                ]}
                                >
                                    <Input
                                        className="input-box"
                                        type="text"
                                        placeholder=" Enter your Jewerly name"
                                    />
                                </Form.Item>
                                <Form.Item
                                    className="input-conten"
                                    label="Describe:"
                                    name="describe"
                                    rules={[
                                        {
                                        required: true,
                                        message: "This box cannot be left blank",
                                        },
                                    ]}
                                    >
                                    <Input
                                        className="input-box"
                                        type="text"
                                        placeholder=" Enter Describe"
                                        />
                                </Form.Item>
                                <Form.Item
                                    className="input-conten"
                                    label="jewelryInitialPrice:"
                                    name="jewelryinitialprice"
                                    rules={[
                                        {
                                        required: true,
                                        message: "This box cannot be left blank",
                                        },
                                    ]}
                                    >
                                    <Input
                                        className="input-box"
                                        type="number"
                                        placeholder=" Enter your jewelry initial price"
                                        />
                                </Form.Item>
                                    
                                <Form.Item>

                                </Form.Item>
                                {/* <p style={{
                                color:'red'
                                }}>{
                                    errorMessage ? errorMessage : ''
                                }</p> */}
                                <Form.Item>
                                    <Button type="primary" htmlType="submit" style={{
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
                                        textAlign:'center'
                                    }}> 
                                        Submis 
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                </div> 
            </AuthenTemplate>
        )}
    </>    
  );
}