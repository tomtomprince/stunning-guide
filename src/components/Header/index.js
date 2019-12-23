import React from "react";
import HomeWorkIcon from '@material-ui/icons/HomeWork';



import './Header.css';

export default function Header() {
  return (
    <header className="App-header vertical-rhythm">
      <h1 className="App-header__title">
        <HomeWorkIcon fontSize='large' />&nbsp;
        <span>Housing Application</span>
      </h1>
    </header>
  );
}
