import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import './App.css';
import ConnectionButton from './components/ConnectionButton';
import ModeSelection from './components/ModeSelection';
import GameScreen from './components/GameScreen';

function App() {
  const [connected, setConnected] = useState(false);
  const [mode, setMode] = useState(null);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Initialize socket connection
    const newSocket = io('https://joaogames.io', {
      secure: true,
      rejectUnauthorized: false // Only for self-signed certificates
    });
    setSocket(newSocket);

    return () => newSocket.close();
  }, []);

  const handleConnect = () => {
    if (socket) {
      socket.emit('connect_request');
      setConnected(true);
    }
  };

  const handleModeSelect = (selectedMode) => {
    if (socket) {
      socket.emit('select_mode', selectedMode);
      setMode(selectedMode);
    }
  };

  const handleDisconnect = () => {
    if (socket) {
      socket.emit('disconnect_request');
      setConnected(false);
      setMode(null);
    }
  };

  return (
    <div className="App">
      {!connected && <ConnectionButton onConnect={handleConnect} />}
      {connected && !mode && <ModeSelection onModeSelect={handleModeSelect} />}
      {connected && mode && (
        <GameScreen mode={mode} socket={socket} onDisconnect={handleDisconnect} />
      )}
    </div>
  );
}

export default App;
