import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { CreateSquadResponse, SquadService } from './squad.interface';
import { Observable } from 'rxjs';

@Injectable()
export class SquadClientService {
  private squadService: SquadService;

  constructor(@Inject('SQUAD_SERVICE') private client: ClientGrpc){}

  onModuleInit() {
    this.squadService = this.client.getService<SquadService>('SquadService');
  }

  createSquad(teamId: string, playerId: string): Observable<CreateSquadResponse> {
    console.log(`grpc client team_id: ${teamId}, player_id: ${playerId}`);
    return this.squadService.createSquad({
      teamId,
      playerId
    });
  }
}
