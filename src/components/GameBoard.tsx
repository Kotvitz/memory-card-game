import { useGameStore } from "../store/gameStore";
import "../styles/gameBoard.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

export const GameBoard = () => {
  const { cards, flipCard, difficulty } = useGameStore();

  if (cards.length === 0) return null;

  return (
    <div className={`game-board ${difficulty}`}>
      {cards.map((card) => {
        const isFlipped = card.revealed || card.matched;
        return (
          <div
            key={card.id}
            className={`tile ${isFlipped ? "revealed" : ""} ${card.matched ? "matched" : ""}`}
            onClick={() => !card.revealed && !card.matched && flipCard(card.id)}
            role="button"
            aria-label={isFlipped ? "Revealed Card" : "Hidden Card"}
            tabIndex={0} 
          >
            <div className="card-front">
              {isFlipped && <img src={card.image} alt="Card" className="card-image" />}
            </div>
            <div className="card-back">
            <FontAwesomeIcon icon={faQuestionCircle} className="card-icon" />
            </div>
          </div>
        );
      })}
    </div>
  );
};
