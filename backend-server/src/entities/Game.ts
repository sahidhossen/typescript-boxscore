import { Entity, Property, ManyToOne, OneToOne } from "mikro-orm";
import { GameType, Team } from "./index";
import { BaseEntity } from "./BaseEntity";

@Entity()
export class Game extends BaseEntity {
  @Property()
  name: string;

  @Property()
  round: number;

  @ManyToOne()
  gameType: GameType;

  @OneToOne()
  homeTeam: Team;

  @OneToOne()
  awayTeam: Team;

  @OneToOne()
  winTeam: Team;

  @Property()
  details: string;

  constructor(name: string, round: number, gameType: GameType, homeTeam: Team, awayTeam: Team, details: string = "") {
    super();
    this.name = name;
    this.round = round;
    this.gameType = gameType;
    this.homeTeam = homeTeam;
    this.awayTeam = awayTeam;
    this.details = details;
  }
}
