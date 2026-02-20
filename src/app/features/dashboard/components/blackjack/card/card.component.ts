import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { Card, SUIT_COLOR, SUIT_ICON } from '../../../../../core/models/card.model';

@Component({
    selector: 'app-card',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './card.component.html',
})
export class CardComponent {
    readonly card = input.required<Card>();
    readonly faceDown = input<boolean>(false);
    readonly compact = input<boolean>(false);

    readonly isRed = computed(() => SUIT_COLOR[this.card().suit] === 'red');
    readonly suitIcon = computed(() => SUIT_ICON[this.card().suit]);
    readonly value = computed(() => this.card().value);

    readonly articleClass = computed(() => {
        const base =
            'relative flex flex-col justify-between rounded-2xl border select-none shadow-lg transition-all duration-200';
        const size = this.compact()
            ? 'w-14 h-20 sm:w-16 sm:h-24 p-1.5'
            : 'w-28 h-40 sm:w-32 sm:h-44 p-2.5';
        const look = this.faceDown()
            ? 'bg-indigo-800 dark:bg-indigo-950 border-indigo-600 overflow-hidden'
            : 'bg-white border-stone-200 shadow-stone-300/30';
        return `${base} ${size} ${look}`;
    });

    readonly cornerClass = computed(() => {
        const layout = this.compact()
            ? 'flex flex-col items-center leading-none w-4'
            : 'flex flex-col items-center leading-none w-7';
        const color = this.isRed() ? 'text-red-600' : 'text-stone-900';
        return `${layout} ${color}`;
    });

    readonly valueClass = computed(() =>
        this.compact() ? 'text-xs font-black leading-none' : 'text-base font-black leading-none',
    );

    readonly suitSmallClass = computed(() => (this.compact() ? 'w-2.5 h-2.5' : 'w-4 h-4 mt-0.5'));

    readonly suitLargeClass = computed(() =>
        this.compact() ? 'w-9 h-9 opacity-10' : 'w-14 h-14 sm:w-16 sm:h-16 opacity-10',
    );

    /** Array fijo para el patrón de puntos del reverso de la carta. */
    readonly dotArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
}
