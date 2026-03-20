import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { PlayerModule } from './player/player.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { GameService } from './game/game.service';
import { GameController } from './game/game.controller';
import { GameModule } from './game/game.module';


@Module({
  imports: [ConfigModule.forRoot(),PrismaModule, PlayerModule, AuthModule, GameModule],
  controllers: [AppController, GameController],
  providers: [AppService, GameService],
})
export class AppModule {}
