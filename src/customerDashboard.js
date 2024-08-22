import axios from "axios"
import React, { useEffect, useState } from "react"
import { Buffer } from "buffer"
import { useDispatch,useSelector } from "react-redux"
import { addItem } from "./reducer"
import { useNavigate } from "react-router-dom"
import homeSlide1 from './Images/home1.jpg'
import homeSlide2 from './Images/home2.jpg'
import homeSlide3 from './Images/home3.jpg'
import homeSlide4 from './Images/home4.jpg'
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import Loader from "./loader"
function CustomerDashboard({filteredProducts,setFilteredProducts,product,setProduct}){

  let dispatch = useDispatch()
  let navigate = useNavigate()

  let  cartItems = useSelector((state)=>{
    return state.cartItems
  })
  // console.log(cartItems)

    useEffect(()=>{
        axios.get('/getProducts')
        .then((res)=>{
            // console.log(res.data.result)
            setProduct(res.data.result)
            // console.log(product)
        })},[])

     


    return(
        <>
        
        <div id="carouselExample" class="carousel slide" >
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src={homeSlide1} class="d-block w-100" alt="..."/>
    </div>
    <div class="carousel-item">
      <img src={homeSlide2} class="d-block w-100" alt="..."/>
    </div>
    <div class="carousel-item">
      <img src={homeSlide3} class="d-block w-100" alt="..."/>
    </div>
    <div class="carousel-item">
      <img src={homeSlide4} class="d-block w-100" alt="..."/>
    </div>
  </div>
  <button class="carousel-control-prev " type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
    <span class="carousel-control-prev-icon x" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next " type="button" data-bs-target="#carouselExample" data-bs-slide="next">
    <span class="carousel-control-next-icon x" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>


 <div className="row row-cols- row-cols-md-6 g-4 product-wrapper">
  
    {filteredProducts.length == 0 ? product.map((item,i)=>{
      return   <div className="col" >
       <div className="card product-card "  >
      <img  src = {`data:image/jpeg;base64,${Buffer.from(item.Thumbnail.data).toString("base64")}`} className="card-img-top product-img" alt=".." 
      onClick={()=>{navigate(`/product/${item._id}`)}}
      />
      <div className="product-card-body">
        <b className="card-title">{item.Title}</b>
        <p> <b>Price :</b>{item.Price} /-</p>
        <p><b>Rating : </b><span style={{marginRight:"5px"}}>{item?.Rating}</span><span style={{marginRight:"5px", color: `${item?.Rating >= 4.0 ?"green":"orange" }`}}><i class="bi bi-star-fill"></i></span> <span style={{marginRight:"05px"}}></span></p>

        <p className="card-text"><b>Category :</b>{item.Description}</p>
        <button type="button" class="btn btn-success add-to-cart"
        onClick={()=>{
          dispatch(addItem({ Title : item.Title ,
            Price : item.Price , Category : item.Description , Rating : item.Rating,
          Thumbnail : `data:image/jpeg;base64,${Buffer.from(item.Thumbnail.data).toString("base64")}`,
         Id : item._id
        }))
          toast( <><span  style={{marginRight: "50px"}}>1 item added</span> <b> VIEW CART <i className="bi bi-cart3"></i></b> </>
            ,{style:{
           color :"white",backgroundColor:"gray" }}) }
        }
        >Add to Cart <i class="bi bi-cart4"></i></button>
       
      </div>
    </div>
    </div>
    }): filteredProducts.map((item,i)=>{
      return   <div className="col">
      <div className="card product-card ">
     <img  src = {`data:image/jpeg;base64,${Buffer.from(item.Thumbnail.data).toString("base64")}`} className="card-img-top product-img" alt=".."
     onClick={()=>{navigate(`/product/${item._id}`)}}
     />
     <div className="product-card-body">
       <b className="card-title">{item.Title}</b>
       <p> <b>Price :</b>{item.Price} /-</p>
       <p><b>Rating : </b><span style={{marginRight:"5px"}}>{item?.Rating}</span><span style={{marginRight:"5px", color: `${item?.Rating >= 4.0 ?"green":"orange" }`}}><i class="bi bi-star-fill"></i></span> <span style={{marginRight:"05px"}}></span></p>
       
       <p className="card-text"><b>Category :</b>{item.Description}</p>
        <button type="button" class="btn btn-success add-to-cart"
        onClick={()=>{
          dispatch(addItem({ Title : item.Title ,
            Price : item.Price ,
          Thumbnail : `data:image/jpeg;base64,${Buffer.from(item.Thumbnail.data).toString("base64")}`,Category : item.Description,
          Id : item._id}))
          toast( <><span  style={{marginRight: "50px"}}>1 item added</span> <b> VIEW CART <i className="bi bi-cart3"></i></b> </>
            ,{style:{
           color :"white",backgroundColor:"gray" }})        
        }
          
        }
        >Add to Cart <i class="bi bi-cart4"></i></button>
      </div>
    </div>
    </div>
    })   }
    
  </div>
{/* toast */}
  <ToastContainer  onClick={()=>{
  navigate('/cart')
  
}}  position="bottom-right"
autoClose={2500} />
        </>
    )
}
export default CustomerDashboard