import { create } from "zustand";
import { saveGameHistory, getGameHistory, GameHistoryEntry } from "../utils/localStorage";

interface Card {
  id: number;
  image: string;
  matched: boolean;
  revealed: boolean;
}

interface GameState {
  cards: Card[];
  revealedCards: number[];
  attempts: number;
  timer: number;
  gameOver: boolean;
  difficulty: string;
  timerInterval: ReturnType<typeof setInterval> | null;
  gameHistory: GameHistoryEntry[];
  startGame: (level: number) => void;
  flipCard: (id: number) => void;
  resetGame: () => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  cards: [],
  revealedCards: [],
  attempts: 0,
  timer: 0,
  gameOver: false,
  difficulty: "easy",
  timerInterval: null,
  gameHistory: getGameHistory(),

  startGame: (level) => {
    const totalCards = level * 4;
    const images = Array.from(
      { length: totalCards / 2 },
      (_, i) => `/images/img${i + 1}.jpg`
    );

    const shuffledCards = [...images, ...images]
      .sort(() => Math.random() - 0.5)
      .map((image, index) => ({
        id: index,
        image,
        matched: false,
        revealed: false,
      }));

    const prevInterval = get().timerInterval;
    if (prevInterval !== null) clearInterval(prevInterval);

    const interval = setInterval(() => {
      set((state) => ({ timer: state.timer + 1 }));
    }, 1000);

    set({
      cards: shuffledCards,
      revealedCards: [],
      attempts: 0,
      timer: 0,
      gameOver: false,
      difficulty: level === 4 ? "easy" : level === 6 ? "medium" : "hard",
      timerInterval: interval,
    });
  },

  flipCard: (id) => {
    set((state) => {
      if (state.revealedCards.length === 2) return state;

      const cards = state.cards.map((card) =>
        card.id === id ? { ...card, revealed: true } : card
      );

      const revealedCards = [...state.revealedCards, id];
      let attempts = state.attempts;

      if (revealedCards.length === 2) {
        attempts++;
        if (cards[revealedCards[0]].image === cards[revealedCards[1]].image) {
          cards[revealedCards[0]].matched = true;
          cards[revealedCards[1]].matched = true;
          const allMatched = cards.every((card) => card.matched);
          if (allMatched) {
            const finalTime = get().timer; 
            const prevInterval = get().timerInterval;
            if (prevInterval !== null) clearInterval(prevInterval);

            setTimeout(() => {
              set({ gameOver: true, timerInterval: null });

              saveGameHistory({
                attempts,
                duration: finalTime,
                date: new Date().toISOString(),
              });
              set({ gameHistory: getGameHistory() });
            }, 500);
          }
          return { cards, revealedCards: [], attempts };
        } else {
          setTimeout(() => {
            set((state) => ({
              cards: state.cards.map((card) =>
                revealedCards.includes(card.id)
                  ? { ...card, revealed: false }
                  : card
              ),
              revealedCards: [],
            }));
          }, 1000);
        }
      }

      return { cards, revealedCards, attempts };
    });
  },

  resetGame: () => {
    const prevInterval = get().timerInterval;
    if (prevInterval !== null) clearInterval(prevInterval);
    set({
      cards: [],
      revealedCards: [],
      attempts: 0,
      timer: 0,
      gameOver: false,
      difficulty: "easy",
      timerInterval: null,
    });
  },
}));
