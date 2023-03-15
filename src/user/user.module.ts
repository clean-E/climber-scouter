import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user.schema';
import { Record, RecordSchema } from 'src/schemas/record.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: Record.name,
        schema: RecordSchema,
      },
    ]),
  ],
  providers: [UserResolver, UserService],
})
export class UserModule {}
