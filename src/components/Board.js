import React, { useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import DraggableCard from "./Card";
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
  const [editedListTitle, setEditedListTitle] = useState("");

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

  // Remove list function
  const removeList = (id) => {
    const updatedLists = lists.filter((list) => list.id !== id);
    setLists(updatedLists);
  };

  // Edit List title functions
  const handleListTitleClick = (listId, listTitle) => {
    setActiveList(listId);
    setEditedListTitle(listTitle);
  };

  const handleListTitleChange = (e) => {
    setEditedListTitle(e.target.value);
  };

  const handleListTitleSubmit = (listId) => {
    const updatedLists = lists.map((list) =>
      list.id === listId ? { ...list, title: editedListTitle } : list
    );
    setLists(updatedLists);
    setActiveList(null);
    setEditedListTitle("");
  };

  const handleListTitleKeyDown = (e, listId) => {
    if (e.key === "Enter") {
      handleListTitleSubmit(listId);
    }
  };

  return (
    <div className="board">
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex items-start justify-start gap-4 p-12 pt-20">
          {lists.map((list) => (
            <div className=" bg-gray-100 flex-none border w-72 rounded-xl mr-4 relative">
              <div className="flex justify-between m-4">
                {activeList === list.id ? (
                  <input
                    type="text"
                    className="text-lg font-bold w-full mr-2"
                    value={editedListTitle}
                    onChange={handleListTitleChange}
                    onBlur={() => handleListTitleSubmit(list.id)}
                    onKeyDown={(e) => handleListTitleKeyDown(e, list.id)}
                  />
                ) : (
                  <h3
                    className="text-lg font-bold cursor-pointer"
                    onClick={() => handleListTitleClick(list.id, list.title)}
                  >
                    {list.title}
                  </h3>
                )}
                <button onClick={() => removeList(list.id)}>
                  <TfiClose className="close-icon" />
                </button>
              </div>
              <Droppable key={list.id} droppableId={list.id.toString()}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`list-scroll-bar min-h-[10px] py-2 ${
                      snapshot.isDraggingOver ? "droppable-active" : ""
                    } `}
                  >
                    <ul>
                      {list.cards.map((card, index) => (
                        <DraggableCard
                          key={card.id}
                          card={card}
                          list={list}
                          index={index}
                          setActiveCard={setActiveCard}
                          setActiveList={setActiveList}
                          setIsModalOpen={setIsModalOpen}
                        />
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
                className="bg-gray-100 text-white rounded-xl inline-block align-top w-72 p-2 mr-2 transition bg-opacity-40 hover:bg-opacity-20 duration-300"
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
      </DragDropContext>
    </div>
  );
};

export default Board;
