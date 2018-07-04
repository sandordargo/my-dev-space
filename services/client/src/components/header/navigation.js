import React from "react";
import { Link } from "react-router-dom";
import styles, { linkStyles } from "./styles/navigation";

const Navigation = () => (
  <ul>
    <style jsx>{styles}</style>
    {linkStyles.styles}
    <li>
      <Link to="/event" className={`navigation-link ${linkStyles.className}`}>
        events
      </Link>
    </li>
  </ul>
);

export default Navigation;