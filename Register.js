import React from 'react';
import {useFormik} from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import {toast} from 'react-toastify'
const Form = (props) => {
  const formik =useFormik({
     initialValues:{
     name:" ",
     email:" ",
     password:" ",
     confirmpassword:" "
 },
validationSchema:yup.object ({
    name: yup.string()
    .required( 'This Field  is required'),
   email: yup.string()
   .email('Enter vaild Password')
   .required('This Field  is required'),
   password: yup.string()
   .required('This Field  is required'),
   confirmpassword: yup.string()
   .oneOf([yup.ref("password")],"Must be same ")
   .required('This Field  is required ')
}) ,

onSubmit:(data) => {
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>"+JSON.stringify(data))
     axios.post('http://localhost:5000/api/register',data)
      .then(res =>  {
         toast.success("User successful Registered")
        props.history.push('/login')
     }) 
     .catch(err =>{
         toast.error(err.response.data)
     })
  
  }
 
})
    return(
            <div className="container mt-3">  
            <div className="jumbotron">
                <h4>Register</h4>
                <form autoComplete="off" onSubmit={formik.onSubmit}>
                    <div className="form-group">
                    <label>Name:</label>
                     <input className="form-control"
                      type="text"
                      name="name"
                      onChange={formik.handleChange}
                      value={formik.values.name} />
                      {
                           formik.errors.name ?
                          <div className="text-danger" > {formik.errors.name }
                          </div>:
                          null
                      }
                      </div>
                      <div className="form-group">
                    <label>Email:</label>
                     <input
                     className="form-control" type="text"
                      name="email"
                      onChange={formik.handleChange}
                      value={formik.values.email} />
                      {
                           formik.errors.email ?
                          <div className="text-danger" > {formik.errors.email}
                          </div>:
                          null
                      }
                      </div>
                      <div className="form-group">
                    <label>password:</label>
                     <input
                     className="form-control" type="text"
                      name="password"
                      onChange={formik.handleChange}
                      value={formik.values.password} />
                      {
                           formik.errors.password ?
                          <div className="text-danger" > {formik.errors.password}
                          </div>:
                          null
                      }
                      </div>
                      <div className="form-group">
                    <label>Confirm Password:</label>
                     <input
                     className="form-control" type="text"
                      name="confirmpassword"
                      onChange={formik.handleChange}
                      value={formik.values.confirmpassword} />
                      {
                           formik.errors.confirmpassword ?
                          <div className="text-danger" > {formik.errors.confirmpassword}
                          </div>:
                          null
                      }
                      </div>
                      <button  type=" button" className=" btn btn-primary"> Submit </button>
                      <a href="#" onClick=  {()=>{
                            window.location.href='login'
                      }}>
                         <h4 className="pull-right" >login</h4>
                      </a>
                      
                </form>
                </div>
            </div>
        )
    }

export default Form;