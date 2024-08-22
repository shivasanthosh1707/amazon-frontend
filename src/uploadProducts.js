import axios from "axios";
import React from "react";
import { useState,useEffect } from "react";



function UploadProducts(){
    let [uploadProduct,setUploadProduct] = useState({
        Title : "",
        Price : "",
        Rating :"",
        Description :"",
        Thumbnail :""
    })
     const handleProductUpload = (e)=>{
        e.preventDefault()
        console.log("hio")
        let formData = new FormData()
        formData.set("Title", uploadProduct.Title)
        formData.set("Price", uploadProduct.Price)
        formData.set("Rating", uploadProduct.Rating)
        formData.set("Description", uploadProduct.Description)
        formData.append("Thumbnail", uploadProduct.Thumbnail)
// console.log(formData)
        let headers = {
            Accept : "multipart/form-data"
        }

        axios.post('/uploadProducts',formData ,{headers})
        .then((res)=>{
            console.log(res)
            if(res.data.success){
                alert("Product Uploaded Succesfully")
                }
        })
        .catch((err)=>{
            console.log(err)
        })

    }
    return(<>
    <div className="login-component-wrapper" style={{ width:"100%",height:"700px",background:"url('https://images.unsplash.com/file-1720553250263-3b4f25a93c9cimage?w=416&dpr=2&auto=format&fit=crop&q=60')",backgroundRepeat:"repeat"}}>

    
    {/* {JSON.stringify(uploadProduct)} */}

    <div style={{marginTop:"0px",marginBottom:"0px" }} className="login-component-div upload-product">
    <p> Sell your products here </p><br/>
        <form onSubmit={handleProductUpload}>
            <p>Title of your Item :</p>
            <input className="login-input" placeholder="Enter Title of the product" required
            onChange={(e)=>{setUploadProduct({...uploadProduct , Title : e.target.value})}} />
            <p>Cost of your Item :</p>
            <input className="login-input" placeholder="Enter Price of the product"
            onChange={(e)=>{setUploadProduct({...uploadProduct , Price : e.target.value})}}/>
            <p>Give Rating to your Item : </p>
            <input className="login-input" placeholder="Enter Rating of the product"
            onChange={(e)=>{setUploadProduct({...uploadProduct , Rating : e.target.value})}}/>
            <p>category of your product:</p>
            <input className="login-input" placeholder="Enter Description of the product"
            onChange={(e)=>{setUploadProduct({...uploadProduct , Description : e.target.value})}}/><br/><br/>
            <input type="file" accept="image/*"
            onChange={(e)=>{setUploadProduct({...uploadProduct , Thumbnail : e.target.files[0]})}}/><br/><br/>
            <input style={{fontSize:"15px"}} className="add-to-cart" type="submit" value ="Upload"/>

        </form>
    </div></div>
    </>)
}
export default UploadProducts