import React from "react";

const Card = ({
  card,
  list,
  handleDragStart,
  setActiveCard,
  setActiveList,
  setIsModalOpen,
}) => {
  return (
    <li
      className="bg-white rounded-md p-2 mb-2 shadow-sm cursor-move hover:bg-gray-100 active:bg-gray-300"
      draggable
      onDragStart={(e) => handleDragStart(e, list.id, card.id)}
      onClick={() => {
        setActiveCard(card);
        setActiveList(list);
        setIsModalOpen(true);
      }}
    >
      {card.title}
    </li>
  );
};

export default Card;
