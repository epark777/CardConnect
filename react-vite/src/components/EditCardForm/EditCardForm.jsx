import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateCard, fetchCards } from '../../redux/cards'
import { useParams, useNavigate } from 'react-router-dom';

const EditCardForm = () => {
   const { cardId } = useParams();
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const { cards } = useSelector((state) => state.cards);
   const card = cards.find((c) => c.id === parseInt(cardId, 10));

   const [formData, setFormData] = useState({
      title: '',
      description: '',
      email: '',
      phone: '',
      address: '',
   });

   useEffect(() => {
      if (!card) {
         dispatch(fetchCards());
      } else {
         setFormData({
            title: card.title || '',
            description: card.description || '',
            email: card.email || '',
            phone: card.phone || '',
            address: card.address || '',
         });
      }
   }, [card, dispatch]);

   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(updateCard(cardId, formData)).then(() => navigate('/'));
   };

   if (!card) {
      return <p>Loading...</p>;
   }

   return (
      <form onSubmit={handleSubmit}>
         <h1>Edit Business Card</h1>
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
         <button type="submit">Update Card</button>
         <button type="button" onClick={() => navigate('/')}>
            Cancel
         </button>
      </form>
   );
};

export default EditCardForm;
