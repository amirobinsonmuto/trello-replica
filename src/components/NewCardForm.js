import React, { useState } from "react";
import { TfiClose } from "react-icons/tfi";

const NewCardForm = ({ lists, setLists, setIsNewCardFormOpen, activeList }) => {
  const [newCardTitle, setNewCardTitle] = useState("");

  const handleInputChange = (e) => {
    setNewCardTitle(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newCardTitle.trim() === "") {
      alert("Please enter the card title");
      return;
    } else {
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
    <div className="bg-gray-100 px-4 pb-4 w-full">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="h-10 p-2 mb-4 w-full rounded-md"
          placeholder="Enter a title for this card..."
          value={newCardTitle}
          onChange={handleInputChange}
          autoFocus
        />
        <button type="submit" className="button-primary me-4">
          Add card
        </button>
        <button
          type="button"
          onClick={() => {
            setIsNewCardFormOpen(false);
          }}
        >
          <TfiClose />
        </button>
      </form>
    </div>
  );
};

export default NewCardForm;
