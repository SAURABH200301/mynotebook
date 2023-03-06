import React, { useContext } from 'react'
import noteContext from "../context/notes/noteContext"

export const NoteItem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note, updateNote } = props;
    const onHandleDelete=()=>{
        deleteNote(note._id)
        props.showAlert("Note has been successfully deleted","success")
    }
    return (
        <div className='col-md-3'>
            <div className="card my-3">
                {/* <img src="..." className="card-img-top" alt="..."/> */}
                <div className="card-body">
                    <div className='d-inline-flex justify-content-between w-100'>
                        <h5 className="card-title">{note.title}</h5>
                        <div className='justify-content-end'>
                            <i className="fa-solid fa-trash mx-2" onClick={onHandleDelete}></i>
                            <i className="fa-solid fa-pen-to-square mx-2" onClick={() => { updateNote(note) }}></i>
                        </div>
                    </div>

                    <p className="card-text">{note.description}</p>

                </div>
            </div>
        </div>
    )
}
