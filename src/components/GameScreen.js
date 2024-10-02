import React from 'react';
import AquariumMode from './games/AquariumMode';
import DinoMode from './games/DinoMode';
import SnakeMode from './games/SnakeMode';
import PongMode from './games/PongMode';

function GameScreen({ mode, socket, onDisconnect }) {
  const renderGame = () => {
    switch (mode) {
      case 'aquarium':
        return <AquariumMode socket={socket} />;
      case 'dino':
        return <DinoMode socket={socket} />;
      case 'snake':
        return <SnakeMode socket={socket} />;
      case 'pong':
        return <PongMode socket={socket} />;
      default:
        return null;
    }
  };

  return (
    <div className="game-screen">
      {renderGame()}
      <button onClick={onDisconnect} className="exit-button">
        X
      </button>
    </div>
  );
}

export default GameScreen;