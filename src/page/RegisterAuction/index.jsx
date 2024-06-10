import QRCode from "qrcode.react";
import Footer from "../../component/footer/footer.jsx";
import HomePage from "../../component/home-default/home.jsx";
import "./index.scss";
import { message } from "antd";

export default function RegisterAuction() {
  const accountNumber = "141099999999";
  const bankName =
    "Ngân hàng Nông Nghiệp và Phát triển nông thôn Việt Nam - Chi nhánh Mỹ Đình";
  const transactionContent = "DGVPA4767026533748";
  const amount = "40100000";
  const [messageApi, contextHolder] = message.useMessage();
  function copyToClipboard(text) {
    navigator.clipboard.writeText(text);
   
   
    messageApi.open({
      type: 'success',
      content: ("Đã sao chép: " + text),
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
  // QR code value
  const qrValue = `STK: ${accountNumber} - Ngan hang: ${bankName} - Noi dung: ${transactionContent} - So tien: ${amount} VND`;
  return (
    <>  {contextHolder}
      <HomePage>
        <div className="payment-page">
          <div className="order-info">
            <h3>Thanh toán đấu giá trang sức</h3>
            <div className="order-details">
              <p>
                <strong>Thông tin đơn hàng:</strong> 30L - 555.55
              </p>
              <p>
                <strong>Tiền đặt trước:</strong> 40.000.000 đ
              </p>
              <p>
                <strong>Phí hồ sơ:</strong> 100.000 đ
              </p>
              <p>
                <strong>Tổng cộng:</strong> 40.100.000 đ
              </p>
            </div>
          </div>
          <div className="payment-info">
            <h3>Tài khoản ngân hàng</h3>
            <div className="payment-all">
              <div className="qr-code">
                <p>Quét mã để thanh toán</p>
                <QRCode value={qrValue} size={150} />
                <button onClick={() => downloadQR()}>Lưu mã QR</button>
              </div>
              <div className="bank-details">
                <p>
                  <strong>Ngân hàng:</strong> {bankName}
                </p>
                <p>
                  <strong>Số tài khoản:</strong> {accountNumber}{" "}
                  <button onClick={() => copyToClipboard(accountNumber)}>
                    Sao chép
                  </button>
                </p>
                <p>
                  <strong>Nội dung chuyển khoản/Nội dung giao dịch:</strong>{" "}
                  {transactionContent}{" "}
                  <button onClick={() => copyToClipboard(transactionContent)}>
                    Sao chép
                  </button>
                </p>
                <p>
                  <strong>Số tiền:</strong> {amount} đ{" "}
                  <button onClick={() => copyToClipboard(amount)}>
                    Sao chép
                  </button>
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
