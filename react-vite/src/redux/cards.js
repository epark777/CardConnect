const CARDS_LOADING = 'cards/LOADING';
const CARDS_RESULT = 'cards/RESULT';
const ADD_CARD = 'cards/ADD';
const UPDATE_CARD = 'cards/UPDATE';
const DELETE_CARD = 'cards/DELETE';

const setLoading = () => ({
    type: CARDS_LOADING,
});

const setResult = (payload) => ({
    type: CARDS_RESULT,
    payload,
});

const addCardAction = (card) => ({
    type: ADD_CARD,
    payload: card,
});

const updateCardAction = (updatedCard) => ({
    type: UPDATE_CARD,
    payload: updatedCard,
});

const deleteCardAction = (cardId) => ({
    type: DELETE_CARD,
    payload: cardId,
});

// Fetch all cards
export const fetchCards = () => async (dispatch) => {
    dispatch(setLoading());
    try {
        const response = await fetch('/api/cards/');
        if (!response.ok) throw new Error('Failed to fetch cards');
        const data = await response.json();
        dispatch(setResult({ cards: data, error: null }));
    } catch (error) {
        dispatch(setResult({ cards: [], error: error.message }));
    }
};

// Create a new card
export const createCard = (cardData) => async (dispatch) => {
   const response = await fetch('/api/cards/', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify(cardData),
       credentials: 'include',
   });

   if (!response.ok) {
       throw new Error('Failed to create card');
   }
   const card = await response.json();
   dispatch(addCardAction(card));
};



// Update a card
export const updateCard = (cardId, cardData) => async (dispatch) => {
    try {
        const response = await fetch(`/api/cards/${cardId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(cardData),
        });
        if (!response.ok) throw new Error('Failed to update card');
        const updatedCard = await response.json();
        dispatch(updateCardAction(updatedCard));
    } catch (error) {
        console.error('Update Card Error:', error.message);
    }
};

// Delete a card
export const deleteCard = (cardId) => async (dispatch) => {
    try {
        const response = await fetch(`/api/cards/${cardId}`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete card');
        dispatch(deleteCardAction(cardId));
    } catch (error) {
        console.error('Delete Card Error:', error.message);
    }
};

// Initial State
const initialState = {
    cards: [],
    loading: false,
    error: null,
};

// Reducer
const cardReducer = (state = initialState, action) => {
    switch (action.type) {
        case CARDS_LOADING:
            return { ...state, loading: true, error: null };

        case CARDS_RESULT:
            return {
                ...state,
                loading: false,
                cards: action.payload.cards,
                error: action.payload.error,
            };

        case ADD_CARD:
            return {
                ...state,
                cards: [...state.cards, action.payload],
            };

        case UPDATE_CARD:
            return {
                ...state,
                cards: state.cards.map((card) =>
                    card.id === action.payload.id ? action.payload : card
                ),
            };

        case DELETE_CARD:
            return {
                ...state,
                cards: state.cards.filter((card) => card.id !== action.payload),
            };

        default:
            return state;
    }
};

export default cardReducer;