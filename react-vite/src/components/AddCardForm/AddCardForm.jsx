import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createCard } from '../../redux/cards';
import { useNavigate } from 'react-router-dom';

const AddCardForm = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const [formData, setFormData] = useState({
      title: '',
      description: '',
      email: '',
      phone: '',
      address: '',
   });

   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(createCard(formData)).then(() => navigate('/'));
   };

   return (
      <form onSubmit={handleSubmit}>
         <h1>Add Business Card</h1>
         <div>
            <label htmlFor="title">Title:</label>
            <input
               id="title"
               name="title"
               type="text"
               value={formData.title}
               onChange={handleChange}
               required
            />
         </div>
         <div>
            <label htmlFor="description">Description:</label>
            <textarea
               id="description"
               name="description"
               value={formData.description}
               onChange={handleChange}
               required
            />
         </div>
         <div>
            <label htmlFor="email">Email:</label>
            <input
               id="email"
               name="email"
               type="email"
               value={formData.email}
               onChange={handleChange}
            />
         </div>
         <div>
            <label htmlFor="phone">Phone:</label>
            <input
               id="phone"
               name="phone"
               type="tel"
               value={formData.phone}
               onChange={handleChange}
            />
         </div>
         <div>
            <label htmlFor="address">Address:</label>
            <input
               id="address"
               name="address"
               type="text"
               value={formData.address}
               onChange={handleChange}
            />
         </div>
         <button type="submit">Add Card</button>
         <button type="button" onClick={() => navigate('/')}>
            Cancel
         </button>
      </form>
   );
};

export default AddCardForm;
