import { DI } from "../mikro-orm-config";
import { GameType, Team, TeamMember, Game, GameScore } from "../entities";

class FeedClass {
  async createCollection() {
    const driver: any = DI.orm.em.getDriver();
    await driver.createCollections();
  }

  async startFeeding() {
    await this.createMLBlTeam();
    await this.createNBAlTeam();
    // await this.createFootballTeam();
  }

  async createMLBlTeam() {
    // Game type
    const gameType = await this.createGameType("MLB", "MLB Details");

    const team1 = await this.createTeam("Cardinals", "STL", gameType);
    // Add members for team
    await this.createTeamMember("Yadier Molina", team1);
    await this.createTeamMember("Jack Flaherty", team1);
    const team2 = await this.createTeam("CUBS", "CHC", gameType);
    // Add members for team
    await this.createTeamMember("Krish Bryant", team2);
    await this.createTeamMember("Anthony Rizzo", team2);
    // Start game
    const game = await this.createGame("MLB Game 1", 9, gameType, team1, team2);
    // Start scoring
    await this.createScore(game, { S: 0, R: 1, H: 0, E: 0 }, { S: 1, R: 0, H: 0, E: 0 });
    await this.createScore(game, { S: 0, R: 0, H: 1, E: 0 }, { S: 0, R: 0, H: 0, E: 0 });
    await this.createScore(game, { S: 0, R: 0, H: 2, E: 0 }, { S: 2, R: 0, H: 0, E: 0 });
    await this.createScore(game, { S: 3, R: 2, H: 3, E: 0 }, { S: 0, R: 0, H: 0, E: 0 });
    await this.createScore(game, { S: 0, R: 2, H: 3, E: 0 }, { S: 0, R: 0, H: 0, E: 0 });
    await this.createScore(game, { S: 0, R: 2, H: 3, E: 0 }, { S: 0, R: 0, H: 0, E: 0 });
    await this.createScore(game, { S: 0, R: 2, H: 3, E: 0 }, { S: 0, R: 0, H: 0, E: 0 });
    await this.createScore(game, { S: 0, R: 2, H: 3, E: 0 }, { S: 1, R: 0, H: 0, E: 0 });
    await this.createScore(game, { S: 1, R: 4, H: 8, E: 1 }, { S: 1, R: 5, H: 12, E: 0 });
  }
  async createNBAlTeam() {
    // Game type
    const gameType = await this.createGameType("NBA", "NBA Details");
    const team1 = await this.createTeam("Denver Nuggets", "Nuggets", gameType);
    // Add members for team
    await this.createTeamMember("Jamal Murray", team1);
    await this.createTeamMember("Bol Bol", team1);
    const team2 = await this.createTeam("Utah Jazz", "UJ", gameType);
    // Add members for team
    await this.createTeamMember("Rudy Gobert", team2);
    await this.createTeamMember("Jordan Clarkson", team2);
    // Start game
    const game = await this.createGame("NBA Game 1", 4, gameType, team1, team2);
    // Start scoring
    await this.createScore(game, { S: 33, T: 33 }, { S: 32, T: 32 });
    await this.createScore(game, { S: 21, T: 54 }, { S: 31, T: 63 });
    await this.createScore(game, { S: 28, T: 82 }, { S: 23, T: 86 });
    await this.createScore(game, { S: 35, T: 117 }, { S: 21, T: 107 });
  }

  async createFootballTeam() {
    // Game type
    const gameType = await this.createGameType("Football", "Football Details");
    const team1 = await this.createTeam("Arsenal", "AL", gameType);
    // Add members for team
    await this.createTeamMember("Leno", team1);
    await this.createTeamMember("Macye", team1);
    const team2 = await this.createTeam("Milan", "Milan", gameType);
    // Add members for team
    await this.createTeamMember("Asmir Begovic", team2);
    await this.createTeamMember("Davide Calabria", team2);
    // Start game
    const game = await this.createGame("Football Game 1", 4, gameType, team1, team2);
    // Start scoring
    await this.createScore(game, { S: 0, T: 0 }, { S: 1, T: 1 });
    await this.createScore(game, { S: 1, T: 1 }, { S: 2, T: 3 });
    await this.createScore(game, { S: 0, T: 1 }, { S: 0, T: 3 });
    await this.createScore(game, { S: 0, T: 1 }, { S: 0, T: 3 });
  }

  async createGameType(name: string, details: string) {
    const gameType = new GameType(name, details);
    DI.orm.em.persistLater(gameType);
    await DI.orm.em.flush();
    return gameType;
  }

  async createTeam(name: string, shortName: string, gameType: GameType) {
    const team = new Team(name, shortName, gameType);
    await DI.orm.em.persist(team, true);
    return team;
  }

  async createTeamMember(name: string, team: Team) {
    const teamMember = new TeamMember(name, team);
    await DI.orm.em.persist(teamMember, true);
    return teamMember;
  }

  async createGame(name: string, round: number, gameType: GameType, homeTeam: Team, awayTeam: Team) {
    const game = new Game(name, round, gameType, homeTeam, awayTeam);
    await DI.orm.em.persist(game, true);
    return game;
  }

  async createScore(game: Game, homeTeamScore: object, awayTeamScore: object) {
    const gameScore = new GameScore(game, homeTeamScore, awayTeamScore);
    await DI.orm.em.persist(gameScore, true);
    return gameScore;
  }
}
const Feed = new FeedClass();

export default Feed;
