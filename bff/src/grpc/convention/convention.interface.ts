import { Observable } from 'rxjs';

export interface ConventionsService {
  getConventions(data: GetConventionsRequest): Observable<GetConventionsResponse>
  getTeams(data: GetTeamsRequest): Observable<GetTeamsResponse>
}

export interface GetConventionsRequest {
  page: number;
}

export interface GetConventionsResponse {
  page: number;
  total: number;
  conventions: Convention[]
}

export interface Convention {
  conventionId: string
  conventionName: string
  heldDate: { seconds: number; nanos: number } //google.protobuf.Timestamp型
}


export interface GetTeamsRequest {
  conventionId: string
}

export interface GetTeamsResponse {
  teams: Team[]
}

export interface Team {
  teamId: string
  teamName: string
}
