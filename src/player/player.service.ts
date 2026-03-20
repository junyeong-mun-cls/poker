import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PlayerService {
    constructor(private prisma: PrismaService) { }

    async createUser(username: string, password: string) {
        const hashed = await bcrypt.hash(password, 10);

        return this.prisma.player.create({
            data: {
                username,
                password: hashed,
            },
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