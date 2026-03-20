import { Controller, Post, Body } from '@nestjs/common';
import { PlayerService } from './player.service';

@Controller('player')
export class PlayerController {
  constructor(private playerService: PlayerService) {}

  @Post('create')
  create(@Body() body: { username: string; password: string }) {
    return this.playerService.createUser(body.username, body.password);
  }

  @Post('add-balance')
  addBalance(@Body() body: { playerId: string; amount: number }) {
    return this.playerService.addBalance(body.playerId, body.amount);
  }
}