const baseUrl = "http://localhost:5000";

const API = {
  fetchGames: async () => {
    return fetch(baseUrl + "/game-type/")
      .then((response) => response.json())
      .then((data) => data)
      .catch((error) => {
        console.error("Error on game-type:", error);
      });
  },
  fetchGameScore: async (gameId) => {
    return fetch(baseUrl + "/game-score/" + gameId)
      .then((response) => response.json())
      .then((data) => data)
      .catch((error) => {
        console.error("Error on game-score:", error);
      });
  },
};
export default API;
