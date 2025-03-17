import { create } from "zustand";

interface GameState {
  cards: { id: number; image: string; matched: boolean }[];
  revealedCards: number[];
  attempts: number;
  timer: number;
  gameOver: boolean;
  startGame: (level: number) => void;
  flipCard: (id: number) => void;
  resetGame: () => void;
}

export const useGameStore = create<GameState>((set) => ({
  cards: [],
  revealedCards: [],
  attempts: 0,
  timer: 0,
  gameOver: false,

  startGame: (level) => {
    const totalCards = level * 4;
    const images = Array.from(
      { length: totalCards / 2 },
      (_, i) => `img${i + 1}`
    );
    const shuffledCards = [...images, ...images]
      .sort(() => Math.random() - 0.5)
      .map((image, index) => ({ id: index, image, matched: false }));
    set({
      cards: shuffledCards,
      revealedCards: [],
      attempts: 0,
      timer: 0,
      gameOver: false,
    });
  },

  flipCard: (id) => {
    set((state) => {
      if (state.revealedCards.length === 2) return state;
      const revealedCards = [...state.revealedCards, id];
      const cards = [...state.cards];
      let attempts = state.attempts;
      if (revealedCards.length === 2) {
        attempts++;
        if (cards[revealedCards[0]].image === cards[revealedCards[1]].image) {
          cards[revealedCards[0]].matched = true;
          cards[revealedCards[1]].matched = true;
        }
        setTimeout(() => set({ revealedCards: [] }), 1000);
      }
      return { cards, revealedCards, attempts };
    });
  },

  resetGame: () =>
    set({
      cards: [],
      revealedCards: [],
      attempts: 0,
      timer: 0,
      gameOver: false,
    }),
}));
