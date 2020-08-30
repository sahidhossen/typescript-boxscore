import React, { useEffect, useState } from "react";
import API from "../API";

const BoxScore = (props) => {
  const { gameId } = props;
  const [data, setData] = useState({});
  const [fetch, setFetchState] = useState(false);
  useEffect(() => {
    if (gameId) {
      const fetchAPIData = async () => {
        const response = await API.fetchGameScore(gameId);
        console.log("Game Score: ", response);
        setFetchState(true);
        if (response && response.success) {
          setData(response.data);
        }
      };
      fetchAPIData();
    }
  }, [gameId]);

  if (!gameId) return null;
  const { game, gameScore } = data;

  let scoreLen = game ? game.round : 0;
  let metaScore = {};
  let lastScore = {};

  if (gameScore && gameScore.length) {
    scoreLen = gameScore.length > scoreLen ? gameScore.length : scoreLen;
    lastScore = gameScore[gameScore.length - 1];
    if (typeof lastScore.homeTeamScore.S !== "undefined") {
      metaScore = { ...lastScore.homeTeamScore };
      delete metaScore.S;
    }
  }
  const fakeArray = Array(scoreLen).fill(0).map(Number.call, Number);

  return (
    <div className="boxscore-container">
      {!fetch && <div className="loader">...laoding</div>}
      {fetch && game && (
        <div className="boxscore">
          <div className="boxscore-table d-flex">
            <div className="col d-flex border-right bg-gray">
              <span className="col-data">&nbsp;</span>
              <span className="col-data">{game.awayTeam.shortName}</span>
              <span className="col-data">{game.homeTeam.shortName}</span>
            </div>
            {fakeArray.map((n) => {
              const scoreItem = gameScore[n] ? gameScore[n] : null;
              let awayTeamScorescore = "-";
              let homeTeamScorescore = "-";
              if (scoreItem) {
                const { homeTeamScore, awayTeamScore } = scoreItem;
                homeTeamScorescore = !isNaN(homeTeamScore.S) ? homeTeamScore.S : "-";
                awayTeamScorescore = !isNaN(awayTeamScore.S) ? awayTeamScore.S : "-";
              }
              return (
                <div className="col d-flex" key={n + 1}>
                  <span className="col-data">{n + 1}</span>
                  <span className="col-data">{awayTeamScorescore}</span>
                  <span className="col-data">{homeTeamScorescore}</span>
                </div>
              );
            })}
            {Object.keys(metaScore).map((key) => {
              const { homeTeamScore, awayTeamScore } = lastScore;
              return (
                <div className="col d-flex bg-gray border-left" key={key}>
                  <span className="col-data">{key}</span>
                  <span className="col-data">{!isNaN(awayTeamScore[key]) ? awayTeamScore[key] : "-"}</span>
                  <span className="col-data">{!isNaN(homeTeamScore[key]) ? homeTeamScore[key] : "-"}</span>
                </div>
              );
            })}
          </div>
          <div className="boxscore-teams d-flex bg-gray">
            <div className="boxscore-team flex-1">
              <h3 className="title">{game.awayTeam.name}</h3>
              <span className="team-state">56-38</span>
            </div>
            <div className="boxscore-team boxscore-status">
              <span>
                BTM <br />
                9TH
              </span>
            </div>
            <div className="boxscore-team flex-1">
              <h3 className="title">{game.homeTeam.name}</h3>
              <span className="team-state">56-38</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BoxScore;
