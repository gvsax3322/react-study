import React from "react";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Header</h1>
      <div style={{ background: "skyblue", textAlign: "center", fontSize: 20 }}>
        <Link to="/home">Home</Link>|<Link to="/members">Members</Link>|
        <Link to="/about">About</Link>|
        <a href="http://www.naver.com" target="_blank">
          네이버
        </a>
      </div>
    </div>
  );
};

export default Header;
