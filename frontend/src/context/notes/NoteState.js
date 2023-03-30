import { useState } from "react";
import NoteValue from "./noteContext";

const NoteState =(props)=>{
        // const info ={
        //     name: 'Prakhar',
        //     age: 20
        // }
        // const [infoVal,setinfoVal] = useState(info)

        // const update = ()=>{
        //     setTimeout(() => {
        //         setinfoVal({name:"pandey" , age:21})
        //     }, 1000);  // after 1 sec
        // }


        const [notes,setNotes] = useState([])
        


        // Getting notes 
        const getNotes = async()=>{

            // API call
            try {
              const response = await fetch("http://localhost:5000/api/notes/fetchnotes", {
                method: "GET", 

                headers: {
                  "Content-Type": "application/json",
                  "auth-token":localStorage.getItem('token')
                },
              
              });
              const json = await response.json(); 
            //   console.log(json);
            setNotes(json)              
            } catch (error) {
              console.log(error);
            }

        }

        // Adding note 
            const addNote = async(title, description, tag)=>{

                // API call
                const response = await fetch("http://localhost:5000/api/notes/addnote", {
                    method: "POST", 
                    
                    headers: {
                      "Content-Type": "application/json",
                      "auth-token":localStorage.getItem('token')
                    },
                  
                    body: JSON.stringify({title,description,tag}), 
                  });
                  const json = await response.json(); 

                const note = json;
                // setNotes(notes.push(note)) --> can't use push() as it does not return an array but modifies the existing array

                setNotes(notes.concat(note))
            }



        // Editing note 
            const editNote = async (id,title,description,tag)=>{

                // API call
                const response = await fetch(`http://localhost:5000/api/notes/updatenote/${id}`, {
                    method: "PUT", 
                    
                    headers: {
                      "Content-Type": "application/json",
                      "auth-token":localStorage.getItem('token')
                    },
                  
                    body: JSON.stringify({title,description,tag}), 
                  });
                  const json = await response.json(); 
                // console.log(notes);
                const newNotes = JSON.parse(JSON.stringify(notes));  // creates a new deep copy of notes and stores it in newNotes by first converting the notes which is an array as a string and then converting it into a object

                //Logic to edit the notes 
                for (let index = 0; index < newNotes.length; index++) {
                    const element = newNotes[index];  
                    if(element._id===id){
                      newNotes[index].title=title
                      newNotes[index].description=description
                      newNotes[index].tag=tag
                      break;
                    }
                  
                }

                setNotes(newNotes)
            }

        
            // Deleting note 
            const deleteNote = async (id) =>{
            
                // API call
                const response = await fetch(`http://localhost:5000/api/notes/deletenote/${id}`, {
                    method: "DELETE", 
                    
                    headers: {
                      "Content-Type": "application/json",
                      "auth-token":localStorage.getItem('token')
                    },
                  
                  });
                  const json = await response.json(); 
                  


                // console.log(id);
                const newNotes = notes.filter( (n)=>{return n._id!==id} ) // n represents each note in the notes array. If the note id is equal to the id which is to be deleted it gets filtered else it is allowed in the newNotes array 
                setNotes(newNotes)
                
            }




    return (
        // <NoteValue.Provider value={{x:infoVal,y:update}}>
        //     {props.children}
        // </NoteValue.Provider>

        <NoteValue.Provider value={{notes,setNotes, addNote, editNote, deleteNote, getNotes}}>
            {props.children}
        </NoteValue.Provider>
    )
}

export default NoteState;