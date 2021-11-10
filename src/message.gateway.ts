import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { WebSocketClientResponse } from './web-socket-client-response';

@WebSocketGateway({ cors: true })
export class MessageGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server;

  users = 0;

  async handleConnection() {
    // A client has connected
    this.users++;
    // Notify connected clients of current users
    console.log('1');
    this.server.emit('users', this.users);
  }
  async handleDisconnect() {
    // A client has disconnected
    this.users--;
    console.log('2');

    // Notify connected clients of current users
    this.server.emit('users', this.users);
  }

  @SubscribeMessage('response')
  handleMessage(@MessageBody() response: WebSocketClientResponse) {
    console.log(response);
    this.server.emit('response', response);
  }
}
