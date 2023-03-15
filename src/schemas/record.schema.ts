import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema()
@InputType('GymGradeInput', { isAbstract: true })
@ObjectType('GymGrade', { isAbstract: true })
export class GymGrage {
  @Field(() => String)
  lv0: string;
  @Field(() => String)
  lv1: string;
  @Field(() => String)
  lv2: string;
  @Field(() => String)
  lv3: string;
  @Field(() => String)
  lv4: string;
  @Field(() => String)
  lv5: string;
  @Field(() => String)
  lv6: string;
  @Field(() => String)
  lv7: string;
  @Field(() => String)
  lv8: string;
  @Field(() => String)
  lv9: string;
  @Field(() => String)
  lv10: string;
  @Field(() => String)
  lv11: string;
  @Field(() => String)
  lv12: string;
  @Field(() => String)
  lv13: string;
  @Field(() => String)
  lv14: string;
  @Field(() => String)
  lv15: string;
}

@Schema()
@InputType('ProblemInput')
@ObjectType('Problem')
export class Problem {
  @Field(() => String)
  grade: string;

  @Field(() => Int)
  count: number;
}

export type RecordDocument = Record & mongoose.Document;

@Schema()
@InputType('RecordInput')
@ObjectType('Record')
export class Record {
  @Field(() => String)
  _id: mongoose.Types.ObjectId;

  @Prop({ default: mongoose.now() })
  @Field(() => Date)
  date: Date;

  @Prop()
  @Field(() => String)
  gym: string;

  @Prop()
  @Field(() => [Problem])
  problems: Problem[];

  @Prop()
  @Field(() => Int)
  total: number;
}

export const RecordSchema = SchemaFactory.createForClass(Record);
