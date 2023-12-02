import React, { useEffect, useState } from 'react'
import SideBar from './../SideBar/SideBar';
import Note from '../Note/Note';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useFormik } from 'formik';
import axios from 'axios';


export default function Notes() {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [userNotes, setUserNotes] = useState([])


  const token = localStorage.getItem('token')
  // console.log(token);

 async function addNote(values){
    try {
      let {data} = await axios.post('https://note-sigma-black.vercel.app/api/v1/notes',values,{
      headers:{token}
    })
    if(data.msg ==='done'){
      handleClose()
      getUserNotes()
    }
    console.log(data);
    } 
    catch(error){
      console.log(error);
    }
  }


 async function getUserNotes(){
    try {
      let {data} = await axios.get('https://note-sigma-black.vercel.app/api/v1/notes',{
        headers:{token}
      })
      console.log(data);
      setUserNotes(data.notes)
    } 
    catch (error) {
      console.log(error);
    }
  }



  let formik = useFormik({
    initialValues:{
      "title": "",
      "content": ""
    },
    onSubmit:addNote
  })

  useEffect(() => {
    getUserNotes()
  }, [])
  


  return (

    <>
    

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <input onChange={formik.handleChange} type="text" className='form-control mb-4' name="title" id='title' placeholder='Title' />
            <input onChange={formik.handleChange} type="text" className='form-control' name="content" id='content' placeholder='Content' />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={formik.handleSubmit}>
            Add note
          </Button>
        </Modal.Footer>
      </Modal>


    <div className='overflow-hidden'>
      <div className="row">
        <div className="col-2">
            <div className='position-fixed col-lg-2'>
                <SideBar/>
            </div>
        </div>

        <div className="col-10 px-lg-5 px-2 py-5">
            <div className='text-end me-2'>
            <button onClick={handleShow} className='btn btn-primary text-white '><i className="fa-solid fa-plus"></i> Add Note</button>
            </div>
            <h2 className='text-muted fw-bold mt-4'>My Notes</h2>
          <hr />
          <div className="row mt-5">
            {/* <Note/> */}
            {userNotes.map((note,index)=>{return <Note key={index} getUserNotes={getUserNotes} noteDetails={note}/>})}
          </div>
          
        </div>
    </div>
    </div>
    </>
  )
}
