import React, { useState } from "react";
import CardDescriptionForm from "./CardDescriptionForm";
import { TfiClose } from "react-icons/tfi";
import { BsCardText } from "react-icons/bs";
import { BsTextParagraph } from "react-icons/bs";

const CardEditModal = ({
  activeCard,
  setActiveCard,
  activeList,
  lists,
  setLists,
  onClose,
}) => {
  const [isDescriptionFormOpen, setIsDescriptionFormOpen] = useState(false);

  //Find the index of the activeList within the lists array
  const listIndex = lists.findIndex((l) => l.id === activeList.id);

  // Find the index of the activeCard within the cards array of the corresponding list
  const cardIndex = activeList.cards.findIndex((c) => c.id === activeCard.id);

  return (
    <>
      <div className="modal-overlay"></div>
      <div className="modal-container flex justify-between relative">
        <div className="w-full">
          <div className="flex gap-4 items-center">
            <BsCardText />
            <h3 className="text-xl font-bold">
              {lists[listIndex].cards[cardIndex].text}
            </h3>
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
          <p className="ml-9">
            {lists[listIndex].cards[cardIndex].description}
          </p>
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
