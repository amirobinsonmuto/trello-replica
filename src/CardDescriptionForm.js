import React, { useState } from "react";

const CardDescriptionForm = ({
  activeCard,
  activeList,
  lists,
  setLists,
  setIsDescriptionFormOpen,
}) => {
  const [newDescriptionText, setNewDescriptionText] = useState(
    activeCard.description
  );

  const handleChange = (e) => {
    setNewDescriptionText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Find the list ID
    const listId = activeList.id;

    // Find the card index within the list
    const cardIndex = lists[listId].cards.findIndex(
      (c) => c.id === activeCard.id
    );

    // Create a new updated card object
    const updatedCard = {
      ...activeCard,
      description: newDescriptionText,
    };

    // Create a new updated lists object with the updated card
    const updatedLists = {
      ...lists,
      [listId]: {
        ...lists[listId],
        cards: [
          ...lists[listId].cards.slice(0, cardIndex),
          updatedCard,
          ...lists[listId].cards.slice(cardIndex + 1),
        ],
      },
    };

    // Update the lists using setLists prop
    // setLists(updatedLists);

    // Close the description form
    setIsDescriptionFormOpen(false);
  };
  return (
    <form onSubmit={handleSubmit} className="ml-9">
      <textarea
        value={newDescriptionText}
        onChange={handleChange}
        rows={8}
        cols={40}
        placeholder={
          activeCard.description === ""
            ? "Write description"
            : newDescriptionText
        }
        className="border block mb-4 p-2"
      ></textarea>
      <button type="submit" className="button-primary me-4">
        Save
      </button>
      <button
        type="button-secondary"
        onClick={() => {
          setIsDescriptionFormOpen(false);
        }}
        className="button-cancel"
      >
        Cancel
      </button>
    </form>
  );
};

export default CardDescriptionForm;
