import {  Result } from "antd";
import React from "react";

const DepositSuccessPage = () => {
  return (
    <>
      <>
        <div className="container my-5">
          <div className="row justify-content-center">
            <div className="col-md-8 text-center">
              <div className="card">
                <div className="card-body">
                  <i className="fas fa-check-circle fa-5x text-success mb-4"></i>
                  <h2 className="card-title">Deposit Successful</h2>
                  <Result status="success"
                  title="Deposit Amount: 1,000,000 VND" />
                  <p className="card-text">
                    Your transaction has been processed successfully.
                  </p>
                 
                  <div className="d-flex justify-content-between align-items-center">
                    <p className="mb-0">Time:</p>
                    <p className="mb-0">07/12/2024 15:30</p>
                  </div>
                  <a href="/" className="btn btn-primary mt-4">
                    Home Page
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
      <>
        <div className="container my-12">
          <div className="row justify-content-center">
            <div className="col-md-8 text-center">
              <div className="card">
                <div className="card-body">
                  <i className="fas fa-times-circle fa-5x text-danger mb-4"></i>
                  <h2 className="card-title">Deposit Failed</h2>
                  <Result
    status="error"
    title="Amount attempted to deposit: 1,000,000 VND"
    
  > </Result>
                  <p className="card-text">
                    Unfortunately, your transaction has failed. Please try again
                    later.
                  </p>
                  
                  <div className="d-flex justify-content-between align-items-center">
                    <p className="mb-0">Time:</p>
                    <p className="mb-0">07/12/2024 15:30</p>
                  </div>
                  <a href="/deposit" className="btn btn-primary mt-4">
                    Try Again
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default DepositSuccessPage;
