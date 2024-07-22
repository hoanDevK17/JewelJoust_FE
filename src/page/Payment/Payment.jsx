import { message, Result } from "antd";
import React, { useEffect, useState } from "react";
import HomePage from "../../component/home-default/home";
import { useLocation, useNavigate } from "react-router-dom";
import {
  APIDeposit,
  APIrefreshBalance,
  APIResponseDeposit,
} from "../../api/api";
import { refreshBalance } from "../../redux/features/counterSlice";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";

const DepositSuccessPage = () => {
  const location = useLocation();
  const [isSuccess, setIsSuccess] = useState();
  const [vnpAmount, setVnpAmount] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formattedDate, setFormattedDate] = useState('');
  useEffect(() => {
    if (location.search?.length > 0) {
      APIResponseDeposit(location?.search)
        .then((response) => {
          console.log(response);
          if (response.data == "VNPAY response processed successfully") {
            APIrefreshBalance().then((rs) => {
           
              if (rs.status === 200) {
                // user.wallet.balance = JSON.stringify(rs.data);
                dispatch(refreshBalance(rs.data));
              }
            });
            setIsSuccess(true);
          } else navigate("/");
        })
        .catch((error) => {
          console.log(error);
          message.error(error?.message);
        })
        .finally(() => {});
    } else {
      navigate("/");
    }
    const params = new URLSearchParams(location.search);
    setVnpAmount(params.get("vnp_Amount"));
    const vnpBankCode = params.get("vnp_BankCode");
    const vnpCardType = params.get("vnp_CardType");
    const vnpOrderInfo = params.get("vnp_OrderInfo");
    const vnpPayDate = params.get("vnp_PayDate").slice(0, 12);
    setFormattedDate(`${vnpPayDate.slice(0, 4)}-${vnpPayDate.slice(4, 6)}-${vnpPayDate.slice(6, 8)} ${vnpPayDate.slice(8, 10)}:${vnpPayDate.slice(10, 12)}`);
    const vnpResponseCode = params.get("vnp_ResponseCode");
    const vnpTmnCode = params.get("vnp_TmnCode");
    const vnpTransactionNo = params.get("vnp_TransactionNo");
    const vnpTransactionStatus = params.get("vnp_TransactionStatus");
    const vnpTxnRef = params.get("vnp_TxnRef");
    const vnpSecureHash = params.get("vnp_SecureHash");

    // Bạn có thể xử lý các thông tin này ở đây, ví dụ hiển thị ra console
    console.log("vnp_Amount:", vnpAmount);
    console.log("vnp_BankCode:", vnpBankCode);
    console.log("vnp_CardType:", vnpCardType);
    console.log("vnp_OrderInfo:", vnpOrderInfo);
    console.log("vnp_PayDate:", vnpPayDate);
    console.log("vnp_ResponseCode:", vnpResponseCode);
    console.log("vnp_TmnCode:", vnpTmnCode);
    console.log("vnp_TransactionNo:", vnpTransactionNo);
    console.log("vnp_TransactionStatus:", vnpTransactionStatus);
    console.log("vnp_TxnRef:", vnpTxnRef);
    console.log("vnp_SecureHash:", vnpSecureHash);
    // Bạn có thể xử lý các thông tin này ở đây, ví dụ hiển thị ra console
  }, [location.search]);
  return (
    <>
      <HomePage>
        {isSuccess && (
          <div className="container my-5">
            <div className="row justify-content-center">
              <div className="col-md-8 text-center">
                <div className="card">
                  <div className="card-body">
                    <i className="fas fa-check-circle fa-5x text-success mb-4"></i>
                    <h2 className="card-title">Deposit Successful</h2>
                    <Result
                      status="success"
                      title={`Deposit Amount: ${vnpAmount}$`}
                    />
                    <p className="card-text">
                      Your transaction has been processed successfully.
                    </p>

                    <div className="d-flex justify-content-between align-items-center">
                      <p className="mb-0">Time:</p>
                      <p className="mb-0">
                        {formattedDate}
                      </p>
                    </div>
                    <a href="/" className="btn btn-primary mt-4">
                      Home Page
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </HomePage>
    </>
  );
};

export default DepositSuccessPage;
