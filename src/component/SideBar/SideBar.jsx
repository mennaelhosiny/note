import React from 'react'
import styles from './SideBar.module.css'
import { Link, useNavigate } from 'react-router-dom'

export default function SideBar() {
  let navigate = useNavigate()
  function handleLogout(){
    localStorage.removeItem('token')
    navigate('/signin')
  }
  return (
    <>
   <nav className={`${styles.sidebar} vh-100`}>
  <div className="p-4 pt-5">
    <div className='d-flex align-items-center mb-5'>
    <h3 className='m-0'>Notes</h3>
    <i className="fa-regular fa-note-sticky mx-3 fs-3 text-warning"></i>
    </div>
    <ul className="list-unstyled components mb-5">
      <li className="d-flex align-items-center my-4">
        <Link to='/register'>
        Register
        <i className="fa-solid fa-user text-white mx-4"></i>
        </Link>
      </li>
      <li className='d-flex align-items-center'>
        <Link onClick={handleLogout}>
        Log Out
        <i className="fa-solid fa-right-to-bracket text-white mx-3"></i>
        </Link>
      </li>
    </ul>
  </div>
</nav>

    </>
  )
}
