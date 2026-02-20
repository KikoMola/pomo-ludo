export type Suit = 'hearts' | 'diamonds' | 'clubs' | 'spades';
export type CardValue = 'A' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K';

export interface Card {
    suit: Suit;
    value: CardValue;
    /** Valor numérico en blackjack: A=11 (se ajusta a 1 en la lógica del juego), J/Q/K=10 */
    numericValue: number;
}

export const SUIT_ICON: Record<Suit, string> = {
    hearts: '/img/corazon.svg',
    diamonds: '/img/estrella.svg',
    clubs: '/img/trebol.svg',
    spades: '/img/pica.svg',
};

export const SUIT_COLOR: Record<Suit, 'red' | 'black'> = {
    hearts: 'red',
    diamonds: 'red',
    clubs: 'black',
    spades: 'black',
};
