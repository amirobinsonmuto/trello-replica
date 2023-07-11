import React, { useEffect, useRef, useState } from "react";
import CardDescriptionForm from "./CardDescriptionForm";
import { TfiClose } from "react-icons/tfi";
import { BsCardText } from "react-icons/bs";
import { BsTextParagraph } from "react-icons/bs";

const CardEditModal = ({
  activeCard,
  activeList,
  lists,
  setLists,
  onClose,
}) => {
  const [isDescriptionFormOpen, setIsDescriptionFormOpen] = useState(false);
  const [listIndex] = useState(lists.findIndex((l) => l.id === activeList.id));
  const [cardIndex] = useState(
    activeList.cards.findIndex((c) => c.id === activeCard.id)
  );
  const [newCardTitle, setNewCardTitle] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    setNewCardTitle(lists[listIndex].cards[cardIndex].title);
  }, [listIndex, cardIndex, lists]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Create a copy of the activeCard object
    const updatedCard = {
      ...lists[listIndex].cards[cardIndex],
      title: newCardTitle,
    };
    // Create a copy of the lists array
    const copyLists = [...lists];
    // Update the cards array within the corresponding list
    copyLists[listIndex].cards[cardIndex] = updatedCard;
    // Update the lists using setLists prop
    setLists(copyLists);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      // Trigger form submission when Enter key is pressed
      handleSubmit(e);
      inputRef.current.blur();
    }
  };

  const handleInputChange = (e) => {
    setNewCardTitle(e.target.value);
  };

  return (
    <>
      <div className="modal-overlay"></div>
      <div className="modal-container rounded-xl flex justify-between relative">
        <div className="w-full">
          <div className="flex gap-4 items-center">
            <BsCardText />
            <input
              type="text"
              ref={inputRef}
              value={newCardTitle}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onBlur={handleSubmit}
              className="text-xl font-bold"
            />
          </div>
          <p className="text-sm ml-9 mb-10">
            in list "{lists[listIndex].title}"
          </p>
          <div className="flex gap-4 items-center mb-4">
            <BsTextParagraph />
            <h3>Description</h3>
            {!isDescriptionFormOpen && (
              <button
                onClick={() => {
                  setIsDescriptionFormOpen(true);
                }}
                className="button-secondary ml-auto text-sm"
              >
                Edit
              </button>
            )}
          </div>
          {!isDescriptionFormOpen && (
            <p className="ml-9">
              {lists[listIndex].cards[cardIndex].description}
            </p>
          )}
          {isDescriptionFormOpen && (
            <CardDescriptionForm
              cardIndex={cardIndex}
              listIndex={listIndex}
              lists={lists}
              setLists={setLists}
              setIsDescriptionFormOpen={setIsDescriptionFormOpen}
            />
          )}
        </div>
        <button onClick={onClose}>
          <TfiClose className="absolute top-5 right-5" />
        </button>
      </div>
    </>
  );
};

export default CardEditModal;
