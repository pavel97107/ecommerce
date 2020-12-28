import React from "react";
import { Link } from "react-router-dom";

export default () => {
  return (
    <nav>
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link to="/user/history" className="nav-link">
            history
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/user/password" className="nav-link">
            password
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/user/wishlist" className="nav-link">
            wishlist
          </Link>
        </li>
      </ul>
    </nav>
  );
};
