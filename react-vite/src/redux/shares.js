export const SHARE_CARD_REQUEST = 'SHARE_CARD_REQUEST';

export const shareCardRequest = (cardId, email) => ({
   type: SHARE_CARD_REQUEST,
   payload: { cardId, email },
});

const initialState = {
   lastShared: null,
};

const sharesReducer = (state = initialState, action) => {
   switch (action.type) {
      case SHARE_CARD_REQUEST:
         return {
            ...state,
            lastShared: {
               cardId: action.payload.cardId,
               email: action.payload.email,
            },
         };
      default:
         return state;
   }
};

export default sharesReducer;
