import React from "react";
import { Draggable } from "react-beautiful-dnd";

const DraggableCard = ({ card, list, index, setActiveCard, setActiveList, setIsModalOpen }) => {
  const handleCardClick = () => {
    setActiveCard(card);
    setActiveList(list);
    setIsModalOpen(true);
  };

  return (
    <Draggable key={card.id} draggableId={card.id.toString()} index={index}>
      {(provided, snapshot) => (
        <li
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`bg-white rounded-lg p-2 mx-4 mb-2 shadow-sm cursor-move hover:bg-gray-100 active:bg-gray-300 ${
            snapshot.isDragging ? "opacity-70" : ""
          }`}
          draggable
          onClick={handleCardClick}
        >
          {card.title}
        </li>
      )}
    </Draggable>
  );
};

export default DraggableCard;
