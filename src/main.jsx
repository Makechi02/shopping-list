import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import ThemeProvider from "./context/ThemeContext.jsx";
import ItemsProvider from "./context/ItemsContext.jsx";
import {BrowserRouter} from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <ThemeProvider>
                <ItemsProvider>
                    <App/>
                </ItemsProvider>
            </ThemeProvider>
        </BrowserRouter>
    </React.StrictMode>,
);
