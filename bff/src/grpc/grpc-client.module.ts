import { Module } from '@nestjs/common';
import { ClientsModule, Transport} from '@nestjs/microservices';
import { join } from 'path';
import { SquadClientService } from './squad/squad-client.service';
import { PlayerClientService } from './player/player-client.service';
import { ConventionClientService } from './convention/convention-client.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    ClientsModule.registerAsync([
      {
        name: "SQUAD_SERVICE",
        imports: [ ConfigModule ],
        inject: [ ConfigService ],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            package: 'squadservice',
            protoPath: join(__dirname, 'proto', 'squad-service.proto'),
            url: configService.get<string>('GRPC_SQUAD_SERVICE_URL'),
          }
        })
      }
    ])
  ],
  providers: [
    SquadClientService,
    PlayerClientService,
    ConventionClientService
  ],
  exports: [
    SquadClientService,
    PlayerClientService,
    ConventionClientService
  ]
})

export class GrpcClientModule {}
