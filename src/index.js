import React from "react";
import ReactDOM from "react-dom/client";
// normalize.css 파일 배치
import "./styles/normalize.css";
// index.css 파일 배치
import "./styles/index.css";
import Schedule from "./pages/schedule/Schedule";
import Slide from "./pages/slide/Slide";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Slide />);
