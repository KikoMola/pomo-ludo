import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { CHIP_COLOR, ChipDenomination } from '../../../../../core/models/blackjack-game.model';

@Component({
    selector: 'app-chip',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './chip.component.html',
})
export class ChipComponent {
    readonly denomination = input.required<ChipDenomination>();
    readonly size = input<number>(52);

    readonly color = computed(() => CHIP_COLOR[this.denomination()]);
}
