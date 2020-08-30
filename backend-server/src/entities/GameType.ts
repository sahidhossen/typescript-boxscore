import { Entity, Property, OneToMany, Cascade, Collection } from "mikro-orm";
import { BaseEntity } from "./BaseEntity";
import { Team, Game } from "./index";

@Entity()
export class GameType extends BaseEntity {
  @Property()
  name: string;

  @Property()
  details: string;

  @OneToMany(() => Team, (b) => b.gameType, { cascade: [Cascade.ALL] })
  teams = new Collection<Team>(this);

  @OneToMany(() => Game, (b) => b.gameType, { cascade: [Cascade.ALL] })
  games = new Collection<Game>(this);

  constructor(name: string, details: string) {
    super();
    this.name = name;
    this.details = details;
  }
}
