import './App.css'
import BoardList from './components/BoardList'

import { useEffect, useState } from 'react'
import axios from 'axios'
import NewBoardForm from './components/NewBoardForm'
import NewCardForm from './components/NewCardForm'
import CardList from './components/CardList'

const VITE_APP_BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL

const getAllBoardsAPI = () => {
  return axios.get(`${VITE_APP_BACKEND_URL}/boards`)
    .then(response => response.data)
    .catch(error => console.log(error));
};

const convertFromAPIBoard = (apiBoard) => {
  const newBoard = {
    ...apiBoard,
    boardId: apiBoard.board_id,
  };

  delete newBoard.Board_id;

  return newBoard;
};

const convertFromAPICard = (apiCard) => {
  const newCard = {
    ...apiCard,
    cardId: apiCard.card_id,
    likesCount: apiCard.likes_count
  };

  delete newCard.card_id;
  delete newCard.likes_count;

  return newCard;
};

const getCardsFromBoardAPI = (boardId) => {
  return axios.get(`${VITE_APP_BACKEND_URL}/boards/${boardId}/cards`)
    .then(response => response.data)
    .catch(error => console.log(error));
};

const addBoardAPI = (newBoard) => {
  return axios.post(`${VITE_APP_BACKEND_URL}/boards`, newBoard)
    .catch(error => console.log(error));
};

const addCardAPI = (boardId, newCard) => {
  return axios.post(`${VITE_APP_BACKEND_URL}/boards/${boardId}/cards`, newCard)
    .catch(error => console.log(error));
  };
  
const handleIncreseLikes = (boardId, cardId) => {
  return axios.patch(`${VITE_APP_BACKEND_URL}/boards/${boardId}/cards/${cardId}/like`)
    .then(res => res.data)
    .catch(error => console.log(error));
};


function App() {
const [BoardData,setBoardData] = useState([])
const [selectedBoardId, setSelectedBoardId] = useState(null);
const [CardsData,setCardsData] = useState([])



const getAllBoards = () => {
  return getAllBoardsAPI()
    .then(boards => {
      const newBoards = boards.map(convertFromAPIBoard);
      setBoardData(newBoards);
    })
};

useEffect(() => {
  getAllBoards();
}, []);

useEffect(() => {
  if (!selectedBoardId) return;
  getCardsFromBoardAPI(selectedBoardId)
    .then(data => {
      const newCards = data.cards.map(convertFromAPICard);
      setCardsData(newCards)
    })
},[selectedBoardId]);

const onHandleSubmitBoard = (data) =>{
  return addBoardAPI(data)
    .then((result) => {
      return setBoardData((prevBoards) => [...prevBoards,convertFromAPIBoard(result.data)]);
    });
};

const onHandleSubmitCard = (data) =>{
  if (!selectedBoardId) {
    alert("please select a board first");
    return;
  }

  return addCardAPI(selectedBoardId, data)
    .then(() => {
      return getCardsFromBoardAPI(selectedBoardId);
    })
    .then(data => {
      const newCards = data.cards.map(convertFromAPICard);
      setCardsData(newCards);
    });
};

const handleLikeCard = (cardId) => {
  handleIncreseLikes(selectedBoardId, cardId)
    .then(updatedCard => {
      setCardsData(prevCards =>
        prevCards.map(card =>
          card.cardId === updatedCard.card_id
            ? convertFromAPICard(updatedCard)
            : card
        )
      );
    });
};

  return (
    <>
      <header>
        <h1>It always seems impossible until it is done.</h1>
      </header>
      <main>
          <BoardList boards={BoardData} onSelectBoard={(boardId) => setSelectedBoardId(boardId)} />
          <NewBoardForm  onHandleSubmitBoard={onHandleSubmitBoard}/>
          <CardList cards={CardsData} onIncreseLikes={handleLikeCard} />
          <NewCardForm  onHandleSubmitCard={onHandleSubmitCard}/>
      </main>
    </>


  )
}

export default App
