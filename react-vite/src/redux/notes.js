const NOTES_LOADING = 'notes/LOADING';
const FETCH_NOTES = 'notes/FETCH';
const ADD_NOTE = 'notes/ADD';
const DELETE_NOTE = 'DELETE_NOTE';
const UPDATE_NOTE = 'notes/UPDATE_NOTE';

const setNotesLoading = () => ({
   type: NOTES_LOADING,
});

const fetchNotesAction = (cardId, notes) => ({
   type: FETCH_NOTES,
   payload: { cardId, notes },
});

const addNoteAction = (cardId, note) => ({
   type: ADD_NOTE,
   payload: { cardId, note },
});

const deleteNoteAction = (cardId, noteId) => ({
   type: DELETE_NOTE,
   payload: { cardId, noteId },
});

const updateNoteAction = (noteId, updatedContent) => ({
    type: UPDATE_NOTE,
    payload: { noteId, updatedContent },
});

// Fetch notes for a specific card
export const fetchNotes = (cardId) => async (dispatch) => {
   dispatch(setNotesLoading());
   try {
      const response = await fetch(`/api/notes/${cardId}`);
      const data = await response.json();
      dispatch(fetchNotesAction(cardId, data));
   } catch (error) {
      console.error('Failed to fetch notes:', error);
   }
};

// Add a note to a specific card
export const addNote = (cardId, content) => async (dispatch) => {
    try {
       const response = await fetch(`/api/notes/${cardId}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ content }),
       });
       const data = await response.json();
       dispatch(addNoteAction(cardId, { id: data.note_id, content }));
 
       dispatch(fetchNotes(cardId));
    } catch (error) {
       console.error('Failed to add note:', error);
    }
 };

// Delete a note
export const deleteNote = (cardId, noteId) => async (dispatch) => {
   try {
      const response = await fetch(`/api/notes/${cardId}/${noteId}`, {
         method: 'DELETE',
      });

      if (!response.ok) {
         throw new Error('Failed to delete note');
      }

      dispatch(deleteNoteAction(cardId, noteId));
   } catch (error) {
      console.error('Error deleting note:', error);
   }
};

// Update a note of a specific card
export const updateNote = (noteId, updatedContent) => async (dispatch) => {
    try {
        const response = await fetch(`/api/notes/${noteId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content: updatedContent }),
        });

        if (!response.ok) {
            throw new Error('Failed to update note');
        }

        const updatedNote = await response.json();

        dispatch(updateNoteAction(updatedNote.id, updatedNote.content));
    } catch (error) {
        console.error('Error updating note:', error);
    }
};

const initialState = {
   byCardId: {},
   loading: false,
};
 
 const notesReducer = (state = initialState, action) => {
    switch (action.type) {
       case NOTES_LOADING:
          return { ...state, loading: true };
 
       case FETCH_NOTES:
          return {
             ...state,
             loading: false,
             byCardId: {
                ...state.byCardId,
                [action.payload.cardId]: action.payload.notes,
             },
          };
 
       case ADD_NOTE: {
          const { cardId, note } = action.payload;
          return {
             ...state,
             loading: false,
             byCardId: {
                ...state.byCardId,
                [cardId]: [...(state.byCardId[cardId] || []), note],
             },
          };
       }
 
       case DELETE_NOTE: {
          const { cardId, noteId } = action.payload;
          return {
             ...state,
             loading: false,
             byCardId: {
                ...state.byCardId,
                [cardId]: state.byCardId[cardId].filter((note) => note.id !== noteId),
             },
          };
       }
 
       case UPDATE_NOTE: {
          const { noteId, updatedContent } = action.payload;
 
          const cardId = Object.keys(state.byCardId).find((id) =>
             state.byCardId[id].some((note) => note.id === noteId)
          );
 
          if (!cardId) return state;
 
          return {
             ...state,
             loading: false,
             byCardId: {
                ...state.byCardId,
                [cardId]: state.byCardId[cardId].map((note) =>
                   note.id === noteId ? { ...note, content: updatedContent } : note
                ),
             },
          };
       }
 
       default:
          return state;
    }
 };
 
 export default notesReducer;