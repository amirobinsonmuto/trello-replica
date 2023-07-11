import React, { useState } from "react";
import { TfiClose } from "react-icons/tfi";

const NewListForm = ({ lists, setLists, setIsNewListFormOpen }) => {
  const [newListTitle, setNewListTitle] = useState("");

  const handleInputChange = (e) => {
    setNewListTitle(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newListTitle.trim() === "") {
      alert("Please enter the list title");
      return;
    }

    const newList = {
      id: Date.now(),
      title: newListTitle,
      cards: [],
    };
    setLists([...lists, newList]);
    setIsNewListFormOpen(false);
  };

  return (
    <div className="bg-gray-100 rounded-xl inline-block align-top w-72 p-4">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="h-10 p-2 mb-4 w-full rounded-md "
          placeholder="Enter list title..."
          value={newListTitle}
          onChange={handleInputChange}
        />
        <button type="submit" className="button-primary me-4">
          Add List
        </button>
        <button
          type="button"
          onClick={() => {
            setIsNewListFormOpen(false);
          }}
          className="close-button"
        >
          <TfiClose className="close-icon" />
        </button>
      </form>
    </div>
  );
};

export default NewListForm;
