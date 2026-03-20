export interface PlayerState {
    id: string;
    hiddenCards: Card[];
    openCards: Card[];
    folded: boolean;

    balance: number;     // 가진 돈
    currentBet: number;  // 이번 라운드에서 낸 돈
}

export interface GameState {
    players: PlayerState[];
    deck: Card[];
    currentTurn: number;
    phase: GamePhase;

    pot: number;         // 총 판돈
    baseBet: number;     // 방에서 설정한 기준 금액
}

export type GamePhase =
    | 'THIRD_STREET'
    | 'FOURTH_STREET'
    | 'FIFTH_STREET'
    | 'SIXTH_STREET'
    | 'SEVENTH_STREET'
    | 'SHOWDOWN';


export interface HandResult {
    rank: number;
    name: string;
}

export type Suit = 'HEARTS' | 'DIAMONDS' | 'CLUBS' | 'SPADES';
export type Rank =
    | '2' | '3' | '4' | '5' | '6'
    | '7' | '8' | '9' | '10'
    | 'J' | 'Q' | 'K' | 'A';

export interface Card {
    suit: Suit;
    rank: Rank;
}

export const rankValue: Record<Rank, number> = {
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5,
    '6': 6,
    '7': 7,
    '8': 8,
    '9': 9,
    '10': 10,
    J: 11,
    Q: 12,
    K: 13,
    A: 14,
};