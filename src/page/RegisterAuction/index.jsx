import QRCode from "qrcode.react";
import Footer from "../../component/footer/footer.jsx";
import HomePage from "../../component/home-default/home.jsx";
import "./index.scss";
import { message } from "antd";
import { Products } from "../../share-data/productData";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { APIgetSessionByID } from "../../api/api.js";

export default function RegisterAuction() {
  const params = useParams();
  const [product, setProduct] = useState();

  const accountNumber = "141099999999";
  const bankName =
    "Ngân hàng Nông Nghiệp và Phát triển nông thôn Việt Nam - Chi nhánh Mỹ Đình";
  const transactionContent = "DGVPA4767026533748";
  const amount =
    product?.auctionRequest.ultimateValuation.price + product?.feeAmount;
  const [messageApi, contextHolder] = message.useMessage();

  function copyToClipboard(text) {
    navigator.clipboard.writeText(text);
    messageApi.open({
      type: "success",
      content: "Đã sao chép: " + text,
    });
  }

  function downloadQR() {
    const canvas = document.querySelector("canvas");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "QRCode.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }
  useEffect(() => {
    console.log("okee1223");
    APIgetSessionByID(params.id)
      .then((response) => {
        console.log(response);
        setProduct(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});
  }, [location]);
  // QR code value with proper formatting
  const qrValue = `NH:${bankName}|STK:${accountNumber}|ND:${transactionContent}|ST:${amount}`;
  return (
    <>
      {contextHolder}
      <HomePage>
        <div className="payment-page">
          <div className="order-info">
            <h3>Jewelry Auction Payment</h3>
            <div className="order-details">
              <p>
                <strong>Order Information: </strong> {product?.nameJewelry}
              </p>
              <p>
                <strong>Deposit:</strong>{" "}
                {product?.auctionRequest.ultimateValuation.price}
              </p>
              <p>
                <strong>Document Fee:</strong> {product?.feeAmount}
              </p>
              <p>
                <strong>Total:</strong>{" "}
                {product?.auctionRequest.ultimateValuation.price +
                  product?.feeAmount}
              </p>
            </div>
          </div>
          <div className="payment-info">
            <h3>Bank Account</h3>
            <div className="payment-all">
              <div className="qr-code">
                <p>Scan to pay</p>
                <QRCode value={qrValue} size={150} />
                <button onClick={downloadQR}>Save QR Code</button>
              </div>
              <div className="bank-details">
                <p>
                  <strong>Bank:</strong> {bankName}
                </p>
                <p>
                  <strong>Account Number:</strong> {accountNumber}{" "}
                  <button onClick={() => copyToClipboard(accountNumber)}>
                    Copy
                  </button>
                </p>
                <p>
                  <strong>Transaction Content:</strong> {transactionContent}{" "}
                  <button onClick={() => copyToClipboard(transactionContent)}>
                    Copy
                  </button>
                </p>
                <p>
                  <strong>Amount:</strong> {amount}{" "}
                  <button onClick={() => copyToClipboard(amount)}>Copy</button>
                </p>
              </div>
            </div>
          </div>
          {/* <p className="note">
            Lưu ý: Khách hàng phải nhập đúng số tài khoản, nội dung và số tiền
            trên khi thực hiện chuyển khoản.
          </p>
          <button className="back-button">Quay lại</button> */}
        </div>
      </HomePage>
      <Footer />
    </>
  );
}
