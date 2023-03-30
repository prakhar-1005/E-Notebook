import React, { useContext, useState } from 'react'
import noteValue from '../context/notes/noteContext';

const AddNote = (props) => {

    const val = useContext(noteValue);   
    const { addNote} = val;  

    const [note , setNote]=useState({title:"" , description:"" , tag:"" })

    const handleClick=()=>{
        addNote(note.title, note.description,note.tag)
        setNote({title:"", description:"",tag:""})  // to make the input fields empty once the note is added
        props.showAlert("Note Added Successfully", "success")
    }


    const handleChange=(e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }

  return (
    <div className='container rounded shadow-lg' style={{ background:'#4C6793', color:'white' ,width:'600px' , height:'500px', padding:'30px'}}>
        <h2 className='my-3 text-center'>Add Your Note</h2>
          <form className='my-3' onSubmit={(event) => event.preventDefault()}>
            <div className="mb-3 my-3">
              <label htmlFor="title" className="form-label">Title</label>
              <input type="text" className="form-control" id="title" name="title" required minLength={5} onChange={handleChange} value={note.title} aria-describedby="emailHelp"/>
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description</label>
              <textarea rows='4' className="form-control" id="description" required minLength={5} name="description" value={note.description} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="tag" className="form-label">Tag</label>
              <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={handleChange} />
            </div>

            <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary my-3" onClick={handleClick}>Add Note</button>
          </form>
    </div>
  )
}

export default AddNote
