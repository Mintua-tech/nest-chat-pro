import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';


@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}

  async createUser(username: string) {
    return this.prisma.user.upsert({
      where: { username },
      update: {},
      create: { username },
    });
  }

  async createRoom(name: string) {
    return this.prisma.room.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  async saveMessage(userId: number, roomId: number, text: string) {
    return this.prisma.message.create({
      data: {
        text,
        userId,
        roomId,
      },
      include: { user: true, room: true },
    });
  }

  async getRoomMessages(roomId: number, limit = 50) {
    return this.prisma.message.findMany({
      where: { roomId },
      include: { user: true },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
  }
}
