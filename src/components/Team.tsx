import { useState, useEffect } from 'react';
import SoccerField from './SoccerField';
import type { PlayerData } from '../types';
import './Team.css';
import './SoccerField.css';

const Team: React.FC = () => {
  const [players, setPlayers] = useState<PlayerData[]>([]);
  const [isGameActive, setIsGameActive] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);
  const [editingPlayer, setEditingPlayer] = useState<string | null>(null);

  useEffect(() => {
    // Initialize with default players
    setPlayers([
      { id: '1', name: 'Player 1', position: 'GK', isPlaying: true, playingTime: 0 },
      { id: '2', name: 'Player 2', position: 'LB', isPlaying: true, playingTime: 0 },
      { id: '3', name: 'Player 3', position: 'CB', isPlaying: true, playingTime: 0 },
      { id: '4', name: 'Player 4', position: 'RB', isPlaying: true, playingTime: 0 },
      { id: '5', name: 'Player 5', position: 'LM', isPlaying: true, playingTime: 0 },
      { id: '6', name: 'Player 6', position: 'CM', isPlaying: true, playingTime: 0 },
      { id: '7', name: 'Player 7', position: 'RM', isPlaying: true, playingTime: 0 },
      { id: '8', name: 'Player 8', position: 'LF', isPlaying: true, playingTime: 0 },
      { id: '9', name: 'Player 9', position: 'RF', isPlaying: true, playingTime: 0 },
      { id: '10', name: 'Player 10', isPlaying: false, playingTime: 0 },
      { id: '11', name: 'Player 11', isPlaying: false, playingTime: 0 },
      { id: '12', name: 'Player 12', isPlaying: false, playingTime: 0 },
      { id: '13', name: 'Player 13', isPlaying: false, playingTime: 0 },
    ]);
  }, []);

  useEffect(() => {
    let interval: number | undefined;
    if (isGameActive) {
      interval = window.setInterval(() => {
        setPlayers(prevPlayers =>
          prevPlayers.map(player =>
            player.isPlaying
              ? { ...player, playingTime: player.playingTime + 1 }
              : player
          )
        );
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isGameActive]);

  const handlePlayerClick = (playerId: string) => {
    if (editingPlayer) {
      return; // Don't allow swapping while editing names
    }
    
    if (!selectedPlayer) {
      setSelectedPlayer(playerId);
    } else {
      // Swap players
      const player1 = players.find(p => p.id === selectedPlayer);
      const player2 = players.find(p => p.id === playerId);
      
      if (player1 && player2) {
        setPlayers(prevPlayers =>
          prevPlayers.map(player => {
            if (player.id === selectedPlayer) {
              if (player1.isPlaying && player2.isPlaying) {
                // Both players are on field - swap positions
                return { ...player, position: player2.position };
              } else if (player1.isPlaying) {
                // Player1 is on field, player2 is on bench
                return { ...player, isPlaying: false, position: undefined };
              } else {
                // Player1 is on bench, player2 is on field
                return { ...player, isPlaying: true, position: player2.position };
              }
            }
            if (player.id === playerId) {
              if (player1.isPlaying && player2.isPlaying) {
                // Both players are on field - swap positions
                return { ...player, position: player1.position };
              } else if (player2.isPlaying) {
                // Player2 is on field, player1 is on bench
                return { ...player, isPlaying: false, position: undefined };
              } else {
                // Player2 is on bench, player1 is on field
                return { ...player, isPlaying: true, position: player1.position };
              }
            }
            return player;
          })
        );
      }
      setSelectedPlayer(null);
    }
  };

  const toggleGame = () => {
    setIsGameActive(!isGameActive);
  };

  const startEditingName = (playerId: string) => {
    setEditingPlayer(playerId);
  };

  const handleNameChange = (playerId: string, newName: string) => {
    setPlayers(prevPlayers =>
      prevPlayers.map(player =>
        player.id === playerId
          ? { ...player, name: newName }
          : player
      )
    );
  };

  const handleNameSubmit = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      setEditingPlayer(null);
    }
  };

  return (
    <div className="team-container">
      <div className="controls">
        <button onClick={toggleGame} className="game-button">
          {isGameActive ? 'Stop Game' : 'Start Game'}
        </button>
      </div>

      <SoccerField
        players={players}
        onPlayerClick={handlePlayerClick}
        selectedPlayer={selectedPlayer}
      />

      <div className="player-list">
        <h2>All Players</h2>
        <div className="player-grid">
          {players.map(player => (
            <div 
              key={player.id} 
              className={`player-card ${player.isPlaying ? 'playing' : 'bench'} ${selectedPlayer === player.id ? 'selected' : ''}`}
            >
              {editingPlayer === player.id ? (
                <input
                  type="text"
                  value={player.name}
                  onChange={(e) => handleNameChange(player.id, e.target.value)}
                  onKeyDown={handleNameSubmit}
                  onBlur={() => setEditingPlayer(null)}
                  autoFocus
                />
              ) : (
                <div className="player-info" onClick={() => startEditingName(player.id)}>
                  <span className="player-name">{player.name}</span>
                  {player.position && <span className="player-position">{player.position}</span>}
                  <span className="player-status">{player.isPlaying ? 'Playing' : 'Bench'}</span>
                  <span className="player-time">{formatTime(player.playingTime)}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

export default Team; 