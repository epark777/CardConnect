import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCards, deleteCard } from '../../redux/cards';
import { fetchCategories } from '../../redux/categories';
import { fetchNotes } from '../../redux/notes';
import { shareCardRequest } from '../../redux/shares';
import { useNavigate } from 'react-router-dom';
import ShareModal from '../ShareModal';
import NotesModal from '../NotesModal';
import './CardList.css';

const CardList = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const { cards, loading, error } = useSelector((state) => state.cards);
   const categories = useSelector((state) => state.categories.items);
   const notes = useSelector((state) => state.notes.byCardId);

   const [modalVisible, setModalVisible] = useState(false);
   const [selectedCardId, setSelectedCardId] = useState(null);
   const [isNotesModalVisible, setNotesModalVisible] = useState(false);

   useEffect(() => {
      dispatch(fetchCards());
      dispatch(fetchCategories());
   }, [dispatch]);

   useEffect(() => {
      cards.forEach((card) => dispatch(fetchNotes(card.id)));
   }, [dispatch, cards]);

   const openModal = (cardId) => {
      setSelectedCardId(cardId);
      setModalVisible(true);
   };

   const closeModal = () => {
      setSelectedCardId(null);
      setModalVisible(false);
   };

   const openNotesModal = (cardId) => {
      setSelectedCardId(cardId);
      setNotesModalVisible(true);
   };

   const closeNotesModal = () => {
      setSelectedCardId(null);
      setNotesModalVisible(false);
   };

   const handleShare = (cardId, email) => {
      dispatch(shareCardRequest(cardId, email));
      alert(`Card shared with ${email}`);
   };

   const handleDeleteCard = (id) => {
      dispatch(deleteCard(id));
   };

   if (loading) return <p>Loading...</p>;
   if (error) return <p>Error: {error}</p>;

   return (
      <div className="card-list-page">
         <div className="card-list">
            {cards.map((card) => (
               <div className="card" key={card.id}>
                  <h2>Name: {card.name || 'No Name'}</h2>
                  <h3>Title: {card.title || 'No Title'}</h3>
                  <h3>Company: {card.company || 'No Company'}</h3>
                  <h3>Email: {card.email || 'No Email'}</h3>
                  <h3>Phone: {card.phone || 'No Phone'}</h3>
                  <h3>
                     Social Links: {card.social_links || 'No Social Links'}
                  </h3>
                  <a
                     href={card.website || '#'}
                     target="_blank"
                     rel="noopener noreferrer"
                  >
                     Website: {card.website || 'No Website'}
                  </a>

                  <h4>
                     Category:{' '}
                     {categories.find((cat) => cat.id === card.categoryId)
                        ?.name || 'None'}
                  </h4>

                  <div className="notes">
                     <h4>Notes:</h4>
                     <ul>
                        {(notes[card.id] || []).map((note) => (
                           <li key={note.id}>{note.content}</li>
                        ))}
                     </ul>
                  </div>

                  <div className="card-actions">
                     <button
                        className="card-button"
                        onClick={() => navigate(`/edit/${card.id}`)}
                     >
                        Edit
                     </button>
                     <button
                        className="card-button"
                        onClick={() => handleDeleteCard(card.id)}
                     >
                        Delete
                     </button>
                     <button
                        className="card-button"
                        onClick={() => openModal(card.id)}
                     >
                        Share
                     </button>
                     <button
                        className="card-button"
                        onClick={() => openNotesModal(card.id)}
                     >
                        Add / Manage Notes
                     </button>
                  </div>
               </div>
            ))}
         </div>

         <ShareModal
            visible={modalVisible}
            onClose={closeModal}
            onShare={handleShare}
            cardId={selectedCardId}
         />
         <NotesModal
            cardId={selectedCardId}
            isVisible={isNotesModalVisible}
            onClose={closeNotesModal}
         />
      </div>
   );
};

export default CardList;
