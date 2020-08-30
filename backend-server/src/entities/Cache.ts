import { Entity, Property } from "mikro-orm";
import { BaseEntity } from "./BaseEntity";

@Entity()
export class Cache extends BaseEntity {
  @Property()
  name: string;

  @Property()
  data: string;

  @Property()
  lifeTime: number;

  constructor(name: string, data: string, lifeTime: number) {
    super();
    this.name = name;
    this.data = data;
    this.lifeTime = lifeTime;
  }
}
