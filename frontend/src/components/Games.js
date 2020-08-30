import React, { Fragment } from "react";

const Games = (props) => {
  const { data, onSelect } = props;
  const onSelectGameId = (id, gameType) => (event) => {
    onSelect(id, gameType);
  };
  return (
    <Fragment>
      {data.map((gameType) => {
        const { games } = gameType;
        return (
          <Fragment key={gameType.id}>
            <h3 className="title">{gameType.name}</h3>
            <div className="games-container">
              {games.map((game) => {
                return (
                  <div className="game-list d-flex" key={game.id}>
                    <div className="game-info flex-1 d-flex">
                      <div className="game-part home-team flex-2">
                        <h3 className="title">{game.homeTeam.name}</h3>
                        <span>30/8</span>
                      </div>
                      <div className="game-part game-time flex-1">
                        <p>VS</p>
                      </div>
                      <div className="game-part away-team flex-2">
                        <h3 className="title">{game.awayTeam.name}</h3>
                        <span>30/8</span>
                      </div>
                    </div>
                    <div className="game-action d-flex item-center">
                      <div className="btn-default" onClick={onSelectGameId(game.id, gameType.name)}>
                        Box Score
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Fragment>
        );
      })}
    </Fragment>
  );
};

export default Games;
