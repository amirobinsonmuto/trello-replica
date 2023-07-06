import React, { useState } from "react";
import CardDescriptionForm from "./CardDescriptionForm";

const CardEditModal = ({ card, onClose }) => {
  const [isDescriptionFormOpen, setIsDescriptionFormOpen] = useState(false);

  return (
    <div>
      <div>
        <h3>{card.text}</h3>
        <h3>Description</h3>
        {!isDescriptionFormOpen && (
          <button
            onClick={() => {
              setIsDescriptionFormOpen(!isDescriptionFormOpen);
            }}
            className="button-secondary"
          >
            Edit
          </button>
        )}
        {isDescriptionFormOpen && (
          <CardDescriptionForm
            setIsDescriptionFormOpen={setIsDescriptionFormOpen}
          />
        )}
      </div>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default CardEditModal;
