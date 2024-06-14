import "./Wallet.scss"; // Import the SCSS file

const UserInfo = () => {
  return (
    <div className="user-info">
      <div className="user-icon">
        <img src="path-to-user-icon.png" alt="User Icon" />
      </div>
      <div className="username">{u}</div>
      <div className="balance">
        <span>0.55</span>
        <div className="refresh-icon">
          <img src="path-to-refresh-icon.png" alt="Refresh Icon" />
        </div>
      </div>
      <button className="recharge-button">
        <img src="path-to-piggy-bank-icon.png" alt="Recharge Icon" />
        Nạp tiền
      </button>
    </div>
  );
};

export default UserInfo;
