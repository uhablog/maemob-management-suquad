import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';

export interface CreateSquadRequest {
  teamId: string
  playerId: string
}

export interface CreateSquadResponse {
  squadId: string
}

export interface SquadService {
  createSquad(data: CreateSquadRequest): Observable<CreateSquadResponse>;
}

@Injectable()
export class GrpcClientService {
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
