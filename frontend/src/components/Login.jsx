import React from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../css/login.css';



const Login = () => {


    const loginSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string().required('Required'),
      });
     
       const loginForm = useFormik({
         initialValues: {
           email: '',
           password: ''
       },
       onSubmit : async (values) => {
         console.log(values);
         
         //submit values to backend
         const res = await fetch("http://localhost:5000/user/authenticate",
         {method:'POST',
          body:JSON.stringify(values),
          headers:{
           'Content-Type': 'application/json'
          } ,
     
         
       });
       
       console.log(res.status);
       if(res.status === 200){
         Swal.fire({
           icon: 'success',
           title:'Login Successful !!'
         })
     
        //  const data = await res.json();
        //  sessionStorage.setItem('user',JSON.stringify(data));
        //   setLoggedIn(true);
     
       }else if(res.status === 401){
         Swal.fire('Invalid Credentials','Please check your credentials and try again.','warning')
       }
       else{
         Swal.fire({
           icon:'error',
           title: 'Oops',
           text: 'Some error occured'
       });
       }
       
       
       },
         validationSchema: loginSchema
     });

  return (
        <div className='bg-login'>
          <div className='d-flex justify-content-center align-items-center vh-100'>
            <div className='card  card-shadow-lg mb-5 w-50' style={{width:'350px'}}>
              <div className='card-body p-4'>
              <i className='fa-solid fa-lock fa-2x d-block text-center'></i>
                <h3 className='text-center'>Login</h3>
                <form onSubmit={loginForm.handleSubmit}>
                  <div className='form-group py-2'>
                  <p className='error-label'>{loginForm.touched.email? loginForm.errors.email :'' }</p>
                  <div className="d-flex">
           <i className="fa-solid fa-envelope fa-2x me-3"></i>
                    
                    <input type='' className='form-control mb-4 p-2' id='Email' placeholder='Enter email'  name="email" onChange={loginForm.handleChange} value={loginForm.values.email}/>
                    </div>
                  
                    <p className='error-label'>{ loginForm.touched.password ? loginForm.errors.password :''}</p>
                    <div className="d-flex">
           <i className="fa-solid fa-key fa-2x me-3"></i>
                    <input type='password' className='form-control mb-3 p-2' id='pass' placeholder='Enter Password'  name="password" onChange={loginForm.handleChange} value={loginForm.values.password}/>
                    <i className="fa-solid fa-eye px-2" style={{marginLeft:'-35px',marginTop:'10px'}}
             onClick={

function(){
  var x = document.getElementById("pass");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }

}
}></i>
                   </div>
                  </div>
                  
                  <button type='submit' className='btn btn-primary w-100 rounded-5 mt-2'>SIGN IN</button>
                </form>
               
               <p className='text-center mt-2'>No Account?
                <Link to="/signup" className='fw-bold text-success text-decoration-none'>Create One</Link>
               </p>
    
               
               
               
               
              </div>
            </div>
          </div>
        </div>
      
  )
}

export default Login