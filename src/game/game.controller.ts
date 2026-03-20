import { Controller, Post, Body } from '@nestjs/common';
import { GameService } from './game.service';

@Controller('game')
export class GameController {
    constructor(private gameService: GameService) { }

    @Post('start')
    startGame(@Body() body: { playerIds: string[] }) {
        return this.gameService.createGame(body.playerIds);
    }

    @Post('next')
    next(@Body() body: { game }) {
        return this.gameService.nextPhase(body.game);
    }
}