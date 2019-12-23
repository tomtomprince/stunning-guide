import React from "react";
import Header from "../Header";

import "./Layout.css";

export default function Layout({ children }) {
  return (
    <header className="vertical-rhythm--xl">
      <Header />
      <main>{children}</main>
    </header>
  );
}
