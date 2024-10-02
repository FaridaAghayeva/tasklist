import ReactDOM from "react-dom/client";
import Main from "./Main";
import "./index.css";
import React from "react";

const rootElement = document.getElementById("app");

if (rootElement) {
    ReactDOM.createRoot(rootElement).render(<Main />);
} else {
    console.error("Failed to find the root element 'app'.");
}
