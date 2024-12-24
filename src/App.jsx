import React from "react";
import RouterPages from "./router/Router";
  // This includes both JS and Popper.js

import './App.css'

import Footer from "./components/Footer";
export default function App() {
  return (
    <>
      <RouterPages />
      <Footer/>
    </>
  );
}
