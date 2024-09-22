"use client";
import "../app/globals.css";
import { ToastContainer } from "react-toastify";
import 'react-toastify/ReactToastify.min.css';


interface ToastProviderProps {
  children: React.ReactNode;
}



export default function ToastProvider({ children }: ToastProviderProps) {

  return (
    <>
      {children}
      <ToastContainer />
    </>
  );
}