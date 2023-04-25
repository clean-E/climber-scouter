import { Field, InputType, Int, ObjectType } from "@nestjs/graphql";
import { Record } from "./record.schema";
import * as mongoose from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
@InputType("RankInput")
@ObjectType("Rank")
export class Rank {
  @Field(() => String)
  _id: mongoose.Types.ObjectId;

  @Field(() => String)
  name: string;

  @Field(() => Int)
  power: number;
}

export type UserDocument = User & mongoose.Document;

@Schema()
@InputType("UserInput")
@ObjectType("User")
export class User {
  @Field(() => String)
  _id: mongoose.Types.ObjectId;

  @Prop()
  @Field(() => String)
  name: string;

  @Prop()
  @Field(() => String)
  password: string;

  @Prop({ type: [mongoose.Types.ObjectId], ref: "Record" })
  @Field(() => [Record], { nullable: true })
  records: Record[];
}

export const UserSchema = SchemaFactory.createForClass(User);
