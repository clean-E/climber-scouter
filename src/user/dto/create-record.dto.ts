import { Field, InputType } from '@nestjs/graphql';
import { Problem } from 'src/schemas/record.schema';

@InputType()
export class CreateRecordInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  gym: string;

  @Field(() => [Problem])
  problems: Problem[];
}
