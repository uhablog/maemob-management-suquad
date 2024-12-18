import { Module } from '@nestjs/common';
import { GraphQLModule } from './graphql/graphql.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    GraphQLModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'docker' ? '.env.docker' : '.env.local',
    })
  ]
})
export class AppModule {}