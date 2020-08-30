import { Entity, Property, ManyToOne, OneToMany, Cascade, Collection } from "mikro-orm";
import { GameType, TeamMember } from "./index";
import { BaseEntity } from "./BaseEntity";

@Entity()
export class Team extends BaseEntity {
  @Property()
  name: string;

  @Property()
  shortName: string;

  @ManyToOne()
  gameType: GameType;

  @OneToMany(() => TeamMember, (b) => b.team, { cascade: [Cascade.ALL] })
  teamMember = new Collection<TeamMember>(this);

  @Property()
  details: string;

  constructor(name: string, shortName: string, gameType: GameType) {
    super();
    this.name = name;
    this.gameType = gameType;
    this.shortName = shortName;
  }
}
