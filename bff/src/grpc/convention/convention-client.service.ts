import { Inject, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ConventionsService, GetConventionsResponse } from './convention.interface';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class ConventionClientService {

  private conventionsService: ConventionsService;

  constructor(@Inject('SQUAD_SERVICE') private client: ClientGrpc) {}

  onModuleInit() {
    this.conventionsService = this.client.getService<ConventionsService>('ConventionsService');
  }

  getConventions(page: number): Observable<GetConventionsResponse> {
    return this.conventionsService.getConventions({
      page
    });
  }
}