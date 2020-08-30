import { Entity, Property, ManyToOne } from "mikro-orm";
import { Game } from "./index";
import { BaseEntity } from "./BaseEntity";

@Entity()
export class GameScore extends BaseEntity {
  @ManyToOne()
  game: Game;

  @Property()
  homeTeamScore: object;

  @Property()
  awayTeamScore: object;

  @Property()
  details: string;

  constructor(game: Game, homeTeamScore: object, awayTeamScore: object) {
    super();
    this.game = game;
    this.homeTeamScore = homeTeamScore;
    this.awayTeamScore = awayTeamScore;
  }
}
