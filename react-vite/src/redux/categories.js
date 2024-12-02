const ADD_CATEGORY = 'categories/ADD';
const SET_CATEGORIES = 'categories/SET';

const setCategoriesAction = (categories) => ({
    type: SET_CATEGORIES,
    payload: categories,
});

const addCategoryAction = (category) => ({
    type: ADD_CATEGORY,
    payload: category,
});

// Fetch all categories
export const fetchCategories = () => async (dispatch) => {
    try {
        const response = await fetch('/api/categories/');
        const data = await response.json();
        dispatch(setCategoriesAction(data));
    } catch (error) {
        console.error('Failed to fetch categories:', error);
    }
};

// Create a new category
export const createCategory = (name) => async (dispatch) => {
    try {
        const response = await fetch('/api/categories/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name }),
        });
        const data = await response.json();
        dispatch(addCategoryAction({ id: data.category_id, name }));
    } catch (error) {
        console.error('Failed to create category:', error);
    }
};

const initialState = {
    items: [],
};

const categoriesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CATEGORIES:
            return { ...state, items: action.payload };
        case ADD_CATEGORY:
            return { ...state, items: [...state.items, action.payload] };
        default:
            return state;
    }
};

export default categoriesReducer;