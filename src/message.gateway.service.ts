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

  @SubscribeMessage('response')
  handleMessage(@MessageBody() response: WebSocketClientResponse) {
    this.server.emit('response', response);
  }
}
