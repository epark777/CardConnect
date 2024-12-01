import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCards, deleteCard } from '../../redux/cards';
import { useNavigate } from 'react-router-dom';

const CardList = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const { cards, loading, error } = useSelector((state) => state.cards);

   useEffect(() => {
      dispatch(fetchCards());
   }, [dispatch]);

   const handleDelete = (id) => {
      dispatch(deleteCard(id));
   };

   if (loading) return <p>Loading...</p>;
   if (error) return <p>Error: {error}</p>;

   return (
      <div>
         <h1>Business Cards</h1>
         <button onClick={() => navigate('/add')}>Add New Card</button>
         <ul>
            {cards.map((card) => (
               <li key={card.id}>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                  <button onClick={() => navigate(`/edit/${card.id}`)}>
                     Edit
                  </button>
                  <button onClick={() => handleDelete(card.id)}>Delete</button>
               </li>
            ))}
         </ul>
      </div>
   );
};

export default CardList;
