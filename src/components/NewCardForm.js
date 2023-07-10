import React, { useState } from "react";
import { TfiClose } from "react-icons/tfi";

const NewCardForm = ({ lists, setLists, setIsNewCardFormOpen, activeList }) => {
  const [newCardTitle, setNewCardTitle] = useState("");

  const handleInputChange = (e) => {
    setNewCardTitle(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newCardTitle.trim() !== "") {
      const updatedLists = lists.map((list) => {
        if (list.id === activeList.id) {
          const newCard = {
            id: Date.now(),
            title: newCardTitle,
            description: "",
          };
          return { ...list, cards: [...list.cards, newCard] };
        }
        return list;
      });
      setLists(updatedLists);
      setIsNewCardFormOpen(false);
    }
  };

  return (
    <div className="bg-gray-100 p-4 w-full">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="h-10 p-2 mb-4 w-full rounded-md"
          placeholder="Enter a title for this card"
          value={newCardTitle}
          onChange={handleInputChange}
        />
        <button type="submit" className="button-primary me-4">
          Add card
        </button>
        <button
          type="button"
          onClick={() => {
            setIsNewCardFormOpen(false);
          }}
          className="close-button"
        >
          <TfiClose className="close-icon" />
        </button>
      </form>
    </div>
  );
};

export default NewCardForm;
