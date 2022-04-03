import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Checkout from './components/Checkout';
import OrderSuccess from './components/OrderSuccess';
import ContactForm from './components/ContactForm';
import Loader1 from './components/Loader';
import Admin from './pages/Admin';
import GetOrders from './pages/GetOrders';
import MyOrders from './pages/MyOrders';
import FlyingSanta from './pages/FlyingSanta';
ReactDOM.render(
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<App />} />
    <Route path="/checkout" element={<Checkout />} />
    <Route path="/success" element={<OrderSuccess />} />
    <Route path="/contact" element={<ContactForm />} />
    <Route path="/spinner" element={<Loader1 />} />
    <Route path="/admin" element={<Admin />} />
    <Route path="/orders" element={<GetOrders />} />
    <Route path="/myorders" element={<MyOrders />} />
    <Route path="*" element={<div>404</div>} />
    <Route path="/flying" element={<FlyingSanta />} />
    </Routes>
  </BrowserRouter>,
  
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
