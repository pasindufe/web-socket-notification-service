import { Module } from '@nestjs/common';
import { MessageGatewayService } from './message.gateway.service';

@Module({
  imports: [],
  controllers: [],
  providers: [MessageGatewayService],
})
export class AppModule {}
