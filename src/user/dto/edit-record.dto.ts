import { Field, InputType } from '@nestjs/graphql';
import { Problem } from 'src/schemas/record.schema';

@InputType()
export class EditRecordInput {
  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  password: string;

  @Field(() => String)
  gym: string;

  @Field(() => [Problem])
  problems: Problem[];
}
