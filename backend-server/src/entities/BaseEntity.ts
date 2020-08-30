import { PrimaryKey, Property, SerializedPrimaryKey, MongoEntity } from "mikro-orm";

import { ObjectId } from "mongodb";

export abstract class BaseEntity implements MongoEntity<BaseEntity> {
  @PrimaryKey()
  _id!: ObjectId;

  @SerializedPrimaryKey()
  id!: string;

  @Property()
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();
}
