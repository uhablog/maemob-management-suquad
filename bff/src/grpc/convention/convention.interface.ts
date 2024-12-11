import { Observable } from 'rxjs';

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

export interface ConventionsService {
  getConventions(data: GetConventionsRequest): Observable<GetConventionsResponse>
}
