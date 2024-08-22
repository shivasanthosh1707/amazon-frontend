import React from "react";
import {useDispatch, useSelector } from "react-redux";
import { addItem, removeFromCart ,orderNow,favItems} from "./reducer";
import { Buffer } from "buffer";
import { useNavigate } from "react-router-dom";
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
function Cart ({product,filteredProducts}){

const dispatch = useDispatch()
const navigate = useNavigate()

const cartItems =  useSelector((state)=>{
    return state.cartItems
})
const favItems =  useSelector((state)=>{
  return state.favItems
  
})
console.log(cartItems)
console.log(favItems)
// total cart price
const totalPrice = cartItems?.reduce((acc,item,i)=>{
  return acc + Number(item.Price)
},0)


    return(
    
    

      <div className="container-fluid cart-wrapper">
        <h3 style={{textAlign :"center"}}> YOUR CART</h3>
      <div className="row">
      <div className="col-8 cart-left">
       { cartItems.length == 0 ? <div className="empty-cart">
          <h2 style={{padding:"20px,",textAlign:"center"}}>Your Amazon Cart is empty. </h2><hr style={{width:"90%",margin:"auto"}}/>
          <p style={{padding:"15px",fontSize:"14px",textAlign:"center"}}>When you ReLogin, Cart Items was removed from Shopping Cart.</p>
          <h5 style={{textAlign:"end"}}>Subtotal (0 items):</h5>
        </div> :
        cartItems.map((item,i)=>{
          // console.log(item)
          return <div className="col ">
          <div className="card cart-items ">
         <img  src = {item.Thumbnail} className="card-img-top product-img" style={{width:"150px",borderRadius:"0px"}} alt=".." 
              onClick={()=>{navigate(`/product/${item?.Id}`)}}
         /><hr/>
         <div className="product-card-body" style={{marginLeft:"30px",marginTop:"-20px"}}>
           <b className="card-title">{item.Title}</b>
           <p> <b>Price :</b>{item.Price} Rs</p>
           <p><b>Rating : </b><span style={{marginRight:"5px"}}>{item?.Rating}</span><span style={{marginRight:"5px", color: `${item?.Rating >= 4.0 ?"green":"orange" }`}}><i class="bi bi-star-fill"></i></span> <span style={{marginRight:"05px"}}></span></p>
           <p className="card-text"><b>Category :</b>{ item?.Category  }</p>
           <p className="card-text"><b>Item Id :</b>{ item?.Id  }</p>
          <button
          onClick={()=>{
           dispatch( removeFromCart(i))
           toast( <><span>1 item removed from</span> <b> <i className="bi bi-cart3"></i></b> </>
            ,{style:{
           color :"white",backgroundColor:"gray" }})
          }} style={{}}
          className="remove-btn">Remove <i class="bi bi-trash3-fill"></i></button>
     
           
           </div>
         </div>
         </div>
        })
        
        
        
        }
      </div>
      <div className="col-4 cart-right">
   



       { favItems?.length > 0 ?<div className="bill-wrapper">
          <h5 style={{padding:"0px,",textAlign:"center"}}>WISHLIST</h5>
          {favItems.map((item,i)=>{
            return<><div className="bill-wrapper-in" >
              <img style={{width:"50px",height:"50%",marginRight:"10px", borderRadius:"10px"}}  src = {item.Thumbnail} className="card-img-top product-img" alt=".." 
              onClick={()=>{navigate(`/product/${item?.Id}`)}}
             
              />
              <p>{item.Title} for <b>{item.Price} Rs</b></p>
              {/* <p>{item.Id}</p> */}

              <button type="button"
              
              class="btn btn-success add-to-cart"
        onClick={()=>{
          dispatch(addItem({ Title : item.Title ,
            Price : item.Price , Category : item.Category , Rating : item.Rating,
          Thumbnail : item.Thumbnail, Id : item.Id}))
        }
          
        }
        >Add to Cart <i class="bi bi-cart4"></i></button>
            </div>
            <hr style={{width:"90%",textAlign:"center",margin:"auto"}}/></> 
            
          })}
        </div>: ""}



{filteredProducts?.length > 0 ? <div className="bill-wrapper">
          <h5 style={{padding:"0px,",textAlign:"center"}}>Recommended Items</h5>
          {filteredProducts?.map((item,i)=>{
            return<><div className="bill-wrapper-in" >
              <img style={{width:"50px",height:"50%",marginRight:"10px", borderRadius:"10px"}}  src = {`data:image/jpeg;base64,${Buffer.from(item.Thumbnail.data).toString("base64")}`} className="card-img-top product-img" alt=".."
              onClick={()=>{navigate(`/product/${item?._id}`)}}
              
              />
              <p>{item.Title} for <b>{item.Price} Rs</b></p>
              {/* <p>{item._id}</p> */}
              <button type="button"
              
              class="btn btn-success add-to-cart"
        onClick={()=>{
          dispatch(addItem({ Title : item.Title ,
            Price : item.Price , Category : item.Description , Rating : item.Rating, Id : item._id ,
          Thumbnail : `data:image/jpeg;base64,${Buffer.from(item.Thumbnail.data).toString("base64")}`}))
        }
          
        }
        >Add to Cart <i class="bi bi-cart4"></i></button>
            </div>
            <hr style={{width:"90%",textAlign:"center",margin:"auto"}}/></> 
            
          })}
        </div> : ""}














   {  cartItems.length > 0 ?   <div className="bill-wrapper">
          <h5 style={{padding:"0px,",textAlign:"center"}}>BUY ITEMS</h5>
          {cartItems.map((item,i)=>{
            return<><div className="bill-wrapper-in" >
              <img style={{width:"50px",height:"50%",marginRight:"10px", borderRadius:"10px"}}  src = {item.Thumbnail} className="card-img-top product-img" alt=".." />
              <p>{item.Title} for <b>{item.Price} Rs</b></p>
             
            </div>
            <hr style={{width:"90%",textAlign:"center",margin:"auto"}}/></> 
            
          })}
          <b>Subtotal ({cartItems.length} items):</b> <br/><b>Total Cost :{totalPrice} /-</b>
          <button onClick={()=>{
            dispatch(orderNow({cartItems}))
            setTimeout(()=>{navigate('/orders')},2000)
          }} className="add-to-cart" style={{color:"black",marginTop:"10px"}}>Order Now</button>
        </div> : ""}
      </div>

</div>
<ToastContainer  onClick={()=>{
 
  
}}  position="bottom-right"
autoClose={2500} /></div>

    )
}
export default Cart