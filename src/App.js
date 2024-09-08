import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useState } from 'react';
import { Route, Routes ,BrowserRouter, Navigate } from 'react-router-dom'
import Home from './home';
import Register from './register';
import Login from './login';
import CustomerDashboard from './customerDashboard';
import AdminDashboard from './adminDashboard';
import Header from './header';
import UploadProducts from './uploadProducts';
import Cart from './cart';
import Header2 from './header2';
import Account from './account';
import MyOrders from './myOrders';
import Footer from './footer';
import ProductDetails from './productDetails';
function App() {
  const [loginStatus,setLoginStatus] = useState({Status : null , Message : "" , Role : null , Name : "" })
  const [product,setProduct]= useState([])
  const [filteredProducts,setFilteredProducts] = useState([])
  const [accountDetails,setAccountDetails] = useState()
  const [userSearch,setUserSearch] = useState('')


  
  return (
    <BrowserRouter>
    {loginStatus.Status == true ?<Header loginStatus={loginStatus} setLoginStatus={setLoginStatus} userSearch={userSearch} setUserSearch={setUserSearch} product={product} setFilteredProducts={setFilteredProducts} />:""}
    {loginStatus.Status == true ? <h4 className='header3'>Developed by Santhosh </h4> : ""}

    {loginStatus.Status == true ?<Header2 loginStatus={loginStatus} setLoginStatus={setLoginStatus}  product={product} setProduct={setProduct} filteredProducts={filteredProducts} setFilteredProducts={setFilteredProducts} />:""}
    <Routes>
    <Route path='/Home' element={<Home/>} />
    <Route path='/register' element={<Register/>} />
    <Route path='/' element={<Login loginStatus={loginStatus} setLoginStatus={setLoginStatus} accountDetails={accountDetails} setAccountDetails={setAccountDetails}/>} />
    <Route path='/customerDashboard' element={loginStatus?.Status == true && loginStatus?.Role== 0 ? <CustomerDashboard product={product} setProduct={setProduct} filteredProducts={filteredProducts} setFilteredProducts={setFilteredProducts}/> : <Navigate to={'/'}/>} />
    <Route path='/adminDashboard' element={loginStatus?.Status == true && loginStatus?.Role== 1 ? <AdminDashboard product={product} setProduct={setProduct} filteredProducts={filteredProducts} setFilteredProducts={setFilteredProducts}/> : <Navigate to={'/'}/>} />
    <Route path='/uploadProducts' element={loginStatus.Status == true ?<UploadProducts/>:<Navigate to={'/'}/>}/>
    <Route path='/cart' element={loginStatus?.Status == true  ? <Cart filteredProducts={filteredProducts}/> : <Navigate to={'/'}/>}  />
    <Route path='/account' element={loginStatus.Status == true ? <Account accountDetails={accountDetails} setAccountDetails={setAccountDetails}/> :<Navigate to={'/'}/>}/>
    <Route path='/orders' element={loginStatus.Status == true ? <MyOrders accountDetails={accountDetails} setAccountDetails={setAccountDetails}/> :<Navigate to={'/'}/>}/>
    <Route path='/product/:params' element={loginStatus.Status == true ? <ProductDetails loginStatus={loginStatus} /> :<Navigate to={'/'}/>}  />
       <Route path='/admin' element={<AdminDashboard/>} />
    </Routes>
    {loginStatus.Status == true ? <Footer/> :""}
    </BrowserRouter>
  );
}

export default App;
