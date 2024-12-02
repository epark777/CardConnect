import { useState } from 'react';
import './ShareModal.css';

const ShareModal = ({ visible, onClose, onShare, cardId }) => {
   const [email, setEmail] = useState('');

   const handleShare = () => {
      if (!email) {
         alert('Please enter an email address');
         return;
      }
      onShare(cardId, email);
      setEmail('');
      onClose();
   };

   if (!visible) return null;

   return (
      <div className="share-modal">
         <div className="share-content">
            <h2>Share Card</h2>
            <h3>Enter the email address to share this card:</h3>
            <input
               type="email"
               placeholder="Recipient's Email"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
            />
            <div className="share-actions">
               <button className="card-button" onClick={handleShare}>
                  Share
               </button>
               <button className="card-button" onClick={onClose}>
                  Cancel
               </button>
            </div>
         </div>
      </div>
   );
};

export default ShareModal;