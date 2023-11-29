// @ts-nocheck
import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { useProjectStore } from "SUPER/store";
const App = () => {
  const projects = useProjectStore((state: any) => state);
  console.log({ projects });

  return <div> Welcome to OPMS </div>;
};

const container = document.getElementById("app");
const root = createRoot(container!);
root.render(<App />);
