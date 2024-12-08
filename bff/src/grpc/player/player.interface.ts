import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Observable } from 'rxjs';

export interface CreatePlayerRequest {
  footballapiPlayerId: string
  footballapiTeamId: string
  playerName: string
  teamAuth0UserId: string
  birthDate: string
  nationality: string
  height: string
  weight: string
}

export interface CreatePlayerResponse {
  playerId: string
}

export interface GetPlayersRequest {
  page: number
}

@ObjectType()
export class GetPlayersResponse {

  @Field(() => Int)
  page: number

  @Field(() => Int)
  total: number

  @Field(() => [Player])
  players: Player[]
}

@ObjectType()
export class Player {

  @Field()
  playerId: string

  @Field()
  playerName: string
}

export interface PlayerService {
  createPlayer(data: CreatePlayerRequest): Observable<CreatePlayerResponse>;
  getPlayers(data: GetPlayersRequest): Observable<GetPlayersResponse>;
}
