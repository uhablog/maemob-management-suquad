import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { GraphQLService } from "./graphql.service";
import { FootballAPIPlayer } from "../football/footballApiPlayer";
import { FootballService } from "src/football/football.service";
import { Auth0User } from "src/auth0/auth0User";
import { Auth0Service } from "src/auth0/auth0.service";
import { GetPlayersResponse } from "src/grpc/player/player.interface";
import { Convention, GetConventionsResponse } from "../grpc/convention/convention";
// import { Convention, GetConventionsResponse } from '@graphql/types/convention';

@Resolver()
export class GraphQLResolver {

  constructor(
    private readonly graphqlService: GraphQLService,
    private readonly footballService: FootballService,
    private readonly auth0Service: Auth0Service
  ) {}

  @Query(() => String)
  status(): string {
    return 'OK';
  }

  @Query(() => [FootballAPIPlayer], { name: "footballAPIPlayers"})
  footballAPIPlayers(
    @Args("season") season: number,
    @Args("teamId") teamId: number,
    @Args("page") page: number
  ): Promise<FootballAPIPlayer[]> {
    return this.footballService.fetchPlayers(season, teamId, page);
  }

  @Query(() => [Auth0User], {name: "auth0Users"})
  auth0Users(): Promise<Auth0User[]> {
    return this.auth0Service.fetchAuth0User();
  }

  @Query(() => GetPlayersResponse, { name: "getPlayers" })
  getPlayers(
    @Args("page") page: number
  ): Promise<GetPlayersResponse> {
    return this.graphqlService.getPlayers(page);
  }

  @Query(() => GetConventionsResponse, { name: "getConventions" })
  async getConventions(
    @Args("page") page: number
  ): Promise<GetConventionsResponse> {
    const response = await this.graphqlService.getConventions(page);
    const resConventions: Convention[] = [];
    response.conventions.map((convention) => {
      resConventions.push(new Convention(
        convention.conventionId,
        convention.conventionName,
        convention.heldDate
      ))
    });

    return new GetConventionsResponse(
      response.page,
      response.total,
      resConventions
    )
  }

  @Mutation(() => String)
  async createSquad(
    @Args('teamId') teamId: string,
    @Args('playerId') playerId: string
  ): Promise<string> {
    const result = await this.graphqlService.createSquad(teamId, playerId);
    return result.squadId;
  }

  @Mutation(() => String)
  async createPlayer(
    @Args('footballapiPlayerId') footballapiPlayerId: string,
    @Args('footballapiTeamId') footballapiTeamId: string,
    @Args('playerName') playerName: string,
    @Args('teamAuth0UserId') teamAuth0UserId: string,
    @Args('birthDate') birthDate: string,
    @Args('nationality') nationality: string,
    @Args('height') height: string,
    @Args('weight') weight: string
  ): Promise<string> {
    console.log('create player %o', {
      footballapiPlayerId,
      footballapiTeamId,
      playerName,
      teamAuth0UserId,
      birthDate,
      nationality,
      height,
      weight
    });
    const result = await this.graphqlService.createPlayer(
      footballapiPlayerId,
      footballapiTeamId,
      playerName,
      teamAuth0UserId,
      birthDate,
      nationality,
      height,
      weight
    )
    return result.playerId;
  }
}