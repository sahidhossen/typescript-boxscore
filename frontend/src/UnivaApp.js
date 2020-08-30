import React, { useEffect, useState } from "react";
import API from "./API";
import Games from "./components/Games";
import BoxScore from "./components/BoxScore";
import "./App.css";

const UnivaApp = () => {
  const [selectedGame, setGame] = useState({ gameId: null, gameType: null });
  const [games, setGames] = useState([]);

  useEffect(() => {
    // Load api
    const fetchData = async () => {
      const response = await API.fetchGames();
      console.log("Game Type and Teams: ", response);
      if (response && response.success) {
        setGames(response.data);
      }
    };
    fetchData();
  }, []);

  const onSelectGame = (id, gameType) => {
    setGame({ gameId: id, gameType });
  };

  const onBackHandler = (event) => {
    setGame({ gameId: null, gameType: null });
  };

  return (
    <div className="container">
      <header className="d-flex">
        <h1 className="title">{selectedGame.gameType ? selectedGame.gameType + " Boxscore" : "List of games"}</h1>
        {selectedGame.gameId && (
          <span className="back" onClick={onBackHandler}>
            {`<`} Back
          </span>
        )}
      </header>
      <hr />
      <BoxScore gameId={selectedGame.gameId} />
      {!selectedGame.gameId && <Games data={games} onSelect={onSelectGame} />}
    </div>
  );
};

export default UnivaApp;
