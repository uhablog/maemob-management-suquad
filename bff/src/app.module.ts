import { Module } from '@nestjs/common';
import { GraphQLModule } from './graphql/graphql.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    GraphQLModule,
    ConfigModule.forRoot({
      isGlobal: true
    })
  ]
})
export class AppModule {}