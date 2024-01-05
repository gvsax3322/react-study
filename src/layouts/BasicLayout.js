import React from "react";
import BasicMenu from "../components/menus/BasicMenu";

const BasicLayout = ({ children }) => {
  return (
    <div className="wrap">
      <header>
        <BasicMenu />
      </header>
      <main>{children}</main>
      <footer>하단</footer>
    </div>
  );
};

export default BasicLayout;
