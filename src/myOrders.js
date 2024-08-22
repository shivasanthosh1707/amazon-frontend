import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function MyOrders({accountDetails}){
    const orderItems =  useSelector((state)=>{
        return state.orderItems[0]?.cartItems
    })
    // console.log(orderItems)
    const totalPrice = orderItems?.reduce((acc,item,i)=>{
        return acc + Number(item.Price)
      },0)
      const navigate = useNavigate()

  return(<div  style={{ height:" 600px"}} >
  
  {orderItems?.length > 0 ? <div>
    <h4 style={{textAlign:"center",margin:"20px"}}> YOUR ORDERS</h4>
    <h5 style={{textAlign:"center",margin:"20px",color:"green"}}>Dear {accountDetails.Name}, we are pleased to inform you that your order has been placed and will arrive at its destination soon. And your Cart value is {totalPrice} rupees</h5>
    <hr style={{width:"90%",margin:"auto"}}/>
   <div className=" orders-wrapper " style={{border:"1px solid  #e3e0e0",margin:"30px",borderRadius:"20px"}} >
   <h3>ordered items :</h3><br/>
      {
        orderItems?.map((item,i)=>{
            
          return <div>
          <div className="card cart-items " style={{ width:"30%",padding:"15px"}}>
         <img  src = {item?.Thumbnail} className="card-img-top product-img" style={{width:"50px",height:"50px",borderRadius:"10px"}} alt=".." /><hr/>
         <div className="product-card-body" style={{marginLeft:"30px",marginTop:"-20px"}}>
           <b className="card-title">{item.Title}</b>
           
        
           </div>
         </div>
         </div>
        })
                       
        }
      </div>
   </div> : <div style={{margin:"100px",marginLeft:"500px"}}>
    <p>No orders yet :) <button className="open-cart" 
    onClick={()=>{navigate('/cart')}}
    >Open Cart <i className="bi bi-cart-check-fill cart-icon" style={{fontSize:"16px"}}></i></button></p>
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSebsaqxu9d6UFSTitU-XvcTFVaE1mEDbXgVQ&s" style={{borderRadius:"10%"}}/>
   </div>
}

   </div>)
}
export default MyOrders