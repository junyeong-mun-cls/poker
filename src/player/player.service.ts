import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PlayerService {
  constructor(private prisma: PrismaService) {}

  async createUser(username: string, password: string) {
    return this.prisma.player.create({
      data: { username, password },
    });
  }

  async findByUsername(username: string) {
    return this.prisma.player.findUnique({
      where: { username },
    });
  }

  async addBalance(playerId: string, amount: number) {
    return this.prisma.player.update({
      where: { id: playerId },
      data: { balance: { increment: amount } },
    });
  }
}