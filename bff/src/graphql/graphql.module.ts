import { Module } from '@nestjs/common';
import { GraphQLModule as NestGraphQLModule } from '@nestjs/graphql';
import { GrpcClientModule } from 'src/grpc/grpc-client.module';
import { GraphQLResolver } from './graphql.resolver';
import { GraphQLService } from './graphql.service';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
  imports: [
    GrpcClientModule,
    NestGraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
  ],
  providers: [ GraphQLResolver, GraphQLService ],
})
export class GraphQLModule {}