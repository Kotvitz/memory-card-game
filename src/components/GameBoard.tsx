import { useGameStore } from "../store/gameStore";
import "../styles/gameBoard.scss";

export const GameBoard = () => {
  const { cards, flipCard, difficulty } = useGameStore();

  if (cards.length === 0) return null;

  return (
    <div className={`game-board ${difficulty}`}>
      {cards.map((card) => (
        <div
          key={card.id}
          className={`tile ${card.matched ? "matched" : ""}`}
          onClick={() => flipCard(card.id)}
        >
          {card.revealed || card.matched ? (
            <img src={card.image} alt="Card" className="card-image" />
          ) : (
            <div className="card-back" />
          )}
        </div>
      ))}
    </div>
  );
};
