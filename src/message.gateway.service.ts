import { Logger } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { WebSocketClientResponse } from './web-socket-client-response';

@WebSocketGateway({ cors: true })
export class MessageGatewayService {
  @WebSocketServer() server;

  private readonly logger = new Logger(MessageGatewayService.name);

  @SubscribeMessage('response')
  handleMessage(@MessageBody() response: WebSocketClientResponse) {
    try {
      this.server.emit('response', response);
    } catch (ex) {
      this.logger.error(ex);
    }
  }
}
