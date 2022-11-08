import React,{useContext} from 'react'
import { useState } from 'react';
import noteContext from '../context/noteContext';
import './Stylings/Addnote.css'

const AddNote = (props) => {
    const context = useContext(noteContext);
    const {addNote} = context;
    const[note,setNote] = useState({title:"",description:"",tag:""})
    const handleClick =(e)=>{
        e.preventDefault();
        console.log(note.title)
        console.log(note.description)
        addNote(note.title,note.description);
        setNote({title:"",description:"",tag:""})
        props.showAlert("Added Seccessfully","success")
    }
    const onChange=(e)=>{
        
        setNote({...note,[e.target.name]:e.target.value})
    }
    return (
        <div >
            <div className='container my-3 w-50 addnote'>
                <h1>Add a note</h1>
                <form>
                    <div className="form-group my-3">
                        <label htmlFor="title">Title</label>
                        <input type="text"  value={note.title} name='title' className="form-control" id="title" aria-describedby="emailHelp" placeholder="Enter your Title" onChange={onChange} minLength={5} required />
                        
                    </div>
                    <div className="form-group  my-3">
                        <label htmlFor="description">Description</label>
                        <input type="text" value={note.description} name='description' className="form-control" id="description " placeholder="Enter note" onChange={onChange}  minLength={5} required />
                    </div>
                    <div className="form-group my-3">
                        <label htmlFor="tag">Tag</label>
                        <input type="text" value={note.tag} name='tag' className="form-control font-weight-bold" id="tag " placeholder="Enter note" onChange={onChange}  minLength={5} required />
                    </div>
                   <div className='d-flex flex-column align-items-center justify-content-center'>
                    <button disabled = {note.title.length<5 || note.description.length<5}  type="submit" className="btn btn-primary my-3" onClick={handleClick}>Add Note</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddNote
