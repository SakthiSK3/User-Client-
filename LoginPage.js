import React from 'react';
import {useFormik} from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify'
import axios from 'axios' 
 
const Login = (props) => {
  const formik =useFormik({
     initialValues:{
     
     email:" ",
     password:" ",
     
 },
validationSchema:yup.object ({
   
   email: yup.string()
   .email()
   .required("Email is required "),
   password: yup.string()
   .required("Password is required"),
}) ,
 
 onSubmit:(data) =>{ 
     console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>"+JSON.stringify(data))
     axios.post('http://localhost:5000/api/login',data)
     .then(res =>{
         localStorage.setItem('auth',JSON.stringify(res.data))
        props.history.push('/home')
     })
     .catch(err =>{
         toast.error(err.response.data)
     })
 } 
  })
     
     return(
            <div className="container mt-3">  
            <div className="jumbotron">
                <h4>Login</h4>
                <form autoComplete="off" method="post" onSubmit={formik.handleonSubmit}>
                    
                    <div className="form-group">
                    <label>Email:</label>
                     <input name="email" className="form-control" type="text"
                      onChange={formik.handleChange}
                      value={formik.values.email}/>
                      {
                           formik.errors.email ?
                          <div className="text-danger" > {formik.errors.email}
                          </div>:
                          null
                      }
                    </div>
                      <div className="form-group">
                    <label>password:</label>
                     <input name="password" className="form-control" type="text"
                      onChange={formik.handleChange}
                      value={formik.values.password}/>
                      {
                           formik.errors.password ?
                          <div className="text-danger" > {formik.errors.password}
                          </div>:
                          null
                      }
                      </div>
                     
                      <button  className=" btn btn-primary"> Submit </button>
                      <a href="#" onClick=  {()=>{
                            window.location.href='register'
                      }}>
                        <h4 className="pull-right" > Register  </h4>
                      </a>
                      
                </form>
                </div>
            </div>
        )
    }

export default Login;