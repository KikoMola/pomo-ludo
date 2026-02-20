import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { NgpButton } from 'ng-primitives/button';
import { LucideAngularModule, Shuffle } from 'lucide-angular';
import { CardDeckService } from '../../../../core/services/card-deck.service';
import { Card } from '../../../../core/models/card.model';
import { CardComponent } from './card/card.component';

@Component({
    selector: 'app-blackjack',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [NgpButton, LucideAngularModule, CardComponent],
    templateUrl: 'blackjack.component.html',
})
export class BlackjackComponent {
    private readonly deckService = inject(CardDeckService);

    readonly currentCard = signal<Card | null>(null);

    readonly Shuffle = Shuffle;

    dealCard(): void {
        this.currentCard.set(this.deckService.randomCard());
    }
}
