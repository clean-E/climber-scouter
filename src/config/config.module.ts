import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';

@Module({
  imports: [
    NestConfigModule.forRoot({
      envFilePath: ['./src/config/.env'],
      isGlobal: true,
    }),
  ],
})
export class ConfigModule {}
