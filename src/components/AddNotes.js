import React, { useContext } from 'react'
import { useState } from 'react';
import noteContext from "../context/notes/noteContext"

export const AddNotes = () => {
    const context = useContext(noteContext);
    const { addNote } = context;

    const [note, setNote] = useState({ title: "", description: '', tag: 'Default' })
    const handleAdd = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({ title: "", description: '', tag: 'Default' })
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <div className="container my-3">
            <h1> Add a notes</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text " className="form-control" id="title" name='title' minLength={5} required value={note.title} aria-describedby="emailHelp" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="desc" className="form-label">Description</label>
                    <input type="text" className="form-control" id="desc" name='description' minLength={5} required value={note.description} onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name='tag' onChange={onChange} value={note.tag}/>
                </div>
                <button disabled={(note.title.length < 5 || note.description.length < 5)} type="submit" className="btn btn-primary" onClick={handleAdd}>Add Note</button>
            </form>
        </div>
    )
}
