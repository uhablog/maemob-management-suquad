import { Injectable } from '@nestjs/common';
import { GrpcClientService } from 'src/grpc/grpc-client.service';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class GraphQLService {
  constructor(private readonly grpcClientService: GrpcClientService){}

  async createSquad(team_id: string, player_id: string) {
    console.log(`graphql service team_id: ${team_id}, player_id: ${player_id}`);
    return lastValueFrom(this.grpcClientService.createSquad(team_id, player_id));
  }
}