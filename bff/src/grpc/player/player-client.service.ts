import { Inject, Injectable } from '@nestjs/common';
import { CreatePlayerResponse, PlayerService } from './player.interface';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class PlayerClientService {
  private playerService: PlayerService;

  constructor(@Inject('SQUAD_SERVICE') private client: ClientGrpc){}

  onModuleInit() {
    this.playerService = this.client.getService<PlayerService>('PlayerService');
  }

  createPlayer(
    footballapiPlayerId: string,
    footballapiTeamId: string,
    playerName: string,
    teamAuth0UserId: string,
    birthDate: string,
    nationality: string,
    height: string,
    weight: string
  ): Observable<CreatePlayerResponse> {
    return this.playerService.createPlayer({
      footballapiPlayerId,
      footballapiTeamId,
      playerName,
      teamAuth0UserId,
      birthDate,
      nationality,
      height,
      weight
    })
  }
}