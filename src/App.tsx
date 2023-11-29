// @ts-nocheck
import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
const App = () => {
  return <div> Welcome to OPMS </div>
};

const container = document.getElementById("app");
const root = createRoot(container!);
root.render(<App />);
