import React, { useState } from 'react'
import { Navigate } from 'react-router-dom';
import Swal from "sweetalert2";  
import useUserContext from './UserContext';

const UserAuth1 = ({children}) => {

 const {currentUser, seller} = useUserContext();

  if(currentUser!=null && seller===true){
    return children;
  } else {
    Swal.fire({
      icon : 'error',
      title : "OOPs....",
      text : "Please Login with Seller Profile to access this page"
    })

    return <Navigate to='/home'/>
  }

}

export default UserAuth1