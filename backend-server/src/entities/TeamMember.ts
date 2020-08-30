import { Entity, Property, ManyToOne } from "mikro-orm";
import { Team } from "./index";
import { BaseEntity } from "./BaseEntity";

@Entity()
export class TeamMember extends BaseEntity {
  @Property()
  name: string;

  @ManyToOne()
  team: Team;

  @Property()
  details: string;

  constructor(name: string, team: Team) {
    super();
    this.name = name;
    this.team = team;
  }
}
