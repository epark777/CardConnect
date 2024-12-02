import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateCard, fetchCards } from '../../redux/cards';
import { fetchCategories, createCategory } from '../../redux/categories';
import { useParams, useNavigate } from 'react-router-dom';
import './EditCardForm.css';

const EditCardForm = () => {
   const { cardId } = useParams();
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const { cards } = useSelector((state) => state.cards);
   const categories = useSelector((state) => state.categories.items);

   const card = cards.find((c) => c.id === parseInt(cardId, 10));

   const [formData, setFormData] = useState({
      name: '',
      title: '',
      company: '',
      email: '',
      phone: '',
      website: '',
      social_links: '',
      categoryId: '',
   });

   const [newCategory, setNewCategory] = useState('');
   const [errors, setErrors] = useState({});

   useEffect(() => {
      if (!card) {
         dispatch(fetchCards());
      } else {
         setFormData({
            name: card.name || '',
            title: card.title || '',
            company: card.company || '',
            email: card.email || '',
            phone: card.phone || '',
            website: card.website || '',
            social_links: card.social_links || '',
            categoryId: card.categoryId || '',
         });
         dispatch(fetchCategories());
      }
   }, [card, dispatch]);

   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
   };

   const handleCategoryChange = (e) => {
      setFormData({ ...formData, categoryId: e.target.value });
   };

   const handleNewCategory = async () => {
      if (!newCategory.trim()) return;
      try {
         await dispatch(createCategory(newCategory));
         setNewCategory('');
         dispatch(fetchCategories());
      } catch (err) {
         console.error('Error creating category:', err);
      }
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         await dispatch(updateCard(cardId, formData));
         navigate('/');
      } catch (err) {
         console.error('Error updating card:', err);
         setErrors({ server: 'Failed to update the card. Please try again.' });
      }
   };

   if (!card) {
      return <p>Loading...</p>;
   }

   return (
      <div className="edit-card-page">
         <form onSubmit={handleSubmit} className="edit-card-form">
            <h1>Edit Business Card</h1>

            <div className="form-group">
               <label htmlFor="name">Name:</label>
               <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  required
               />
            </div>

            <div className="form-group">
               <label htmlFor="title">Title:</label>
               <input
                  id="title"
                  name="title"
                  type="text"
                  value={formData.title}
                  onChange={handleChange}
               />
            </div>

            <div className="form-group">
               <label htmlFor="company">Company:</label>
               <input
                  id="company"
                  name="company"
                  type="text"
                  value={formData.company}
                  onChange={handleChange}
               />
            </div>

            <div className="form-group">
               <label htmlFor="email">Email:</label>
               <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
               />
            </div>

            <div className="form-group">
               <label htmlFor="phone">Phone:</label>
               <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
               />
            </div>

            <div className="form-group">
               <label htmlFor="website">Website:</label>
               <input
                  id="website"
                  name="website"
                  type="url"
                  value={formData.website}
                  onChange={handleChange}
               />
            </div>

            <div className="form-group">
               <label htmlFor="social_links">Social Links:</label>
               <textarea
                  id="social_links"
                  name="social_links"
                  value={formData.social_links}
                  onChange={handleChange}
               />
            </div>

            <div className="form-group">
               <label htmlFor="categoryId">Category:</label>
               <select
                  id="categoryId"
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleCategoryChange}
               >
                  <option value="">Select a Category</option>
                  {categories.map((cat) => (
                     <option key={cat.id} value={cat.id}>
                        {cat.name}
                     </option>
                  ))}
               </select>
               <input
                  type="text"
                  placeholder="Add New Category"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
               />
               <button type="button" onClick={handleNewCategory}>
                  Add Category
               </button>
            </div>

            <div className="form-buttons">
               <button type="submit" className="button submit-button">
                  Update Card
               </button>
               <button
                  type="button"
                  className="button cancel-button"
                  onClick={() => navigate('/')}
               >
                  Cancel
               </button>
            </div>

            {errors.server && <p className="error">{errors.server}</p>}
         </form>
      </div>
   );
};

export default EditCardForm;
