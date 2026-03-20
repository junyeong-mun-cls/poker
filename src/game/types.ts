export interface PlayerState {
    id: string;
    hiddenCards: Card[];
    openCards: Card[];
    folded: boolean;
}


export interface GameState {
    players: PlayerState[];
    deck: Card[];
    currentTurn: number;
    phase: GamePhase;
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