import axios from "axios"
import React, { useEffect, useState } from "react"
import { Buffer } from "buffer"
import { useNavigate } from "react-router-dom"
import homeSlide1 from './Images/home1.jpg'
import homeSlide2 from './Images/home2.jpg'
import homeSlide3 from './Images/home3.jpg'
import homeSlide4 from './Images/home4.jpg'
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

function AdminDashboard({product,setProduct,filteredProducts,setFilteredProducts}){
    
    const [pageReRender,setPageReRender]= useState(false)
    const navigate = useNavigate()
    useEffect(()=>{
        axios.get('/getProducts')
        .then((res)=>{
            console.log(res)
            setProduct(res.data.result)
            // console.log(product)
        })},[pageReRender])
  function deleteProduct(id){
    console.log(id)
    axios.delete(`/deleteProduct/${id}`)
    .then((res)=>{
      // console.log(res)
      if(res.data.success){
        alert("Product Deleted Successfully")
        setPageReRender(!pageReRender)
      }
    })
    .catch((err)=>{
      console.log(err)
    })
  }
  console.log(filteredProducts)
    return(

  <div   style={{backgroundColor:"#e8ebeb"}} >
               <div id="carouselExample" class="carousel slide">
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
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
    <span class="carousel-control-prev-icon x" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
    <span class="carousel-control-next-icon x" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>

        <div className="row row-cols-1 row-cols-md-6 g-4 product-wrapper">
  
    {filteredProducts.length == 0 ?product.map((item,i)=>{
     return <div className="col">
     <div className="card product-card ">
    <img  src = {`data:image/jpeg;base64,${Buffer.from(item.Thumbnail.data).toString("base64")}`} className="card-img-top product-img" alt=".." 
    onClick={()=>{navigate(`/product/${item._id}`)}}
    />
    <div className="product-card-body">
      <b className="card-title">{item.Title}</b>
      <p> <b>Price :</b>{item.Price} /-</p>
      <p><b>Rating : </b><span style={{marginRight:"5px"}}>{item?.Rating}</span><span style={{marginRight:"5px", color: `${item?.Rating >= 4.0 ?"green":"orange" }`}}><i class="bi bi-star-fill"></i></span> <span style={{marginRight:"05px"}}></span></p>
     
      <p className="card-text"><b>Category :</b>{item.Description}</p>
        <button type="button" class="btn  remove-btn"
        onClick={()=>{
          deleteProduct(item._id)
          toast( <><span  style={{marginRight: "50px"}}>1 Item Deleted</span>  </>
            ,{style:{
           color :"white",backgroundColor:"gray" }})
        }
      }
        >Delete Item <i class="bi bi-trash3-fill"></i></button>
      </div>
    </div>
    </div>
    }) :     filteredProducts.map((item,i)=>{
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
        <button type="button" class="btn  remove-btn"
        onClick={()=>{
          deleteProduct(item._id)
          toast( <><span  style={{marginRight: "50px"}}>1 Item Deleted</span>  </>
            ,{style:{
           color :"white",backgroundColor:"gray" }})
        }}
        >Delete Item <i class="bi bi-trash3-fill"></i></button>
      </div>
    </div>
    </div>
    })}
    {/* toast  */}
      <ToastContainer  onClick={()=>{
  navigate('/cart')
  
}}  position="bottom-right"
autoClose={2500} />
    
  </div>


        </div>
    )
}
export default AdminDashboard