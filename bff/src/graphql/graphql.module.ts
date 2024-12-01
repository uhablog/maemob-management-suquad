import { Module } from '@nestjs/common';
import { GraphQLModule as NestGraphQLModule } from '@nestjs/graphql';
import { GrpcClientModule } from 'src/grpc/grpc-client.module';
import { GraphQLResolver } from './graphql.resolver';
import { GraphQLService } from './graphql.service';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { FootballModule } from 'src/football/football.module';

@Module({
  imports: [
    GrpcClientModule,
    FootballModule,
    NestGraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
  ],
  providers: [ GraphQLResolver, GraphQLService ],
})
export class GraphQLModule {}