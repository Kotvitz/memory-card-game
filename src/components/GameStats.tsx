import { useGameStore } from "../store/gameStore";
import "../styles/gameStats.scss";

export const GameStats = () => {
  const { attempts, timer } = useGameStore();
  return (
    <div className="game-stats">
      <p className="stat">Attempts: {attempts}</p>
      <p className="stat">Time: {timer}s</p>
    </div>
  );
};
