import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { ConventionClientService } from 'src/grpc/convention/convention-client.service';
import { PlayerClientService } from 'src/grpc/player/player-client.service';
import { SquadClientService } from 'src/grpc/squad/squad-client.service';

@Injectable()
export class GraphQLService {

  constructor(
    private readonly squadClientService: SquadClientService,
    private readonly playerClientService: PlayerClientService,
    private readonly conventionClientService: ConventionClientService
  ){}

  async createSquad(team_id: string, player_id: string) {
    console.log(`graphql service team_id: ${team_id}, player_id: ${player_id}`);
    return lastValueFrom(this.squadClientService.createSquad(team_id, player_id));
  }

  async getPlayers(page: number) {
    console.log(`get players`);
    return lastValueFrom(this.playerClientService.getPlayers(page));
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
    ));
  }

  async getConventions(page: number) {
    console.log(`get conventions page: ${page}`);
    return lastValueFrom(this.conventionClientService.getConventions(page));
  }

  async getTeams(conventionId: string) {
    return lastValueFrom(this.conventionClientService.getTeams(conventionId));
  }
}