import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createCard } from '../../redux/cards';
import { fetchCategories, createCategory } from '../../redux/categories';
import { useNavigate } from 'react-router-dom';
import './AddCardForm.css';

const AddCardForm = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const categories = useSelector((state) => state.categories.items);

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
      dispatch(fetchCategories());
   }, [dispatch]);

   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
   };

   const handleCategoryChange = (e) => {
      setFormData({ ...formData, categoryId: e.target.value });
   };

   const handleNewCategory = async () => {
      if (!newCategory.trim()) {
         alert('Please enter a category name.');
         return;
      }
      try {
         await dispatch(createCategory(newCategory));
         setNewCategory('');
      } catch (error) {
         console.error('Failed to create category:', error);
      }
   };

   const handleSubmit = async (e) => {
      e.preventDefault();

      const newErrors = {};
      if (!formData.name) newErrors.name = 'Name is required';

      const updatedFormData = { ...formData };
      if (updatedFormData.website && !updatedFormData.website.startsWith('http')) {
         updatedFormData.website = 'https://' + updatedFormData.website;
      }

      if (Object.keys(newErrors).length > 0) {
         setErrors(newErrors);
         return;
      }

      try {
         await dispatch(createCard(updatedFormData));
         navigate('/');
      } catch (err) {
         console.error('Error creating card:', err);
         setErrors({ server: 'Failed to create the card. Please try again.' });
      }
   };

   return (
      <div className="add-card-page">
         <form onSubmit={handleSubmit} className="add-card-form">
            <h1>Add Business Card</h1>

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
               {errors.name && <p className="error">{errors.name}</p>}
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
               <label htmlFor="website">Website: (must include https:// if inputted)</label>
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
               <label htmlFor="categoryId">Category: (select from dropdown or add new category if needed)</label>
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
                  Add Card
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

export default AddCardForm;