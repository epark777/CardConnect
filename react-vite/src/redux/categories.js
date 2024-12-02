const CATEGORIES_LOADING = 'categories/LOADING';
const CATEGORIES_RESULT = 'categories/RESULT';
const ADD_CATEGORY = 'categories/ADD';

const setCategoriesLoading = () => ({
    type: CATEGORIES_LOADING,
});

const setCategoriesResult = (categories) => ({
    type: CATEGORIES_RESULT,
    payload: categories,
});

const addCategoryAction = (category) => ({
    type: ADD_CATEGORY,
    payload: category,
});

// Fetch all categories
export const fetchCategories = () => async (dispatch) => {
    dispatch(setCategoriesLoading());
    try {
        const response = await fetch('/api/categories/');
        const data = await response.json();
        dispatch(setCategoriesResult(data));
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
    loading: false,
};

const categoriesReducer = (state = initialState, action) => {
    switch (action.type) {
        case CATEGORIES_LOADING:
            return { ...state, loading: true };
        case CATEGORIES_RESULT:
            return { ...state, loading: false, items: action.payload };
        case ADD_CATEGORY:
            return { ...state, items: [...state.items, action.payload] };
        default:
            return state;
    }
};

export default categoriesReducer;