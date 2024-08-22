import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
// import UploadProducts from "./uploadProducts";

function Header ({loginStatus,setLoginStatus,userSearch,setUserSearch,product,setFilteredProducts}){


const cartItems = useSelector((state)=>{
    return state.cartItems
})

    const navigate = useNavigate()
    function LogoutBtn(){
        if(loginStatus.Status == true ){
            return <button className="login-btn" onClick={()=>{setLoginStatus({ ...loginStatus , Status: false , Message : "Please LogIn" ,Role : null ,Name : "" })}}>LogOut <i class="bi bi-box-arrow-right"></i></button>
        }else{
            return <button  className="login-btn" onClick={()=>{navigate('/')}}>LogIn <i class="bi bi-box-arrow-left"></i></button>
        }
    }

    const filterProducts = ()=>{
        console.log(userSearch)
        // let productCopy=[...product]
        let result = product.filter ((item,i)=>{
          if(item?.Description.toLowerCase().includes(userSearch.toLowerCase()) || item?.Title.toLowerCase().includes(userSearch.toLowerCase()) ==true){
            return true
          }
          
          })
          setFilteredProducts(result)
          console.log(result)
      }

    
    return(<>
    <div className="header">
    {loginStatus.Status == true && loginStatus.Role== 1 ? <img className="Home-brand-logo " src="https://pngimg.com/d/amazon_PNG11.png" onClick={()=>{navigate('/adminDashboard')}}/> :""}
    {loginStatus.Status == true && loginStatus.Role== 0 ? <img className="Home-brand-logo "  src="https://pngimg.com/d/amazon_PNG11.png" onClick={()=>{navigate('/customerDashboard')}}/> :""}
    <b className="header-element" style={{fontSize :"14px",lineHeight:"20px",padding:"5px"}}> Deliver to {loginStatus.Name}.. <br/>
        <span style={{fontSize:"18px",marginLeft:"0px"}}> <i class="bi bi-geo-alt"></i> hyderabad</span>
   </b>
    {loginStatus.Status == true && loginStatus.Role== 1 ?  <b className="header-element" style={{fontSize :"14px",lineHeight:"20px",padding:"5px"}} onClick={()=>{navigate('/uploadProducts')}} > Sell  <br/>
        <span style={{fontSize:"18px",marginLeft:"0px"}}>Products</span>
   </b> :""}
 

        <div  className="header-input-div">
            <input className="header-input" placeholder="Search Amazon.in"
            onChange={(e)=>{
                filterProducts()
                setUserSearch(e.target.value)
            }}
            />
            <i style={{color:"black" ,padding:"9.5px",backgroundColor:"#f4d006", width:"100%"}} className="bi bi-search header-search"></i>
        </div>



   <b className="header-element" style={{fontSize :"14px",lineHeight:"20px",padding:"5px"}} onClick={()=>{
    navigate('/account')
   }}> Hello {loginStatus.Name} <br/>
        <span style={{fontSize:"18px",marginLeft:"0px"}}>Account & Settings</span>
   </b>
 { loginStatus.Role== 0 ? <b className="header-element" style={{fontSize :"14px",lineHeight:"20px",padding:"5px"}} onClick={()=>{
    navigate('/orders')
   }}> Returns  <br/>
        <span style={{fontSize:"18px",marginLeft:"0px"}}>& Orders</span>
   </b> : ""}
   {loginStatus.Status == true && loginStatus.Role== 0 && cartItems.length > 0 ? <b onClick={()=>{navigate('/cart')}}> <i className="bi bi-cart-check-fill cart-icon"></i><span className="cart-length">{ cartItems.length}</span> </b>:""}
   {loginStatus.Status == true && loginStatus.Role== 0 && cartItems.length == 0 ?<span><i className="bi bi-cart cart-icon" onClick={()=>{navigate('/cart')}}></i></span> :"" }
 


   <LogoutBtn/>
    </div>
    
    {/* {JSON.stringify(loginStatus)} */}




{/* 
data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop" aria-controls="staticBackdrop"
<div class="offcanvas offcanvas-start" data-bs-backdrop="static" tabindex="-1" id="staticBackdrop" aria-labelledby="staticBackdropLabel">
  <div class="offcanvas-header">
    <h5 class="offcanvas-title" id="staticBackdropLabel">Upload your product</h5>
    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div>
<UploadProducts/>
  </div>

</div> */}
    </>
    )
}
export default Header



