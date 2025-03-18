export type GameHistoryEntry = {
  attempts: number;
  duration: number;
  date: string;
};

const STORAGE_KEY = "memoryGameHistory";

export const saveGameHistory = (entry: GameHistoryEntry): void => {
  const history: GameHistoryEntry[] = JSON.parse(
    localStorage.getItem(STORAGE_KEY) || "[]"
  );
  history.push(entry);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
};

export const getGameHistory = (): GameHistoryEntry[] => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
};
