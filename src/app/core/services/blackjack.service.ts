import { computed, inject, Injectable, signal } from '@angular/core';
import { Card } from '../models/card.model';
import { ChipDenomination, GamePhase, GameResult } from '../models/blackjack-game.model';
import { CardDeckService } from './card-deck.service';
import { UserService } from './user.service';

@Injectable({ providedIn: 'root' })
export class BlackjackService {
    private readonly deckService = inject(CardDeckService);
    private readonly userService = inject(UserService);

    readonly phase = signal<GamePhase>('idle');
    readonly playerCards = signal<Card[]>([]);
    readonly dealerCards = signal<Card[]>([]);
    readonly bet = signal<number>(0);
    readonly result = signal<GameResult | null>(null);
    readonly dealerRevealed = signal<boolean>(false);
    readonly message = signal<string>('');

    readonly playerScore = computed(() => this.calcScore(this.playerCards()));

    /**
     * Puntuación visible del crupier:
     * - Antes de revelar: sólo la carta boca arriba (índice 0).
     * - Después de revelar: score completo.
     */
    readonly dealerScore = computed(() => {
        if (!this.dealerRevealed()) {
            const upcard = this.dealerCards()[0];
            return upcard ? upcard.numericValue : 0;
        }
        return this.calcScore(this.dealerCards());
    });

    startBetting(): void {
        this.deckService.newDeck();
        this.playerCards.set([]);
        this.dealerCards.set([]);
        this.result.set(null);
        this.dealerRevealed.set(false);
        this.message.set('');
        this.bet.set(0);
        this.phase.set('betting');
    }

    addToBet(amount: ChipDenomination): void {
        if (this.phase() !== 'betting') return;
        if (this.userService.chips() < this.bet() + amount) return;
        this.bet.update(b => b + amount);
    }

    clearBet(): void {
        if (this.phase() !== 'betting') return;
        this.bet.set(0);
    }

    deal(): void {
        if (this.phase() !== 'betting' || this.bet() === 0) return;
        this.userService.spendChips(this.bet());

        // Orden de reparto: J1, C1(boca arriba), J2, C2(hole/boca abajo)
        const p1 = this.deckService.deal()!;
        const d1 = this.deckService.deal()!; // upcard (visible)
        const p2 = this.deckService.deal()!;
        const d2 = this.deckService.deal()!; // hole card (oculta)

        this.playerCards.set([p1, p2]);
        this.dealerCards.set([d1, d2]);
        this.phase.set('playing');

        // Blackjack natural (21 con 2 cartas)
        const playerBJ = this.calcScore([p1, p2]) === 21;
        const dealerBJ = this.calcScore([d1, d2]) === 21;

        if (playerBJ) {
            this.dealerRevealed.set(true);
            if (dealerBJ) {
                this.finalize('push', 'Los dos tenéis Blackjack. ¡Empate!');
            } else {
                this.finalize('blackjack', '¡Blackjack! Ganas 1.5× tu apuesta.');
            }
        }
    }

    hit(): void {
        if (this.phase() !== 'playing') return;
        const card = this.deckService.deal();
        if (!card) return;
        this.playerCards.update(cards => [...cards, card]);
        if (this.calcScore(this.playerCards()) > 21) {
            this.dealerRevealed.set(true);
            this.finalize('lose', '¡Te has pasado de 21!');
        }
    }

    stand(): void {
        if (this.phase() !== 'playing') return;
        this.dealerPlay();
    }

    doubleDown(): void {
        if (this.phase() !== 'playing' || this.playerCards().length !== 2) return;
        if (this.userService.chips() < this.bet()) return;

        this.userService.spendChips(this.bet());
        this.bet.update(b => b * 2);

        const card = this.deckService.deal();
        if (card) this.playerCards.update(cards => [...cards, card]);

        if (this.calcScore(this.playerCards()) > 21) {
            this.dealerRevealed.set(true);
            this.finalize('lose', '¡Te has pasado después de doblar!');
        } else {
            this.dealerPlay();
        }
    }

    // ── Lógica interna ───────────────────────────────────────────────

    private dealerPlay(): void {
        this.dealerRevealed.set(true);

        // El crupier pide carta hasta alcanzar 17 o más (stand on all 17s)
        while (this.calcScore(this.dealerCards()) < 17) {
            const card = this.deckService.deal();
            if (!card) break;
            this.dealerCards.update(cards => [...cards, card]);
        }

        const player = this.calcScore(this.playerCards());
        const dealer = this.calcScore(this.dealerCards());

        if (dealer > 21) {
            this.finalize('win', '¡El crupier se ha pasado! Ganas.');
        } else if (player > dealer) {
            this.finalize('win', '¡Ganas! Tu puntuación supera al crupier.');
        } else if (player === dealer) {
            this.finalize('push', 'Empate. Se te devuelve la apuesta.');
        } else {
            this.finalize('lose', 'El crupier gana. ¡Más suerte la próxima vez!');
        }
    }

    private finalize(result: GameResult, message: string): void {
        this.result.set(result);
        this.message.set(message);
        this.phase.set('result');
        const payout = this.calcPayout(result);
        if (payout > 0) {
            this.userService.addChips(payout);
        }
    }

    private calcPayout(result: GameResult): number {
        const bet = this.bet();
        switch (result) {
            case 'blackjack':
                return bet + Math.floor(bet * 1.5); // devuelve apuesta + 1.5x
            case 'win':
                return bet * 2; // devuelve apuesta + ganancia
            case 'push':
                return bet; // devuelve solo la apuesta
            case 'lose':
                return 0;
        }
    }

    /** Calcula la puntuación de una mano, ajustando ases de 11→1 si hay bust. */
    calcScore(cards: Card[]): number {
        let score = 0;
        let aces = 0;
        for (const card of cards) {
            score += card.numericValue;
            if (card.value === 'A') aces++;
        }
        while (score > 21 && aces > 0) {
            score -= 10;
            aces--;
        }
        return score;
    }
}
