const CARDS_LOADING = 'cards/LOADING';
const CARDS_RESULT = 'cards/RESULT';

const setLoading = () => ({
   type: CARDS_LOADING,
});
const setResult = (payload) => ({
   type: CARDS_RESULT,
   payload,
});

// Fetch all cards
export const fetchCards = () => async (dispatch) => {
   dispatch(setLoading());
   try {
      const response = await fetch('/api/card/');
      if (!response.ok) throw new Error('Failed to fetch cards');
      const data = await response.json();
      dispatch(setResult({ cards: data, error: null }));
   } catch (error) {
      dispatch(setResult({ cards: [], error: error.message }));
   }
};

// Create a new card
export const createCard = (cardData) => async (dispatch) => {
   dispatch(setLoading());
   try {
      const response = await fetch('/api/card/', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(cardData),
      });
      if (!response.ok) throw new Error('Failed to create card');
      const data = await response.json();
      dispatch(setResult({ cards: [...data], error: null }));
   } catch (error) {
      dispatch(setResult({ cards: [], error: error.message }));
   }
};

// Update a card
export const updateCard = (cardId, cardData) => async (dispatch) => {
   dispatch(setLoading());
   try {
      const response = await fetch(`/api/card/${cardId}`, {
         method: 'PUT',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(cardData),
      });
      if (!response.ok) throw new Error('Failed to update card');
      const data = await response.json();
      dispatch(setResult({ cards: [...data], error: null }));
   } catch (error) {
      dispatch(setResult({ cards: [], error: error.message }));
   }
};

// Delete a card
export const deleteCard = (cardId) => async (dispatch) => {
   dispatch(setLoading());
   try {
      const response = await fetch(`/api/card/${cardId}`, {
         method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete card');
      dispatch(fetchCards());
   } catch (error) {
      dispatch(setResult({ cards: [], error: error.message }));
   }
};

const initialState = {
   cards: [],
   loading: false,
   error: null,
};

const cardReducer = (state = initialState, action) => {
   switch (action.type) {
      case CARDS_LOADING:
         return { ...state, loading: true, error: null };
      case CARDS_RESULT:
         return {
            ...state,
            loading: false,
            ...action.payload,
         };
      default:
         return state;
   }
};

export default cardReducer;
