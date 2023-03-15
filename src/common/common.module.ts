import { Module } from '@nestjs/common';
import { ConfigModule } from 'src/config/config.module';
import { GraphqlModule } from 'src/graphql/graphql.module';
import { MongoModule } from 'src/mongo/mongo.module';

@Module({
  imports: [GraphqlModule, MongoModule, ConfigModule],
  exports: [GraphqlModule, MongoModule, ConfigModule],
})
export class CommonModule {}
