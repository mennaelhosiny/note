import React, { useState } from 'react'
import './Register.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'


export default function Register() {

  let navigate = useNavigate()

 const [errorHandle, setErrorHandle] = useState('') 

  const [isLoading, setIsLoading] = useState(false)



 async function handleRegister(values){
  try {
    setIsLoading(true)
    let {data} = await axios.post('https://note-sigma-black.vercel.app/api/v1/users/signUp',values)
  console.log(data);
  if(data.msg === 'done'){
    setIsLoading(false)
    navigate('/signin')
  }
  } catch(error){
    setIsLoading(false)
    console.log(error);
    setErrorHandle(error.response.data.msg) // 'email is already exist'
  }
}


let validation = Yup.object({
  name:Yup.string().required('*Your name is required').min(3,"min charcs are 3 charcs").max(15,"max charcs are 15 charcs"),
  email:Yup.string().required('*Your email is required').email("*Email must be valid email"),
  password:Yup.string().required('*Your password is required').matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,"at least one letter and one number"),
  age:Yup.number().required('*Your age is required').min(18,"*Your age must bigger than 18").max(60,"*Your age must lower than 60"),
  phone:Yup.string().required('*Your phone is required').matches(/^01[0125][0-9]{8}$/,"*Your number must be an Egyptian number")
})

let formik = useFormik({
  initialValues:{
    "name":"",
    "email":"",
    "password":"",
    "age":"",
    "phone":""
  },
  validationSchema:validation,
  onSubmit:handleRegister
})

  return (
    <>
   <section className="signup d-flex justify-content-center align-items-center vh-100">
  <div className="container">
    <div className="signup-content row">
      <div className="signup-form col-md-6 boxShadow">
        <h2 className="form-title fw-bold">Sign up</h2>
        <form onSubmit={formik.handleSubmit} className="register-form mt-4">
          {errorHandle ? <p className='text-danger text-start'>{errorHandle}</p> : null}
          <div className="form-group d-flex align-items-center mb-4">
            <label htmlFor="name">
            <i className="fa-solid fa-user"></i>
            </label>
            <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" name="name" id="name" placeholder="Your Name" />
          </div>
          {formik.errors.name && formik.touched.name ? <p className='text-danger text-start'>{formik.errors.name }</p> :null}
          <div className="form-group d-flex align-items-center mb-4">
            <label htmlFor="email">
                <i className="fa-solid fa-envelope"></i>
            </label>
            <input onChange={formik.handleChange}  onBlur={formik.handleBlur}  type="email" name="email" id="email" placeholder="Your Email" />

          </div>
          {formik.errors.email && formik.touched.email  ? <p className='text-danger text-start'>{formik.errors.email }</p> :null}

          <div className="form-group d-flex align-items-center mb-4">
            <label htmlFor="password">
            <i className="fa-solid fa-lock"></i>
            </label>
            <input onChange={formik.handleChange} onBlur={formik.handleBlur}  type="password" name="password" id="password" placeholder="Password" />

          </div>
          {formik.errors.password && formik.touched.password ? <p className='text-danger text-start'>{formik.errors.password }</p> :null}

          <div className="form-group d-flex align-items-center mb-4">
            <label htmlFor="phone">
            <i className="fa-solid fa-phone"></i>
            </label>
            <input onChange={formik.handleChange}  onBlur={formik.handleBlur}  type="text" name="phone" id="phone" placeholder="Phone" />

          </div>
          {formik.errors.phone  && formik.touched.phone ? <p className='text-danger text-start'>{formik.errors.phone }</p> :null}

          <div className="form-group d-flex align-items-center mb-4">
            <label htmlFor="age">
            <i className="fa-solid fa-globe"></i>
            </label>
            <input onChange={formik.handleChange} onBlur={formik.handleBlur}  type="number" name="age" id="age" placeholder="Age" />
          </div>
          {formik.errors.age && formik.touched.age ? <p className='text-danger text-start'>{formik.errors.age }</p> :null}

          <button type='submit' className='btn btn-primary'>
          {isLoading ? <i className='fa-solid fa-spinner fa-spin'></i> : "Register"}
          </button>
          <p className='mt-5 me-3'>Have an Account ?<Link to='/signin' className='text-primary mx-3'>Sign In</Link></p> 
        </form>
      </div>
      <div className="signup-image col-md-6 d-flex justify-content-center align-items-center px-5">
        <figure>
        <img className='w-100' src="Images/Add notes-bro.png" alt="singUp" />
        </figure>
      </div>
    </div>
  </div>
</section>

    </>
  )
}
