interface PlayerProps {
  id: string;
  name: string;
  position?: string;
  isPlaying: boolean;
  playingTime: number; // in seconds
  onClick?: () => void;
  isSelected?: boolean;
}

const Player: React.FC<PlayerProps> = ({ 
  id, 
  name, 
  position, 
  isPlaying, 
  playingTime,
  onClick,
  isSelected 
}) => {
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div 
      className={`player ${isPlaying ? 'playing' : 'bench'} ${isSelected ? 'selected' : ''}`}
      onClick={onClick}
    >
      <div className="player-info">
        <h3>{name}</h3>
        {position && <span className="position">{position}</span>}
      </div>
      <div className="player-time">
        <span>{formatTime(playingTime)}</span>
      </div>
    </div>
  );
};

export default Player; 