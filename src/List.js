import React, { useState } from "react";
import NewListForm from "./NewListForm";

const List = () => {
  const [lists, setLists] = useState([
    {
      id: 1,
      title: "To Do",
      cards: [
        { id: 1, text: "Task 1" },
        { id: 2, text: "Task 2" },
        { id: 3, text: "Task 3" },
      ],
    },
    {
      id: 2,
      title: "In Progress",
      cards: [
        { id: 4, text: "Task 4" },
        { id: 5, text: "Task 5" },
      ],
    },
    {
      id: 3,
      title: "Done",
      cards: [{ id: 6, text: "Task 6" }],
    },
  ]);

  const [isNewListFormOpen, setIsNewListFormOpen] = useState(false);

  const handleDragStart = (e, listId, cardId) => {
    e.dataTransfer.setData("text/plain", JSON.stringify({ listId, cardId }));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, listId) => {
    const data = e.dataTransfer.getData("text/plain");
    const { listId: sourceListId, cardId } = JSON.parse(data);
    const sourceList = lists.find((list) => list.id === sourceListId);
    const card = sourceList.cards.find((card) => card.id === cardId);

    if (sourceListId === listId) {
      // Reorder cards within the same list
      const updatedCards = Array.from(sourceList.cards);
      const cardIndex = updatedCards.findIndex((card) => card.id === cardId);
      updatedCards.splice(cardIndex, 1);
      updatedCards.splice(
        cardIndex < e.target.dataset.index
          ? e.target.dataset.index - 1
          : e.target.dataset.index,
        0,
        card
      );
      const updatedLists = lists.map((list) => {
        if (list.id === sourceListId) {
          return { ...list, cards: updatedCards };
        }
        return list;
      });
      setLists(updatedLists);
    } else {
      // Move card to a different list
      const updatedSourceCards = Array.from(sourceList.cards);
      const cardIndex = updatedSourceCards.findIndex(
        (card) => card.id === cardId
      );
      updatedSourceCards.splice(cardIndex, 1);
      const updatedLists = lists.map((list) => {
        if (list.id === sourceListId) {
          return { ...list, cards: updatedSourceCards };
        }
        if (list.id === listId) {
          return { ...list, cards: [...list.cards, card] };
        }
        return list;
      });
      setLists(updatedLists);
    }
  };

  return (
    <div className="container mx-auto flex overflow-x-auto pb-4">
      {lists.map((list) => (
        <div
          key={list.id}
          className="bg-gray-100 flex-none border w-72 p-4 rounded mr-4"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, list.id)}
        >
          <h3 className="text-lg font-bold px-2 py-1">{list.title}</h3>
          <ul>
            {list.cards.map((card, index) => (
              <li
                key={card.id}
                className="bg-white rounded-md p-2 mb-2 shadow-sm cursor-move hover:bg-gray-100 active:bg-gray-300"
                draggable
                onDragStart={(e) => handleDragStart(e, list.id, card.id)}
                data-index={index}
              >
                {card.text}
              </li>
            ))}
          </ul>
        </div>
      ))}

      <div>
        {!isNewListFormOpen && (
          <button
            onClick={() => {
              setIsNewListFormOpen(!isNewListFormOpen);
            }}
            className="bg-gray-100 rounded-md inline-block align-top w-72 p-2 mr-2"
          >
            Add another list
          </button>
        )}
        {isNewListFormOpen && (
          <NewListForm
            lists={lists}
            setLists={setLists}
            setIsNewListFormOpen={setIsNewListFormOpen}
          />
        )}
      </div>
    </div>
  );
};

export default List;
