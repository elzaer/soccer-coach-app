import type { FC } from 'react';

interface Position {
  x: number;
  y: number;
  playerId?: string;
}

interface PitchProps {
  players: {
    id: string;
    name: string;
    position?: string;
  }[];
  onPositionClick?: (x: number, y: number) => void;
}

const Pitch: FC<PitchProps> = ({ players, onPositionClick }) => {
  // Define standard 9v9 positions
  const positions: Position[] = [
    { x: 50, y: 90 }, // GK
    { x: 25, y: 70 }, // LB
    { x: 50, y: 70 }, // CB
    { x: 75, y: 70 }, // RB
    { x: 25, y: 50 }, // LM
    { x: 50, y: 50 }, // CM
    { x: 75, y: 50 }, // RM
    { x: 35, y: 30 }, // LF
    { x: 65, y: 30 }, // RF
  ];

  return (
    <div className="pitch-container">
      <div className="pitch">
        {/* Field markings */}
        <div className="center-circle"></div>
        <div className="center-line"></div>
        <div className="penalty-area-left"></div>
        <div className="penalty-area-right"></div>
        
        {/* Player positions */}
        {positions.map((pos, index) => (
          <div
            key={index}
            className="player-position"
            style={{
              left: `${pos.x}%`,
              top: `${pos.y}%`,
            }}
            onClick={() => onPositionClick?.(pos.x, pos.y)}
          >
            {players[index]?.name || `Position ${index + 1}`}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pitch; 