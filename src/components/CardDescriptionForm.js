import React, { useState } from "react";

const CardDescriptionForm = ({
  cardIndex,
  listIndex,
  lists,
  setLists,
  setIsDescriptionFormOpen,
}) => {
  const [newDescriptionText, setNewDescriptionText] = useState(
    lists[listIndex].cards[cardIndex].description
  );

  const handleChange = (e) => {
    setNewDescriptionText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a copy of the activeCard object
    const updatedCard = {
      ...lists[listIndex].cards[cardIndex],
      description: newDescriptionText,
    };

    // Create a copy of the lists array
    const copyLists = [...lists];

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
          lists[listIndex].cards[cardIndex].description === ""
            ? "Write description"
            : newDescriptionText
        }
        className="border block mb-4 p-2 "
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
