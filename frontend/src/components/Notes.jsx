import React, {useContext, useEffect, useRef, useState} from 'react'
import noteValue from "../context/notes/noteContext";
import AddNote from './AddNote';
import NoteItem from './NoteItem';
import {useNavigate} from 'react-router-dom';  // used for redirecting the user


const Notes = (props) => {

    let navigate = useNavigate();
    const val = useContext(noteValue);   
    // console.log(typeof val)
    const {notes,getNotes,editNote} = val;   // object destructuring to extract the notes and setNotes from 'val'
    // console.log(Array.isArray(notes));

    const [note , setNote]=useState({id:"" ,etitle:"" , edescription:"" , etag:"" })

    const ref = useRef(null)  // useRef is used to give refernce to a particular element
    const refClose = useRef(null)

    useEffect(()=>{
      if(localStorage.getItem('token')){
        getNotes()
      }
      else{
        props.showAlert("Please Login To View Your Notes", "warning")
        navigate("/login");
      }
      // eslint-disable-next-line
    },[])


    const updateNote = (currentNote)=>{
      ref.current.click()
      setNote({id:currentNote._id, etitle:currentNote.title, edescription:currentNote.description, etag:currentNote.tag})
    }


    const handleClick=()=>{
      editNote(note.id, note.etitle ,note.edescription, note.etag);
      refClose.current.click(); 
      props.showAlert("Note Updated Successfully", "success")

    }


    const handleChange=(e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }



  return (

    <>
    <AddNote showAlert={props.showAlert}/>

{/*Modal for editing notes */}
    <button type="button" className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
      Launch demo modal
    </button>

    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body" >
            
          <form className='my-3' onSubmit={(event) => event.preventDefault()}>
            <div className="mb-3 my-3">
              <label htmlFor="etitle" className="form-label">Title</label>
              <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} required minLength={5} onChange={handleChange} aria-describedby="emailHelp"/>
            </div>
            <div className="mb-3">
              <label htmlFor="edescription" className="form-label">Description</label>
              <textarea rows='5' cols='10'  className="form-control" id="edescription" name="edescription" required minLength={5} value={note.edescription} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="etag" className="form-label">Tag</label>
              <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={handleChange} />
            </div>

          </form>
          </div>

          <div className="modal-footer">
            <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="button" onClick={handleClick} disabled={note.etitle.length<5 || note.edescription.length<5} className="btn btn-primary">Update Note</button>
          </div>
        </div>
      </div>
    </div>


    <div className='row' style={{margin:'50px 0 0 0 '}}>
        <h3>Your Notes</h3>
        <div className='container mx-2 '>
          {notes.length === 0 && "No notes to display"}
        </div>
        {notes.map((note)=>{  // .map() function is generally used for modifying an existing array & returning it
            return <NoteItem key={note._id} showAlert={props.showAlert} updateNote={updateNote} note={note} /> ;  // passing props
        })}
    </div>
    </>
  )
}

export default Notes
