import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ChatGateway } from './chat/chat.gateway';
import { ChatService } from './chat/chat.service';

@Module({
  imports: [],
  providers: [PrismaService, ChatGateway, ChatService],
})
export class AppModule {}

