import React from "react";
import { Link } from "react-router-dom";

const BasicMenu = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">홈</Link>
        </li>
        <li>
          <Link to="/about">소개</Link>
        </li>
        <li>
          <Link to="/todo">할일</Link>
        </li>
      </ul>
    </nav>
  );
};

export default BasicMenu;
