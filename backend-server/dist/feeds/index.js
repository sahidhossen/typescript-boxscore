"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mikro_orm_config_1 = require("../mikro-orm-config");
const entities_1 = require("../entities");
class FeedClass {
    createCollection() {
        return __awaiter(this, void 0, void 0, function* () {
            const driver = mikro_orm_config_1.DI.orm.em.getDriver();
            yield driver.createCollections();
        });
    }
    startFeeding() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.createMLBlTeam();
            yield this.createNBAlTeam();
        });
    }
    createMLBlTeam() {
        return __awaiter(this, void 0, void 0, function* () {
            const gameType = yield this.createGameType("MLB", "MLB Details");
            const team1 = yield this.createTeam("Cardinals", "STL", gameType);
            yield this.createTeamMember("Yadier Molina", team1);
            yield this.createTeamMember("Jack Flaherty", team1);
            const team2 = yield this.createTeam("CUBS", "CHC", gameType);
            yield this.createTeamMember("Krish Bryant", team2);
            yield this.createTeamMember("Anthony Rizzo", team2);
            const game = yield this.createGame("MLB Game 1", 9, gameType, team1, team2);
            yield this.createScore(game, { S: 0, R: 1, H: 0, E: 0 }, { S: 1, R: 0, H: 0, E: 0 });
            yield this.createScore(game, { S: 0, R: 0, H: 1, E: 0 }, { S: 0, R: 0, H: 0, E: 0 });
            yield this.createScore(game, { S: 0, R: 0, H: 2, E: 0 }, { S: 2, R: 0, H: 0, E: 0 });
            yield this.createScore(game, { S: 3, R: 2, H: 3, E: 0 }, { S: 0, R: 0, H: 0, E: 0 });
            yield this.createScore(game, { S: 0, R: 2, H: 3, E: 0 }, { S: 0, R: 0, H: 0, E: 0 });
            yield this.createScore(game, { S: 0, R: 2, H: 3, E: 0 }, { S: 0, R: 0, H: 0, E: 0 });
            yield this.createScore(game, { S: 0, R: 2, H: 3, E: 0 }, { S: 0, R: 0, H: 0, E: 0 });
            yield this.createScore(game, { S: 0, R: 2, H: 3, E: 0 }, { S: 1, R: 0, H: 0, E: 0 });
            yield this.createScore(game, { S: 1, R: 4, H: 8, E: 1 }, { S: 1, R: 5, H: 12, E: 0 });
        });
    }
    createNBAlTeam() {
        return __awaiter(this, void 0, void 0, function* () {
            const gameType = yield this.createGameType("NBA", "NBA Details");
            const team1 = yield this.createTeam("Denver Nuggets", "Nuggets", gameType);
            yield this.createTeamMember("Jamal Murray", team1);
            yield this.createTeamMember("Bol Bol", team1);
            const team2 = yield this.createTeam("Utah Jazz", "UJ", gameType);
            yield this.createTeamMember("Rudy Gobert", team2);
            yield this.createTeamMember("Jordan Clarkson", team2);
            const game = yield this.createGame("NBA Game 1", 4, gameType, team1, team2);
            yield this.createScore(game, { S: 33, T: 33 }, { S: 32, T: 32 });
            yield this.createScore(game, { S: 21, T: 54 }, { S: 31, T: 63 });
            yield this.createScore(game, { S: 28, T: 82 }, { S: 23, T: 86 });
            yield this.createScore(game, { S: 35, T: 117 }, { S: 21, T: 107 });
        });
    }
    createFootballTeam() {
        return __awaiter(this, void 0, void 0, function* () {
            const gameType = yield this.createGameType("Football", "Football Details");
            const team1 = yield this.createTeam("Arsenal", "AL", gameType);
            yield this.createTeamMember("Leno", team1);
            yield this.createTeamMember("Macye", team1);
            const team2 = yield this.createTeam("Milan", "Milan", gameType);
            yield this.createTeamMember("Asmir Begovic", team2);
            yield this.createTeamMember("Davide Calabria", team2);
            const game = yield this.createGame("Football Game 1", 4, gameType, team1, team2);
            yield this.createScore(game, { S: 0, T: 0 }, { S: 1, T: 1 });
            yield this.createScore(game, { S: 1, T: 1 }, { S: 2, T: 3 });
            yield this.createScore(game, { S: 0, T: 1 }, { S: 0, T: 3 });
            yield this.createScore(game, { S: 0, T: 1 }, { S: 0, T: 3 });
        });
    }
    createGameType(name, details) {
        return __awaiter(this, void 0, void 0, function* () {
            const gameType = new entities_1.GameType(name, details);
            mikro_orm_config_1.DI.orm.em.persistLater(gameType);
            yield mikro_orm_config_1.DI.orm.em.flush();
            return gameType;
        });
    }
    createTeam(name, shortName, gameType) {
        return __awaiter(this, void 0, void 0, function* () {
            const team = new entities_1.Team(name, shortName, gameType);
            yield mikro_orm_config_1.DI.orm.em.persist(team, true);
            return team;
        });
    }
    createTeamMember(name, team) {
        return __awaiter(this, void 0, void 0, function* () {
            const teamMember = new entities_1.TeamMember(name, team);
            yield mikro_orm_config_1.DI.orm.em.persist(teamMember, true);
            return teamMember;
        });
    }
    createGame(name, round, gameType, homeTeam, awayTeam) {
        return __awaiter(this, void 0, void 0, function* () {
            const game = new entities_1.Game(name, round, gameType, homeTeam, awayTeam);
            yield mikro_orm_config_1.DI.orm.em.persist(game, true);
            return game;
        });
    }
    createScore(game, homeTeamScore, awayTeamScore) {
        return __awaiter(this, void 0, void 0, function* () {
            const gameScore = new entities_1.GameScore(game, homeTeamScore, awayTeamScore);
            yield mikro_orm_config_1.DI.orm.em.persist(gameScore, true);
            return gameScore;
        });
    }
}
const Feed = new FeedClass();
exports.default = Feed;
//# sourceMappingURL=index.js.map