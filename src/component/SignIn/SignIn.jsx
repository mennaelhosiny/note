import React, { useState } from 'react'
import styles from './SignIn.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'


export default function SignIn() {

  let navigate = useNavigate()

 const [errorHandle, setErrorHandle] = useState('') 

  const [isLoading, setIsLoading] = useState(false)
 
  async function handleSignIn(values){
    try {
      setIsLoading(true)
      let {data} = await axios.post('https://note-sigma-black.vercel.app/api/v1/users/signIn',values)
    console.log(data);
    if(data.msg === 'done'){
      setIsLoading(false)
      localStorage.setItem('token',`3b8ny__${data.token}`)
      navigate('/notes')
    }
    } catch(error){
      setIsLoading(false)
      console.log(error);
      setErrorHandle(error.response.data.msg) // 'email is already exist'
    }
  }

  let validation = Yup.object({
    email:Yup.string().required('*Your email is required').email("*Email must be valid email"),
    password:Yup.string().required('*Your password is required').matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,"at least one letter and one number"),
  })


  let formik = useFormik({
    initialValues:{
      "email":"",
      "password":""
    },
    validationSchema:validation,
    onSubmit:handleSignIn
  })
  return (
    <section className="sign-in d-flex justify-content-center align-items-center vh-100">
  <div className="container">
    <div className="signin-content row">
      <div className="signin-image col-md-6">
        <figure>
        <img className='w-100' src="Images/Notebook-cuate.png" alt="singIn" />
          </figure>
      </div>
      <div className="signin-form col-md-6 boxShadow mt-5">
        <h2 className="form-title fw-bold mt-5">Sign in</h2>
        <form onSubmit={formik.handleSubmit} className="register-form mt-4">
        {errorHandle ? <p className='text-danger text-start'>{errorHandle}</p> : null}
          <div className="form-group d-flex align-items-center mb-4">
            <label htmlFor="email">
                <i className="fa-solid fa-envelope"></i>
            </label>
            <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" name="email" id="email" placeholder="Your Email" />
          </div>
          {formik.errors.email && formik.touched.email  ? <p className='text-danger text-start'>{formik.errors.email }</p> :null}
          <div className="form-group d-flex align-items-center mb-4">
            <label htmlFor="password">
            <i className="fa-solid fa-lock"></i>
            </label>
            <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" name="password" id="password" placeholder="Password" />
          </div>
          {formik.errors.password && formik.touched.password ? <p className='text-danger text-start'>{formik.errors.password }</p> :null}
          <button type='submit' className='btn btn-primary'>
          
          {isLoading ? <i className='fa-solid fa-spinner fa-spin'></i> : "Login"}
          </button>
        </form>
        <div className="social-login d-flex flex-column justify-content-center align-items-center mt-4">
          <span className="social-label me-4 fs-5">Or Sign in with</span>
          <ul className="socials d-flex justify-content-evenly  list-unstyled">
            <li className=''><i className={`fa-brands fa-facebook ${styles.facebookIcon}`}></i></li>
            <li><i className={`fa-brands fa-twitter ${styles.twitterIcon}`}></i></li>
            <li><i className={`fa-brands fa-google-plus-g ${styles.googleIcon}`}></i></li>
          </ul>
          <p className='mt-3 me-3'>Don't Have an Account ?<Link to='/' className='text-primary  mx-3'>Sign Up</Link></p> 
        </div>
      </div>
    </div>
  </div>
</section>

  )
}
