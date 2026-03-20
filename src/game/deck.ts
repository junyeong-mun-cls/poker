import { Card, Rank, Suit } from "./types";


// 덱 생성
export function createDeck(): Card[] {
    const suits: Suit[] = ['HEARTS', 'DIAMONDS', 'CLUBS', 'SPADES'];
    const ranks: Rank[] = [
        '2', '3', '4', '5', '6', '7', '8', '9', '10',
        'J', 'Q', 'K', 'A'
    ];

    const deck: Card[] = [];

    for (const suit of suits) {
        for (const rank of ranks) {
            deck.push({ suit, rank });
        }
    }

    return deck;
}

// 셔플 (Fisher-Yates)
export function shuffle(deck: Card[]): Card[] {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}

// 카드 뽑기
export function draw(deck: Card[]): Card {
    const card = deck.pop();
    if (!card) throw new Error('덱이 비었습니다');
    return card;
}