import { Controller, Post, Body } from '@nestjs/common';
import { PlayerService } from './player.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { RolesGuard } from '../auth/roles/roles.guard';

@Controller('player')
export class PlayerController {
  constructor(private playerService: PlayerService) {}

  @Post('create')
  create(@Body() body: { username: string; password: string }) {
    return this.playerService.createUser(body.username, body.password);
  }

  @Post('add-balance')
  @UseGuards(JwtAuthGuard, RolesGuard)
  addBalance(@Body() body: { playerId: string; amount: number }) {
    return this.playerService.addBalance(body.playerId, body.amount);
  }
}