import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { NgpButton } from 'ng-primitives/button';
import {
    LucideAngularModule,
    Plus,
    Hand,
    TrendingUp,
    RotateCcw,
    Play,
    Coins,
    Spade,
} from 'lucide-angular';
import { BlackjackService } from '../../../../core/services/blackjack.service';
import { UserService } from '../../../../core/services/user.service';
import { ChipDenomination, CHIP_DENOMINATIONS } from '../../../../core/models/blackjack-game.model';
import { CardComponent } from './card/card.component';
import { ChipComponent } from './chip/chip.component';

@Component({
    selector: 'app-blackjack',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [NgpButton, LucideAngularModule, CardComponent, ChipComponent],
    templateUrl: './blackjack.component.html',
})
export class BlackjackComponent {
    readonly gameService = inject(BlackjackService);
    readonly userService = inject(UserService);

    readonly CHIP_DENOMINATIONS = CHIP_DENOMINATIONS;

    readonly canDoubleDown = computed(
        () =>
            this.gameService.phase() === 'playing' &&
            this.gameService.playerCards().length === 2 &&
            this.userService.chips() >= this.gameService.bet(),
    );

    readonly playerScoreClass = computed(() => {
        const score = this.gameService.playerScore();
        const cards = this.gameService.playerCards().length;
        const base = 'text-sm font-black tabular-nums';
        if (score > 21) return `${base} text-red-500`;
        if (score === 21 && cards === 2) return `${base} text-emerald-600 dark:text-emerald-400`;
        return `${base} text-stone-700 dark:text-stone-200`;
    });

    /** Configuración visual del resultado (banner, etiqueta, detalle). */
    readonly resultConfig = computed(() => {
        const result = this.gameService.result();
        const bet = this.gameService.bet();
        if (!result) return null;

        const map = {
            blackjack: {
                bannerClass:
                    'bg-amber-100 dark:bg-amber-900/40 border-amber-300 dark:border-amber-700 text-amber-900 dark:text-amber-100',
                label: '¡BLACKJACK! 🎰',
                detail: `+${Math.floor(bet * 1.5)} fichas de ganancia`,
            },
            win: {
                bannerClass:
                    'bg-emerald-100 dark:bg-emerald-900/40 border-emerald-300 dark:border-emerald-700 text-emerald-900 dark:text-emerald-100',
                label: '¡GANAS! ✅',
                detail: `+${bet} fichas de ganancia`,
            },
            push: {
                bannerClass:
                    'bg-stone-100 dark:bg-stone-800 border-stone-300 dark:border-stone-600 text-stone-700 dark:text-stone-300',
                label: 'EMPATE 🤝',
                detail: 'Se te devuelve la apuesta',
            },
            lose: {
                bannerClass:
                    'bg-red-100 dark:bg-red-900/40 border-red-300 dark:border-red-700 text-red-900 dark:text-red-100',
                label: '¡PIERDES! ❌',
                detail: `-${bet} fichas`,
            },
        };
        return map[result];
    });

    readonly Plus = Plus;
    readonly Hand = Hand;
    readonly TrendingUp = TrendingUp;
    readonly RotateCcw = RotateCcw;
    readonly Play = Play;
    readonly Coins = Coins;
    readonly Spade = Spade;

    addToBet(denom: ChipDenomination): void {
        this.gameService.addToBet(denom);
    }
}
