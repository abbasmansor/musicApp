import { FaPlayCircle, FaPauseCircle } from 'react-icons/fa';

const PlayPause = ({ isPlaying, activeSong, song, handlepause, handleplay }) => (
  isPlaying && activeSong?.title === song.title
    ? (<FaPauseCircle size={30} className="text-gray-300" onClick={handlepause} />)
    : (<FaPlayCircle size={30} className="text-gray-300" onClick={handleplay} />)
);

export default PlayPause;
