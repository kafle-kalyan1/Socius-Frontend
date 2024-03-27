import React, { useRef } from 'react';

const AudioPlayer = ({ audioUrl }) => {
  const audioRef = useRef(null);

  const handlePlay = () => {
    audioRef.current.play();
  };

  return (
    <div className="flex items-center">
      <audio ref={audioRef} src={audioUrl} controls />
      {!audioUrl && <button onClick={handlePlay}>Play</button>}
    </div>
  );
};

export default AudioPlayer;