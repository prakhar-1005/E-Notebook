import React, { useContext } from 'react'
import noteValue from "../context/notes/noteContext";

const NoteItem = (props) => {
    const {note,updateNote,showAlert} = props;
    // console.log(props);
    // console.log(note);

    const val = useContext(noteValue);   
    // console.log(typeof val)
    const {deleteNote} = val;   // object destructuring to extract the notes and setNotes from 'val'
    // console.log(Array.isArray(notes));
    const handleDelete=()=>{
        deleteNote(note._id)
        showAlert("Note Deleted Successfully", "success")

    }

  return (
    <div className='col-md-3'>
      <div className="card my-3" >
        <div className="card-body">
            <h5 className="card-title">{note.title}</h5>
            <p className="card-text">{note.description}</p>
            <i className="fa-solid fa-trash" onClick={handleDelete}></i>
            <i className="fa-solid fa-file-pen mx-4" onClick={()=>{updateNote(note)}}></i>
        </div>
      </div>
    </div>
  )
}

export default NoteItem
