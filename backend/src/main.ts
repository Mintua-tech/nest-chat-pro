import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import Redis from 'ioredis';
import { ChatService } from './chat/chat.service';
import { Server as HttpServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { createAdapter } from '@socket.io/redis-adapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({ origin: true, credentials: true });

  // Redis clients
  const pubClient = new Redis({
    host: process.env.REDIS_HOST || 'redis',
    port: Number(process.env.REDIS_PORT || 6379),
  });

  const subClient = pubClient.duplicate();

  pubClient.on('error', (err) => console.error('Redis Pub Error:', err));
  subClient.on('error', (err) => console.error('Redis Sub Error:', err));

  await Promise.all([
    pubClient.connect().catch((err) => console.error('Pub Redis Connect Error:', err)),
    subClient.connect().catch((err) => console.error('Sub Redis Connect Error:', err)),
  ]);

  // Socket.IO
  const server: HttpServer = app.getHttpServer();
  const io = new SocketIOServer(server, { cors: { origin: '*' } });
  io.adapter(createAdapter(pubClient, subClient));

  // Chat handlers
  io.on('connection', (socket) => {
    console.log('[socket] connected', socket.id);

    socket.on('joinRoom', async ({ username, room }) => {
      try {
        const chatService = app.get(ChatService);
        const user = await chatService.createUser(username);
        const roomEntity = await chatService.createRoom(room);

        socket.join(`room:${roomEntity.id}`);
        socket.data.user = user;
        socket.data.room = roomEntity;

        socket.to(`room:${roomEntity.id}`).emit('userJoined', { user: user.username, id: user.id });

        const messages = await chatService.getRoomMessages(roomEntity.id, 50);
        socket.emit('roomMessages', messages.reverse());
      } catch (err) {
        console.error('joinRoom error', err);
      }
    });

    socket.on('message', async ({ text }) => {
      try {
        const chatService = app.get(ChatService);
        const user = socket.data.user;
        const room = socket.data.room;
        if (!user || !room) return;

        const saved = await chatService.saveMessage(user.id, room.id, text);
        io.to(`room:${room.id}`).emit('message', saved);
      } catch (err) {
        console.error('message error', err);
      }
    });

    socket.on('disconnect', () => console.log('[socket] disconnected', socket.id));
  });

  await app.listen(Number(process.env.PORT || 3000), '0.0.0.0');
  console.log(`Server running on port ${process.env.PORT || 3000}`);
}

bootstrap();
