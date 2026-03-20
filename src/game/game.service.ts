import { Injectable } from '@nestjs/common';
import { createDeck, shuffle, draw } from './deck';
import { PlayerState } from './types';

@Injectable()
export class GameService {
    createGame(playerIds: string[]) {
        let deck = createDeck();
        deck = shuffle(deck);

        // 🧩 플레이어 초기화
        const players: PlayerState[] = playerIds.map(id => ({
            id,
            hiddenCards: [],
            openCards: [],
            folded: false,
        }));

        // 🎴 2장 hidden + 1장 open
        for (const player of players) {
            player.hiddenCards.push(draw(deck));
            player.hiddenCards.push(draw(deck));
            player.openCards.push(draw(deck));
        }

        return {
            players,
            deck,
            currentTurn: 0,
            phase: 'THIRD_STREET', // 첫 단계
        };
    }
}