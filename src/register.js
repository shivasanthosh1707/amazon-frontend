import axios from "axios";
import React from "react";
import { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from './Images/logo.png'

 function Register(){
 
    const [register,setRegister]=useState({Name : null ,Email : null ,PhoneNumber : null,Password:null,Role: 0,Gender : 0,Address : null, Age :null })
    const [registerStatus,setRegisterStatus]=useState( { Status : null ,Message :"" })
    // const navigate = useNavigate()
    function usersDetailsChange(field,value){
//    console.log(field ,value)
   setRegister({ ...register ,[field] : value})
//    console.log(register)
    }
function  submitRegister(){
    
   if ( register.Name != null && register.Email != null && register.PhoneNumber != null && register.Password.length >= 8 && register.Role != null ){
    axios.post('/signup',register)
    .then((res)=>{
        // console.log(res)
        if(res.data.Success){
            setRegisterStatus({ ...registerStatus , Status : true , Message : "Registered successfully"})
            window.alert("Registered succesfully")
            // navigate('/')
        }else{
            setRegisterStatus({ ...registerStatus , Status : false , Message : "User Registration failed"})}
    })
    .catch((err)=>{
        console.log(err)
    }) }
}
// if(register.Role == null){
//     setRegister({ ...register , Role : 0 })
// }
console.log("please select role ",register.Role)
    return(
        <>
        <div className="login-component-wrapper">
        <div className="amazon-logo"><img src={Logo} alt="amazon logo" style={{width:"14%"}}/>
        </div> 
        < form  className="login-component-div" >
            <p style={{fontSize:"20px",lineHeight:"28px",fontWeight:"500"}}>Register your amazon account</p>
           
            <p style={{fontSize:"14px",fontWeight:"600"}}>Name <span className="Required">*</span></p>
            <input type="text" className="login-input" placeholder="Enter your name " 
            value={register.Name}
            onChange={(e)=>{
                usersDetailsChange("Name",e.target.value)
            }}
            required />

            <p style={{fontSize:"14px",fontWeight:"600"}}>Age</p>
            <input type="age" className="login-input" placeholder="Enter your age "
             onChange={(e)=>{
                usersDetailsChange("Age",Number(e.target.value))
            }}
            required  />

            <p style={{fontSize:"14px",fontWeight:"600"}}>Email <span className="Required">*</span> </p>
            <input type="email" className="login-input" placeholder="Enter your email "
            value={register.Email}
             onChange={(e)=>{
                usersDetailsChange("Email",e.target.value)
            }} 
            required />

            <p style={{fontSize:"14px",fontWeight:"600"}}>PhoneNumber <span className="Required">*</span></p>
            <input type="number" className="login-input" placeholder="Enter your phone "
            // value={register.PhoneNumber}
             onChange={(e)=>{
                usersDetailsChange("PhoneNumber",Number(e.target.value))
            }}
            required  />

            <p style={{fontSize:"14px",fontWeight:"600"}}>Address</p>
            <input type="text" className="login-input" placeholder="Enter your address "
             onChange={(e)=>{
                usersDetailsChange("Address",Number(e.target.value))
            }}
            required  />
            
            

            <p style={{fontSize:"14px",fontWeight:"600"}}>Create Password <span className="Required">*</span></p>
            <input type="password" className="login-input" placeholder="Create password "
            value={register.Password}
             onChange={(e)=>{
                usersDetailsChange("Password",e.target.value)
            }} 
            required minLength={8} />

            <p style={{fontSize:"14px",fontWeight:"600"}}>Gender</p>
            <select className="login-input" required onChange={(e)=>{
                usersDetailsChange("Gender",e.target.value)
            }}>
                <option>--select--</option>
                <option value="0">Male</option>
                <option value="1">Female</option>
            </select> 
            <p style={{fontSize:"14px",fontWeight:"600"}}>Role <span className="Required">*</span></p>
            <select className="login-input" required onChange={(e)=>{
                usersDetailsChange("Role",e.target.value)
            }}>
                <option>--select--</option>
                <option value="0">Customer</option>
                <option value="1">Admin</option>
            </select> 
            {registerStatus.Status == true ? <p style={{color: "green"}}>{registerStatus.Message}</p>:""}
           {registerStatus.Status == false ? <p style={{color: "red"}}>Failed!!  Please verify once</p>:""} <br/>
          
            <button className="continue" type="submit"
           onClick={()=>{
            submitRegister()
           }}
            >SignUp</button> <hr/>
            <p style={{fontSize:"15px",fontWeight:"600"}}>Already Registered  ?  <Link to = "/" > LogIn</Link></p>
{/* {JSON.stringify(register)} */}
          
        </form>
        </div>
        
        
        </>
    )
 }
 export default Register