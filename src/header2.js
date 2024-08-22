import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Header2({product,setProduct,filteredProducts,setFilteredProducts,loginStatus}){

  const navigate = useNavigate()


    function applyFilter(category){
// console.log(category,product)
    let productCopy=[...product]
    if(category== "Mobiles"){
        let result = productCopy.filter((item,i)=>{
          if(item.Description == "mobile"){
            return true
          }
        })
        setFilteredProducts(result)
        // console.log(filteredProducts)
     } else if (category== "Shoe"){
            let result = productCopy.filter((item,i)=>{
              if(item.Description == "Shoe"){
                return true
              }
            })
            setFilteredProducts(result)
            // console.log(filteredProducts)
            }if(category== "Watch"){
                let result = productCopy.filter((item,i)=>{
                  if(item.Description == "Watch"){
                    return true
                  }
                })
                setFilteredProducts(result)
                // console.log(filteredProducts)
                }if(category== "Laptop"){
                    let result = productCopy.filter((item,i)=>{
                      if(item.Description == "Laptop"){
                        return true
                      }
                    })
                    setFilteredProducts(result)
                    // console.log(filteredProducts)
                    }if(category== "Beauty"){
                        let result = productCopy.filter((item,i)=>{
                          if(item.Description == "Beauty"){
                            return true
                          }
                        })
                        setFilteredProducts(result)
                        // console.log(filteredProducts)
                        }if(category== "Book"){
                            let result = productCopy.filter((item,i)=>{
                              if(item.Description == "Book"){
                                return true
                              }
                            })
                            setFilteredProducts(result)
                            // console.log(filteredProducts)
                            }if(category== "Dress"){
                                let result = productCopy.filter((item,i)=>{
                                  if(item.Description == "Dress"){
                                    return true
                                  }
                                })
                                setFilteredProducts(result)
                                // console.log(filteredProducts)
                                }if(category== "Tv"){
                                    let result = productCopy.filter((item,i)=>{
                                      if(item.Description == "Tv"){
                                        return true
                                      }
                                    })
                                    setFilteredProducts(result)
                                    // console.log(filteredProducts)
                                    }if(category== "Jewellery"){
                                        let result = productCopy.filter((item,i)=>{
                                          if(item.Description == "Jewellery"){
                                            return true
                                          }
                                        })
                                        setFilteredProducts(result)
                                        // console.log(filteredProducts)
                                        }if(category== "All"){
                                            
                                            setFilteredProducts([])
                                            // console.log(filteredProducts)
                                            }



    }
    return(
        <>
        <div className="header2"  onClick={()=>{
          if(loginStatus.Role== 0){
          navigate('/customerDashboard')
          }else if(loginStatus.Role){
            navigate('/adminDashboard')
          }
        }}>

            <p onClick={() => {applyFilter("All")}}>All</p>
            <p onClick={() => {applyFilter("Mobiles")}}>Mobiles</p>
            <p onClick={() => {applyFilter("Laptop")}}>Laptops</p>
            <p onClick={() => {applyFilter("Tv")}}>TV </p>
            <p onClick={() => {applyFilter("Dress")}}>Dresses</p>
            <p onClick={() => {applyFilter("Shoe")}}>Shoes</p>
            <p onClick={() => {applyFilter("Book")}}>Books</p>
            <p onClick={() => {applyFilter("Beauty")}}>Beauty</p>
            <p onClick={() => {applyFilter("Jewellery")}}>Jewellery</p>
            <p onClick={() => {applyFilter("Watch")}}>Watches</p>




        </div>
       
        </>
    )
}
export default Header2