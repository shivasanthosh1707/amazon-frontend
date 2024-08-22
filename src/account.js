import React from "react";

function Account({accountDetails,setAccountDetails}){
  return(
    <div className="profile-wrapper">
 <div className="container-fluid profile-div" >
       <div className="row">
          <div className="col-5 profile-left">
            <img className="profile-pic" src="https://static-00.iconduck.com/assets.00/profile-circle-icon-2048x2048-cqe5466q.png" alt="profile-picture"/>
            <h3>{accountDetails.Name}</h3>
            </div> 
           <div className=" col-5 profile-right">
            <table className="table">
              <tr>
                <td><b>Name  :</b></td><td>{accountDetails?.Name}</td>
              </tr>
              <tr>
                <td><b>Age  :</b></td><td>{accountDetails.Age?accountDetails.Age:"Na"}years</td>
              </tr>
              <tr>
                <td><b>Role  :</b></td><td>{accountDetails?.Gender== 0 ? "Male" : "Female"}</td>
              </tr>
              <tr>
                <td><b>Mobile  :</b></td><td>{accountDetails?.PhoneNumber}</td>
              </tr>
              <tr>
                <td><b>Email  :</b></td><td>{accountDetails?.Email}</td>
              </tr>
              <tr>
                <td><b>Address  :</b></td><td>{accountDetails.Address?accountDetails.Address:"Na"}</td>
              </tr>
              <tr>
                <td><b>Role  :</b></td><td>{accountDetails?.Role== 0 ? "Customer" : "Admin"}</td>
              </tr>
            </table>
          </div>
        </div>

        </div>

    </div>
  )
}
export default Account