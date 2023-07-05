import React, { useState } from "react";
import { TfiClose } from "react-icons/tfi";

const NewCardForm = ({ lists, setLists, setIsNewCardFormOpen }) => {
  const [newCardTitle, setNewCardTitle] = useState("");

  const handleInputChange = (e) => {
    setNewCardTitle(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newList = {
      id: lists.length + 1,
      title: newCardTitle,
      cards: [],
    };
    setLists([...lists, newList]);
    setNewCardTitle(false);
  };

  return (
    <div className="bg-gray-100 rounded-md inline-block align-top w-72 p-2 mr-2">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="h-10 p-2 mb-2"
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
