import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { PlayerClientService } from 'src/grpc/player/player-client.service';
import { SquadClientService } from 'src/grpc/squad/squad-client.service';

@Injectable()
export class GraphQLService {

  constructor(
    private readonly squadClientService: SquadClientService,
    private readonly playerClientService: PlayerClientService
  ){}

  async createSquad(team_id: string, player_id: string) {
    console.log(`graphql service team_id: ${team_id}, player_id: ${player_id}`);
    return lastValueFrom(this.squadClientService.createSquad(team_id, player_id));
  }

  async createPlayer(
    footballapiPlayerId: string,
    footballapiTeamId: string,
    playerName: string,
    teamAuth0UserId: string,
    birthDate: string,
    nationality: string,
    height: string,
    weight: string
  ) {
    return lastValueFrom(this.playerClientService.createPlayer(
      footballapiPlayerId,
      footballapiTeamId,
      playerName,
      teamAuth0UserId,
      birthDate,
      nationality,
      height,
      weight
    ))
  }
}