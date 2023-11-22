import styled from "@emotion/styled";
import React, { useState } from "react";
import Header from "./components/Header";
import Input from "./components/Input";
import List from "./components/List";
import Footer from "./components/Footer";

const App = () => {
  const Layout = styled.div`
    position: relative;
    display: block;
    max-width: 960px;
    min-width: 480px;
    border-radius: 10px;
    background: skyblue;
    text-align: center;
    margin-top: 20ox;
    margin-left: auto;
    margin-right: auto;
  `;
  const getTitle = title => {
    console.log(title);
    const newDatas = [...datas];
    newDatas.push(title);
    setDatas(newDatas);
  };

  const [datas, setDatas] = useState([]);

  return (
    <Layout>
      <Header version="1.0">
        <b>Todo App</b>
      </Header>
      <Input getTitle={getTitle} />
      <List datas={datas}>목록</List>
      <Footer></Footer>
    </Layout>
  );
};

export default App;
