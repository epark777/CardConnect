import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNotes, addNote, updateNote, deleteNote } from '../../redux/notes';
import './NotesModal.css';

const NotesModal = ({ cardId, isVisible, onClose }) => {
   const dispatch = useDispatch();
   const notes = useSelector((state) => state.notes.byCardId[cardId] || []);

   const [newNote, setNewNote] = useState('');
   const [editingNotes, setEditingNotes] = useState({});

   useEffect(() => {
      if (isVisible) {
         dispatch(fetchNotes(cardId));
      }
   }, [dispatch, cardId, isVisible]);

   const handleAddNote = async () => {
      if (!newNote.trim()) return;

      try {
         await dispatch(addNote(cardId, newNote));
         setNewNote('');
      } catch (error) {
         console.error('Failed to add note:', error);
      }
   };

   const handleUpdateNote = async (noteId, updatedContent) => {
      try {
         await dispatch(updateNote(noteId, updatedContent));
         setEditingNotes((prev) => ({ ...prev, [noteId]: false })); // Exit edit mode
      } catch (error) {
         console.error('Failed to update note:', error);
      }
   };

   const handleDeleteNote = async (noteId) => {
      try {
         await dispatch(deleteNote(cardId, noteId));
      } catch (error) {
         console.error('Failed to delete note:', error);
      }
   };

   return isVisible ? (
      <div className="notes-modal">
         <div className="notes-modal-content">
            <button className="close-button" onClick={onClose}>
               &times;
            </button>
            <h2>Manage Notes</h2>

            <div className="notes-list">
               {notes.map((note) => (
                  <div key={note.id} className="note-item">
                     {editingNotes[note.id] ? (
                        <>
                           <input
                              type="text"
                              value={note.content}
                              onChange={(e) =>
                                 setEditingNotes((prev) => ({
                                    ...prev,
                                    [note.id]: e.target.value,
                                 }))
                              }
                           />
                           <button
                              onClick={() =>
                                 handleUpdateNote(
                                    note.id,
                                    editingNotes[note.id],
                                 )
                              }
                           >
                              Save
                           </button>
                        </>
                     ) : (
                        <>
                           <h3>{note.content}</h3>
                           <button
                              onClick={() =>
                                 setEditingNotes((prev) => ({
                                    ...prev,
                                    [note.id]: note.content,
                                 }))
                              }
                           >
                              Edit
                           </button>
                        </>
                     )}
                     <button onClick={() => handleDeleteNote(note.id)}>
                        Delete
                     </button>
                  </div>
               ))}
            </div>

            <div className="add-note">
               <textarea
                  placeholder="Add a new note"
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
               />
               <button className="card-button" onClick={handleAddNote}>Add Note</button>
               <button className="card-button" onClick={onClose}>
                  Cancel
               </button>
            </div>
         </div>
      </div>
   ) : null;
};

export default NotesModal;
