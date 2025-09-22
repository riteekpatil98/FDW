import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Home from "./pages/Home";
  import { ToastContainer, toast } from 'react-toastify';
function App() {
  return (
    <>
      <Home></Home>
      <ToastContainer></ToastContainer>
    </>
  );
}

export default App;
