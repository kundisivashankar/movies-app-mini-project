import { Link } from "react-router-dom";

import "./index.css";

const NotFound = () => (
  <div className="not-found-route-container">
    <img
      src="https://res.cloudinary.com/dktwlx0dz/image/upload/v1698043190/Movies-app/not-found.png"
      alt="not found"
      className="not-found-image"
    />
    <h1 className="not-found-heading">Lost Your Way?</h1>
    <p className="not-found-description">
      we are sorry the page you requested could not be found. <br />
      Please go back to the homepage.
    </p>
    <Link to="/">
      <button type="button" className="back-btn">
        Go to Home
      </button>
    </Link>
  </div>
);

export default NotFound;
