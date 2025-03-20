import { useGameStore } from "../store/gameStore";
import "../styles/gameHistory.scss";

export const GameHistory = () => {
  const { gameHistory } = useGameStore();

  return (
    <div className="game-history">
      <h2>Game History</h2>
      {gameHistory.length === 0 ? (
        <p>No game history available.</p>
      ) : (
        <>
          <ul>
            {gameHistory.map((entry, index) => (
              <li key={index} className="history-item">
                <span>
                  <strong>Attempts:</strong> {entry.attempts}&nbsp;
                </span>
                <span>
                  <strong>Time:</strong> {entry.duration}s&nbsp;
                </span>
                <span>
                  <strong>Date:</strong> {new Date(entry.date).toLocaleString()}&nbsp;
                </span>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};
