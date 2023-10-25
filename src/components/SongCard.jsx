import { useDispatch } from 'react-redux';
import PlayPause from './PlayPause';
import { playPause, setActiveSong } from '../redux/features/playerSlice';

const SongCard = ({ song, i, isPlaying, activeSong, data }) => {
  const dispatch = useDispatch();
  const handlepauseClick = () => {
    dispatch(playPause(false));
  };
  const handleplayClick = () => {
    dispatch(setActiveSong({ i, data, song }));
    dispatch(playPause(true));
  };
  return (
    <div className="flex flex-col w-[220px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
      <div className="relative w-full h-[190px] group">
        <div className={`absolute inset-0 justify-center items-center
   bg-black bg-opacity-50 group-hover:flex ${activeSong?.title === song.title ? 'flex bg-black bg-opacity-70' : 'hidden'} 
      `}>
          <PlayPause
            song={song}
            handlepause={handlepauseClick}
            handleplay={handleplayClick}
            activeSong={activeSong}
            isPlaying={isPlaying}
          />
        </div>
        <img alt="song_img" src={song.images?.coverart} />
      </div>
      <div className="mt-4 flex flex-col">
        <div className="font-semibold text-lg text-white truncate">
          <p> {song.title} </p>
        </div>
        <div className="text-sm truncate text-gray-300 mt-1">
          <p>
            {song.subtitle}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SongCard;
