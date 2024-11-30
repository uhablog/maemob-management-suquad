import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { GraphQLService } from "./graphql.service";

@Resolver()
export class GraphQLResolver {

  constructor(private readonly graphqlService: GraphQLService) {}

  @Query(() => String)
  status(): string {
    return 'OK';
  }

  @Mutation(() => String)
  async createSquad(
    @Args('team_id') team_id: string,
    @Args('player_id') player_id: string
  ): Promise<string> {
    console.log(`graphql resolver team_id: ${team_id}, player_id: ${player_id}`);
    const result = await this.graphqlService.createSquad(team_id, player_id);
    console.log(`graphql resolver result: %o`, result);
    return result.squadId;
  }
}