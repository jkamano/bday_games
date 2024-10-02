import React from 'react';

function ConnectionButton({ onConnect }) {
  return (
    <button onClick={onConnect} className="connection-button">
      Connect to Server
    </button>
  );
}

export default ConnectionButton;