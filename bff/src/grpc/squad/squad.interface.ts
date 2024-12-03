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