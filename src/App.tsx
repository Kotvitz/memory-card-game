import { GameBoard } from "./components/GameBoard";
import { GameStats } from "./components/GameStats";
import { GameControls } from "./components/GameControls";
import { GameHistory } from "./components/GameHistory";
import "./styles/main.scss";

const App = () => (
  <div className="app">
    <div className="title-container">
      <h1>Memory Card Game</h1>
    </div>
    <div className="content-container">
      <GameStats />
      <GameBoard />
      <GameControls />
      <GameHistory />
    </div>
  </div>
);

export default App;
