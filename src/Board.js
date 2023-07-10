import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import NewListForm from "./NewListForm";
import NewCardForm from "./NewCardForm";
import CardEditModal from "./CardEditModal";
import { TfiClose } from "react-icons/tfi";
import { AiOutlinePlus } from "react-icons/ai";

const Board = () => {
  const [lists, setLists] = useState([
    {
      id: 1,
      title: "Sample list - To Do",
      cards: [
        {
          id: 1,
          title: "Task 1",
          description: "Lorem ipsum dolor sit amet...",
        },
        {
          id: 2,
          title: "Task 2",
          description: "Lorem ipsum dolor sit amet...",
        },
        {
          id: 3,
          title: "Task 3",
          description: "Lorem ipsum dolor sit amet...",
        },
      ],
    },
    // Other list objects
  ]);

  const [isNewListFormOpen, setIsNewListFormOpen] = useState(false);
  const [isNewCardFormOpen, setIsNewCardFormOpen] = useState(false);
  const [activeList, setActiveList] = useState(null);
  const [activeCard, setActiveCard] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const { source, destination } = result;

    // Move card within the same list
    if (source.droppableId === destination.droppableId) {
      const listId = parseInt(source.droppableId);
      const list = lists.find((item) => item.id === listId);
      const updatedCards = Array.from(list.cards);
      const [movedCard] = updatedCards.splice(source.index, 1);
      updatedCards.splice(destination.index, 0, movedCard);

      const updatedLists = lists.map((item) => {
        if (item.id === listId) {
          return { ...item, cards: updatedCards };
        }
        return item;
      });

      setLists(updatedLists);
    } else {
      // Move card to a different list
      const sourceListId = parseInt(source.droppableId);
      const destinationListId = parseInt(destination.droppableId);

      const sourceList = lists.find((item) => item.id === sourceListId);
      const destinationList = lists.find(
        (item) => item.id === destinationListId
      );

      const updatedSourceCards = Array.from(sourceList.cards);
      const updatedDestinationCards = Array.from(destinationList.cards);

      const [movedCard] = updatedSourceCards.splice(source.index, 1);
      updatedDestinationCards.splice(destination.index, 0, movedCard);

      const updatedLists = lists.map((item) => {
        if (item.id === sourceListId) {
          return { ...item, cards: updatedSourceCards };
        } else if (item.id === destinationListId) {
          return { ...item, cards: updatedDestinationCards };
        }
        return item;
      });

      setLists(updatedLists);
    }
  };

  const removeList = (id) => {
    const updatedLists = lists.filter((list) => list.id !== id);
    setLists(updatedLists);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="board">
        <div className="board flex items-start justify-start gap-4 h-full p-12">
          {lists.map((list) => (
            <div className="bg-gray-100 flex-none border w-72 rounded mr-4 relative">
              <div className="flex justify-between m-4">
                <h3 className="text-lg font-bold">{list.title}</h3>
                <button onClick={() => removeList(list.id)}>
                  <TfiClose className="close-icon" />
                </button>
              </div>
              <Droppable key={list.id} droppableId={list.id.toString()}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`min-h-[10px] py-2 ${
                      snapshot.isDraggingOver ? "droppable-active" : ""
                    } `}
                  >
                    <ul>
                      {list.cards.map((card, index) => (
                        <Draggable
                          key={card.id}
                          draggableId={card.id.toString()}
                          index={index}
                        >
                          {(provided) => (
                            <li
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className=" bg-white rounded-md p-2 mx-4 mb-2 shadow-sm cursor-move hover:bg-gray-100 active:bg-gray-300"
                              draggable
                              onClick={() => {
                                setActiveCard(card);
                                setActiveList(list);
                                setIsModalOpen(true);
                              }}
                            >
                              {card.title}
                            </li>
                          )}
                        </Draggable>
                      ))}
                    </ul>
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
              <div>
                {!isNewCardFormOpen ||
                (activeList && activeList.id !== list.id) ? (
                  <button
                    onClick={() => {
                      setActiveList(list);
                      setIsNewCardFormOpen(true);
                    }}
                    className="flex items-center gap-2 m-4 hover:opacity-70"
                  >
                    <AiOutlinePlus />
                    <span>Add a card</span>
                  </button>
                ) : (
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
            {!isNewListFormOpen ? (
              <button
                onClick={() => setIsNewListFormOpen(true)}
                className="bg-gray-100 rounded-md inline-block align-top w-72 p-2 mr-2"
              >
                Add another list
              </button>
            ) : (
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
    </DragDropContext>
  );
};

export default Board;
