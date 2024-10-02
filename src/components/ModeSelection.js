import React from 'react';

function ModeSelection({ onModeSelect }) {
  const modes = ['aquarium', 'dino', 'snake', 'pong'];

  return (
    <div className="mode-selection">
      <h2>Select a Game Mode</h2>
      {modes.map((mode) => (
        <button key={mode} onClick={() => onModeSelect(mode)}>
          {mode.charAt(0).toUpperCase() + mode.slice(1)}
        </button>
      ))}
    </div>
  );
}

export default ModeSelection;