import { OnModuleInit } from '@nestjs/common';
import { ChatService } from './chat.service';

import { Server, Socket } from 'socket.io';
import { PrismaService } from '../prisma.service';

export class ChatGateway implements OnModuleInit {
  io: Server;
  constructor(private chatService: ChatService, private prisma: PrismaService) {}

  onModuleInit() {
    // Nothing — socket.io server is attached in main.ts to http server and adapter set.
    // We'll access it via global 'socket.io' instance if needed. For simplicity we assume socket.io instance exists on http server.
  }

  // We'll use a small pattern: we'll attach handlers in main flow by hooking into io on connection
}
