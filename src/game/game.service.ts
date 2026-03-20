import { Injectable } from '@nestjs/common';
import { createDeck, shuffle, draw } from './deck';
import { Card, GameState, HandResult, PlayerState, rankValue } from './types';

@Injectable()
export class GameService {
    createGame(playerIds: string[]) {
        let deck = createDeck();
        deck = shuffle(deck);

        // 플레이어 초기화
        const players: PlayerState[] = playerIds.map(id => ({
            id,
            hiddenCards: [],
            openCards: [],
            folded: false,
        }));

        // 2장 hidden + 1장 open
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

    nextPhase(game: GameState) {
        switch (game.phase) {
            case 'THIRD_STREET':
                this.dealOpen(game);
                game.phase = 'FOURTH_STREET';
                break;

            case 'FOURTH_STREET':
                this.dealOpen(game);
                game.phase = 'FIFTH_STREET';
                break;

            case 'FIFTH_STREET':
                this.dealOpen(game);
                game.phase = 'SIXTH_STREET';
                break;

            case 'SIXTH_STREET':
                this.dealHidden(game);
                game.phase = 'SEVENTH_STREET';
                break;

            case 'SEVENTH_STREET':
                game.phase = 'SHOWDOWN';
                break;

            default:
                break;
        }

        return game;
    }

    dealOpen(game: GameState) {
        for (const player of game.players) {
            if (!player.folded) {
                player.openCards.push(draw(game.deck));
            }
        }
    }

    dealHidden(game: GameState) {
        for (const player of game.players) {
            if (!player.folded) {
                player.hiddenCards.push(draw(game.deck));
            }
        }
    }

    evaluateHand(cards: Card[]) {
        const ranks = cards.map(c => rankValue[c.rank]).sort((a, b) => b - a);
        const suits = cards.map(c => c.suit);

        const isFlush = suits.every(s => s === suits[0]);

        const isStraight = this.isStraight(ranks);

        const counts = this.getCounts(ranks);

        if (isStraight && isFlush) return { rank: 8, name: 'Straight Flush' };
        if (counts.includes(4)) return { rank: 7, name: 'Four of a Kind' };
        if (counts.includes(3) && counts.includes(2)) return { rank: 6, name: 'Full House' };
        if (isFlush) return { rank: 5, name: 'Flush' };
        if (isStraight) return { rank: 4, name: 'Straight' };
        if (counts.includes(3)) return { rank: 3, name: 'Three of a Kind' };
        if (counts.filter(c => c === 2).length === 2) return { rank: 2, name: 'Two Pair' };
        if (counts.includes(2)) return { rank: 1, name: 'One Pair' };

        return { rank: 0, name: 'High Card' };
    }

    getCounts(ranks: number[]): number[] {
        const map: Record<number, number> = {};

        for (const r of ranks) {
            map[r] = (map[r] || 0) + 1;
        }

        return Object.values(map);
    }

    isStraight(ranks: number[]): boolean {
        const unique = [...new Set(ranks)];

        for (let i = 0; i < unique.length - 4; i++) {
            if (
                unique[i] - 1 === unique[i + 1] &&
                unique[i] - 2 === unique[i + 2] &&
                unique[i] - 3 === unique[i + 3] &&
                unique[i] - 4 === unique[i + 4]
            ) {
                return true;
            }
        }

        return false;
    }

    getCombinations(cards: Card[], k = 5): Card[][] {
        const result: Card[][] = [];

        const combine = (start: number, path: Card[]) => {
            if (path.length === k) {
                result.push(path);
                return;
            }

            for (let i = start; i < cards.length; i++) {
                combine(i + 1, [...path, cards[i]]);
            }
        };

        combine(0, []);
        return result;
    }

    getBestHand(player: PlayerState) {
        const allCards = [...player.hiddenCards, ...player.openCards];

        const combos = this.getCombinations(allCards, 5);

        let best: HandResult | null = null;

        for (const combo of combos) {
            const hand = this.evaluateHand(combo);

            if (!best || hand.rank > best.rank) {
                best = hand;
            }
        }

        return best;
    }
}