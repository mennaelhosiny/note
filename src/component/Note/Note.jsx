import React, { useState } from 'react'
import './Note.css'
import axios from 'axios'
import Swal from 'sweetalert2'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useFormik } from 'formik';


export default function Note({noteDetails,getUserNotes}) {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // noteDetails --> {title,content,_id}
  let {title,content,_id} = noteDetails

  const token = localStorage.getItem('token')


  function deleteNote(_id){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'mx-3 btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        deleteAction(_id)
        swalWithBootstrapButtons.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })
  }



 async function deleteAction(_id){
    let {data} = await axios.delete(`https://note-sigma-black.vercel.app/api/v1/notes/${_id}`,{
      headers:{token}
    })
    console.log(data);
    getUserNotes()
  }

 async function updateNote(values){
    let {data}= await axios.put(`https://note-sigma-black.vercel.app/api/v1/notes/${_id}`,values,{
      headers:{token}
    })
    console.log(data);
    handleClose()
    getUserNotes()
  }

  let formik = useFormik({
    initialValues:{
      "title": "",
      "content": ""
    },
    onSubmit:updateNote
  })

  return (
   <>

<Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <input onChange={formik.handleChange} defaultValue={title} type="text" className='form-control mb-4' name="title" id='title' placeholder='Title' />
            <input onChange={formik.handleChange} defaultValue={content} type="text" className='form-control' name="content" id='content' placeholder='Content' />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={formik.handleSubmit}>
            update note
          </Button>
        </Modal.Footer>
      </Modal>





    <div className="col-md-4 col-sm-6 content-card">
      <div className="card-big-shadow">
        <div className="card card-just-text" data-background="color" data-color="yellow" data-radius="none">
          <div className="content">
            <h3 className="title text-white">{title}</h3>
            <p className="description">{content}</p>
            <div className='d-flex justify-content-evenly'>
              <i onClick={handleShow} className="fa-solid fa-pen-to-square text-primary cursor-pointer"></i>
              <i onClick={()=>deleteNote(_id)} className="fa-solid fa-trash text-danger cursor-pointer"></i>
            </div>
          </div>
        </div> 
      </div>
    </div>

   </>
  )
}
