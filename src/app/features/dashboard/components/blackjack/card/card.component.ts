import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { Card, SUIT_COLOR, SUIT_ICON } from '../../../../../core/models/card.model';

@Component({
    selector: 'app-card',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './card.component.html',
})
export class CardComponent {
    readonly card = input.required<Card>();

    readonly isRed = computed(() => SUIT_COLOR[this.card().suit] === 'red');
    readonly suitIcon = computed(() => SUIT_ICON[this.card().suit]);
    readonly value = computed(() => this.card().value);
}
