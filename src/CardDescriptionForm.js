import React, { useState } from "react";
import { isCompositeComponent } from "react-dom/test-utils";

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

    // Create a copy of the activeCard object
    const updatedCard = {
      ...activeCard,
      description: newDescriptionText,
    };

    // Create a copy of the lists array
    const copyLists = [...lists];

    //Find the index of the activeList within the lists array
    const listIndex = lists.findIndex((l) => l.id === activeList.id);

    // Find the index of the activeCard within the cards array of the corresponding list
    const cardIndex = activeList.cards.findIndex((c) => c.id === activeCard.id);

    // Update the cards array within the corresponding list
    copyLists[listIndex].cards[cardIndex] = updatedCard;

    // Update the lists using setLists prop
    setLists(copyLists);

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
