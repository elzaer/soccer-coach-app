import type { FC } from 'react';
import type { PlayerData } from '../types';

interface SoccerFieldProps {
  players: PlayerData[];
  onPlayerClick: (playerId: string) => void;
  selectedPlayer: string | null;
}

const SoccerField: FC<SoccerFieldProps> = ({ players, onPlayerClick, selectedPlayer }) => {
  // Define standard 9v9 positions with labels
  const positions = [
    { x: 50, y: 85, label: 'GK' },  // Goalkeeper
    { x: 20, y: 65, label: 'LB' },  // Left Back
    { x: 50, y: 65, label: 'CB' },  // Center Back
    { x: 80, y: 65, label: 'RB' },  // Right Back
    { x: 20, y: 45, label: 'LM' },  // Left Mid
    { x: 50, y: 45, label: 'CM' },  // Center Mid
    { x: 80, y: 45, label: 'RM' },  // Right Mid
    { x: 35, y: 25, label: 'LF' },  // Left Forward
    { x: 65, y: 25, label: 'RF' },  // Right Forward
  ];

  const playingPlayers = players.filter(p => p.isPlaying);

  return (
    <div className="soccer-field-container">
      <div className="soccer-field">
        {/* Field markings */}
        <div className="penalty-box"></div>
        <div className="penalty-arc"></div>
        <div className="center-circle"></div>
        <div className="center-line"></div>
        
        {/* Player positions */}
        {positions.map((pos) => {
          const player = playingPlayers.find(p => p.position === pos.label);
          return player ? (
            <div
              key={player.id}
              className={`field-player ${selectedPlayer === player.id ? 'selected' : ''}`}
              style={{
                left: `${pos.x}%`,
                top: `${pos.y}%`,
              }}
              onClick={() => onPlayerClick(player.id)}
            >
              <div className="player-dot"></div>
              <div className="player-label">{player.name}</div>
              <div className="position-label">{pos.label}</div>
            </div>
          ) : null;
        })}
      </div>
      
      {/* Bench area */}
      <div className="bench-area">
        <h3>Bench</h3>
        <div className="bench-players-container">
          {players.filter(p => !p.isPlaying).map(player => (
            <div
              key={player.id}
              className={`bench-player ${selectedPlayer === player.id ? 'selected' : ''}`}
              onClick={() => onPlayerClick(player.id)}
            >
              <div className="player-label">{player.name}</div>
              <div className="player-time">{formatTime(player.playingTime)}</div>
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

export default SoccerField; 