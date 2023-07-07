import React, { useState } from "react";
import NewListForm from "./NewListForm";
import NewCardForm from "./NewCardForm";
import CardEditModal from "./CardEditModal";
import { TfiClose } from "react-icons/tfi";
import { AiOutlinePlus } from "react-icons/ai";

const List = () => {
  const [lists, setLists] = useState([
    {
      id: 1,
      title: "Sample list - To Do",
      cards: [
        {
          id: 1,
          title: "Task 1",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        },
        {
          id: 2,
          title: "Task 2",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        },
        {
          id: 3,
          title: "Task 3",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        },
      ],
    },
    {
      id: 2,
      title: "Sample list - In Progress",
      cards: [
        {
          id: 4,
          title: "Task 4",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        },
        {
          id: 5,
          title: "Task 5",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        },
      ],
    },
    {
      id: 3,
      title: "Sample list - Done",
      cards: [
        {
          id: 6,
          title: "Task 6",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        },
      ],
    },
  ]);

  const [isNewListFormOpen, setIsNewListFormOpen] = useState(false);
  const [isNewCardFormOpen, setIsNewCardFormOpen] = useState(false);
  const [activeList, setActiveList] = useState(null);
  const [activeCard, setActiveCard] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      setActiveList(null); // Reset the active list ID
    }
  };

  const removeList = (id) => {
    const updatedLists = lists.filter((list) => list.id !== id);
    setLists(updatedLists);
  };

  return (
    <div className="board">
      <div className="container mx-auto flex overflow-x-auto mt-24 pb-4 ">
        {lists.map((list, index) => (
          <div
            key={list.id}
            className="bg-gray-100 flex-none border w-72 p-4 rounded mr-4 relative"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, list.id)}
          >
            <div className="flex justify-between mb-2">
              <h3 className="text-lg font-bold">{list.title}</h3>
              <button
                onClick={() => {
                  removeList(list.id);
                }}
              >
                <TfiClose className="close-icon" />
              </button>
            </div>
            <ul>
              {list.cards.map((card, index) => (
                <li
                  key={card.id}
                  className="bg-white rounded-md p-2 mb-2 shadow-sm cursor-move hover:bg-gray-100 active:bg-gray-300"
                  draggable
                  onDragStart={(e) => handleDragStart(e, list.id, card.id)}
                  data-index={index}
                  onClick={() => {
                    setActiveCard(card);
                    setActiveList(list);
                    setIsModalOpen(true);
                  }}
                >
                  {card.title}
                </li>
              ))}
            </ul>
            <div>
              {(!isNewCardFormOpen || activeList.id !== list.id) && (
                <button
                  onClick={() => {
                    setActiveList(list);
                    setIsNewCardFormOpen(true);
                  }}
                  className="flex items-center gap-2 mt-4 hover:opacity-70"
                >
                  <AiOutlinePlus />
                  <span>Add a card</span>
                </button>
              )}
              {isNewCardFormOpen && activeList.id === list.id && (
                <NewCardForm
                  lists={lists}
                  setLists={setLists}
                  setIsNewCardFormOpen={setIsNewCardFormOpen}
                  activeList={activeList}
                />
              )}
            </div>
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
        {/* modal */}
        {isModalOpen && (
          <CardEditModal
            activeCard={activeCard}
            setActiveCard={setActiveCard}
            activeList={activeList}
            lists={lists}
            setLists={setLists}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default List;
