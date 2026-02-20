export type GamePhase = 'idle' | 'betting' | 'playing' | 'result';
export type GameResult = 'blackjack' | 'win' | 'push' | 'lose';
export type ChipDenomination = 1 | 2 | 5 | 10;

export const CHIP_DENOMINATIONS: ChipDenomination[] = [1, 2, 5, 10];

/** Color fill del SVG de la ficha según denominación. */
export const CHIP_COLOR: Record<ChipDenomination, string> = {
    1: '#ef4444', // rojo
    2: '#eab308', // amarillo
    5: '#22c55e', // verde
    10: '#3b82f6', // azul
};
