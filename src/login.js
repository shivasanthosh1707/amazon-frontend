import React from "react";
import axios from "axios";
import { useState,useEffect } from "react";
import { useNavigate, Link} from "react-router-dom";
import Logo from './Images/logo.png'
function Login ({loginStatus,setLoginStatus,setAccountDetails,accountDetails}){
    const [login,setLogin] = useState({Email : null ,Password : null})
    const navigate = useNavigate()

    function loginUserChange(field,value){
    console.log(field ,value)
    setLogin({ ...login ,[field]: value})
       
    }
    // console.log(loginStatus)

    function loginButton(){
        axios.post('https://amazon-w9ob.onrender.com/login',login)
            console.log("clicked")
        .then((res)=>{
            // console.log(res)
            if(res.data.Message){
                setLoginStatus({ ...loginStatus , Status: false , Message : res.data.Message })
            }else if(res.data.Success){
                // setLoginStatus({ ...loginStatus , Status: true , Message : res.data.Success   })
                if(res.data.usersDetails.Role == 1){
                      setTimeout(()=>{
                        setLoginStatus({ ...loginStatus , Status: true , Message : res.data.Success ,Role : 1,Name : res.data.usersDetails.Name })
                        navigate('/adminDashboard')},2000)
                    // console.log(loginStatus)
                }else{
                    setTimeout(()=>{
                        setLoginStatus({ ...loginStatus , Status: true , Message : res.data.Success ,Role : 0 ,Name : res.data.usersDetails.Name})
                        navigate('/customerDashboard')},2000)
                    //   console.log(loginStatus)
                }
            // console.log(res.data.usersDetails)
            setAccountDetails(res.data.usersDetails)
            console.log(accountDetails)
            
            }
            
        })
        .catch((err)=>{
            console.log(err)
        })
        
    }

    return(
        <div ><div className="login-component-wrapper" >
       <div className="amazon-logo"><img src={Logo} alt="amazon logo" style={{width:"14%"}}/>
       </div> 
        <div className="login-component-div"> 
            <p style={{fontSize:"20px",lineHeight:"28px",fontWeight:"500"}}>SignIn to your account</p>
            <p style={{fontSize:"14px",fontWeight:"600"}}>Enter your email </p>
            <input className="login-input" placeholder="Enter registered email" required value={login.Email}
            onChange={(e)=>{
                loginUserChange("Email",e.target.value)
            }}
            />

            <p style={{fontSize:"14px",fontWeight:"600"}}>Enter your password </p>

            <input className="login-input" type="password" placeholder="Enter your Password" required value={login.Password}
             onChange={(e)=>{
                loginUserChange("Password",e.target.value)
            }}
            />
            { loginStatus.Status== true ? <p style={{color:"rgb(12, 182, 12)",fontSize:"13px"}}>Login success</p> :""}
            { loginStatus.Status== false ? <p style={{color:" rgb(217, 8, 8)",fontSize:"13px"}}>Login failed {loginStatus.Message}</p> :""}
            <p style={{fontSize:"12px"}}>By continuing, you agree to Amazon's Conditions of Use and Privacy Notice.</p>
            <button  className="continue"
            onClick={()=>{ loginButton()}}>Continue</button>
            <hr/>
            <p style={{fontSize:"15px",fontWeight:"600"}}>Not Registered yet ?  <Link to = "/register" > SignUp</Link></p>
        </div>
        </div> </div>
    )
}
export default Login
