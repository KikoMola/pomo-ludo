import { Injectable } from '@angular/core';
import { Card, CardValue, Suit } from '../models/card.model';

const SUITS: Suit[] = ['hearts', 'diamonds', 'clubs', 'spades'];
const VALUES: CardValue[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

@Injectable({ providedIn: 'root' })
export class CardDeckService {
    private deck: Card[] = [];

    /** Crea una baraja completa de 52 cartas y la baraja. */
    newDeck(): void {
        this.deck = this.buildShuffledDeck();
    }

    /** Extrae la siguiente carta de la baraja. Devuelve null si está vacía. */
    deal(): Card | null {
        return this.deck.pop() ?? null;
    }

    /** Número de cartas restantes en la baraja. */
    remaining(): number {
        return this.deck.length;
    }

    /** Genera una carta completamente aleatoria sin consumir la baraja. Útil para demos. */
    randomCard(): Card {
        const suit = SUITS[Math.floor(Math.random() * SUITS.length)];
        const value = VALUES[Math.floor(Math.random() * VALUES.length)];
        return this.buildCard(suit, value);
    }

    private buildShuffledDeck(): Card[] {
        const cards: Card[] = SUITS.flatMap(suit => VALUES.map(value => this.buildCard(suit, value)));
        // Fisher-Yates shuffle
        for (let i = cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cards[i], cards[j]] = [cards[j], cards[i]];
        }
        return cards;
    }

    private buildCard(suit: Suit, value: CardValue): Card {
        return { suit, value, numericValue: this.toNumericValue(value) };
    }

    private toNumericValue(value: CardValue): number {
        if (value === 'A') return 11;
        if (value === 'J' || value === 'Q' || value === 'K') return 10;
        return parseInt(value, 10);
    }
}
