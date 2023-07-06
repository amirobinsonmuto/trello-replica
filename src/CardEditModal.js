import React, { useState } from "react";
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

  return (
    <>
      <div className="modal-overlay"></div>
      <div className="modal-container flex justify-between relative">
        <div className="w-full">
          <div className="flex gap-4 items-center">
            <BsCardText />
            <h3 className="text-xl font-bold">{activeCard.text}</h3>
          </div>
          <p className="text-sm ml-9 mb-10">in list "{activeList.title}"</p>
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
          <p className="ml-9">{activeCard.description}</p>
          {isDescriptionFormOpen && (
            <CardDescriptionForm
              activeCard={activeCard}
              activeList={activeList}
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
