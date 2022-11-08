
import React, { useState } from "react";
import NoteContext from "../noteContext";
const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)
  //get all notes
  const getNotes = async () => {
    //api call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET', 
     
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')  
      },
 
    });
    const json = await response.json()
    console.log(json)
    setNotes(json);
  }
 
  //Add note 
  const addNote = async (title, description, tag) => {
    //api call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST', 
     
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({title,description,tag}) 
    });

    const note = await response.json();
 
    
    //Todo api call
     

    setNotes(notes.concat(note));
  }

  //Delete Note

  const deleteNote = async(id) => {
    //api call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
    
     
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      
 
    } );
    console.log(id); 
    const json = await response.json()
    console.log(json)
  
 

    console.log("deleting the note with " + id)
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }
  //deleting a
  //Update Note
  const editNote = async(id,title,description,tag) => {
    
      //Api calls
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: 'PUT', 
       
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({title,description,tag}) 
      });
    
      const json =  await response.json(); 
      console.log(json)
    
      //lofic to edit in client
      let newNotes = JSON.parse(JSON.stringify(notes))
      for (let index = 0; index < newNotes.length; index++) {
        const element = newNotes[index];
        if(element._id===id){
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag; 
        break; 
        }
        }
      
    
    setNotes(newNotes);
    
      
      
    

  }


  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote,getNotes}}>
      {props.children}
    </NoteContext.Provider>
  )

}

export default NoteState