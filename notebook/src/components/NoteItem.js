import React, { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import noteContext from '../context/noteContext';
import './Stylings/Noteitem.css'


const NoteItem = (props) => {

  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note, updateNote } = props;
  return (
    <>
    
      <div className='col-md-3 mx-5  '>
        <div className="card my-3 " >
          <div className="card-body">
            <h5 className="card-title py-1">{note.title} </h5>
            <div className='d-flex '>

              <FontAwesomeIcon icon={faTrash} onClick={() => {
                deleteNote(note._id);
                props.showAlert("Deleted successfully","success") 
              }}></FontAwesomeIcon>
              <FontAwesomeIcon onClick={() => {updateNote(note)
             
              }} icon={faPenToSquare} className='mx-3'></FontAwesomeIcon>
                
            </div>
            <p className="card-text my-3">{note.description}</p>



          </div>

        </div>
      </div>
     
    </>


  )
}

export default NoteItem