import React from "react";
import Logo from "./logo";
import SearchBar from "./searchBar";
import "../stylesheets/css/header.min.css";
import MyAccountMenu from "./myAccount";

function Header() {

  return (
    <header>
      <Logo />
      <MyAccountMenu />
    </header>
  );
}

export default Header;
