import Cookies from "js-cookie";
import Footer from "../Footer";

import "./index.css";
import Header from "../Header";

const Account = ({ history }) => {
  const onLogout = () => {
    Cookies.remove("jwt_token");
    history.push("/login");
  };

  return (
    <div className="account-route-container">
      <Header />
      <div className="account-container">
        <h1 className="account-container-heading">Account</h1>
        <hr className="separator" />
        <div className="account-section">
          <p className="account-section-label">Membership</p>
          <div>
            <p className="email">rahul@gmail.com</p>
            <p className="password">Password : **********</p>
          </div>
        </div>
        <hr className="separator" />
        <div className="account-section">
          <p className="account-section-label">Plane details</p>
          <p className="membership-type">Premium</p>
          <p className="quality">Ultra HD</p>
        </div>
        <hr className="separator" />
        <button type="button" className="logout-btn" onClick={onLogout}>
          Logout
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default Account;
