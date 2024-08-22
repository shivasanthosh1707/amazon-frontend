import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { Buffer } from "buffer";
import { addItem ,addFav} from "./reducer"
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch } from "react-redux";

function ProductDetails({loginStatus}){
    const [card,setCard] = useState({})
    const navigate = useNavigate()
    let dispatch = useDispatch()

    let id = useParams()
// console.log(id.params)
    useEffect(()=>{
        axios.get(`/getProduct/${id.params}`)
        .then((res)=>{ 
            // console.log(res.data.result)
            setCard(res?.data?.result)
        })
    },[])
    // console.log(card._id)

    return(
        <>
       <div className="product-info-div container-fluid">
        <div className="row">
            <div className="col-4 product-info-div-left">
     {card?.Thumbnail?.data?  <img  src = {`data:image/jpeg;base64,${Buffer.from(card?.Thumbnail?.data).toString("base64")}`} style={{width:"80%",height:"80%"}}  alt=".." />:"<p>item image not available</p>"}

            </div>
            <div className="col-6 product-info-div-right">
       <p><b>Product Name :</b> {card?.Title}</p>
       <p><b>Price:</b> {card?.Price} Rs</p>
       <p><b>Category :</b> {card?.Description}</p>
       <p><b>Rating : </b><span style={{marginRight:"5px"}}>{card?.Rating}</span><span style={{marginRight:"5px", color: `${card?.Rating >= 4.0 ?"green":"orange" }`}}><i class="bi bi-star-fill"></i></span> <span style={{marginRight:"05px"}}></span></p>
       <p><b>Item Id :</b> {card?._id}</p>
       <hr style={{width:"48%"}}/>
        
       {loginStatus.Role == 0 ?<button type="button" class="btn btn-success add-to-cart"
       style={{width:"50%"}}
        onClick={()=>{
          dispatch(addItem({ Title : card.Title ,
            Price : card.Price , Category : card.Category , Rating : card.Rating,
          Thumbnail : `data:image/jpeg;base64,${Buffer.from(card.Thumbnail.data).toString("base64")}`, Id : card._id}))
          toast( <><span  style={{marginRight: "50px"}}>1 item added</span> <b> VIEW CART <i className="bi bi-cart3"></i></b> </>
            ,{style:{
           color :"white",backgroundColor:"gray" }}) }
        }
        
        >Add to Cart <i class="bi bi-cart4"></i></button>:
        <button
        onClick={()=>{navigate('/adminDashboard')}}
         type="button" class="btn btn-success add-to-cart"
       style={{width:"50%"}}
      
        >Back </button>}<br/><br/>

<button type="button" class="btn btn-success add-to-cart"
       style={{width:"50%"}}
        onClick={()=>{
          dispatch(addFav({ Title : card.Title ,
            Price : card.Price , Category : card.Description , Rating : card.Rating , Id : card?._id ,
          Thumbnail : `data:image/jpeg;base64,${Buffer.from(card.Thumbnail.data).toString("base64")}`}))
          toast( <><span  style={{marginRight: "50px"}}>1 item added</span> <b> WISH LIST <i className="bi bi-heart"></i></b> </>
            ,{style:{
           color :"white",backgroundColor:"gray" }}) }
        }
        >Add to wishlist <i style={{color:"white"}} class="bi bi-heart"></i></button>


            </div>
        </div>
        <ToastContainer  onClick={()=>{
  navigate('/cart')
  
}}  position="bottom-right"
autoClose={2500} />
       </div>
        </>

    )
}
export default ProductDetails