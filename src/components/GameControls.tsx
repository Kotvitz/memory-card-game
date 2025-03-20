import { useGameStore } from "../store/gameStore";
import "../styles/gameControls.scss";

export const GameControls = () => {
  const { startGame, resetGame } = useGameStore();
  return (
    <div className="game-controls">
      <button onClick={() => startGame(4)}>Start Easy</button>
      <button onClick={() => startGame(6)}>Start Medium</button>
      <button onClick={() => startGame(8)}>Start Hard</button>
      <button onClick={resetGame}>Reset</button>
    </div>
  );
};
