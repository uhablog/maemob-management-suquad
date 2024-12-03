import { Module } from '@nestjs/common';
import { ClientsModule, Transport} from '@nestjs/microservices';
import { join } from 'path';
import { SquadClientService } from './squad/squad-client.service';


@Module({
  imports: [
    ClientsModule.register([
      {
        name: "SQUAD_SERVICE",
        transport: Transport.GRPC,
        options: {
          package: 'squadservice',
          protoPath: join(__dirname, 'proto', 'squad-service.proto'),
          url: 'localhost:50051'
        }
      }
    ])
  ],
  providers: [SquadClientService],
  exports: [SquadClientService]
})

export class GrpcClientModule {}
