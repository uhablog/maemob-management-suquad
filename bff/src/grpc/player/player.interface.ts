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

export interface PlayerService {
  createPlayer(data: CreatePlayerRequest): Observable<CreatePlayerResponse>;
}
