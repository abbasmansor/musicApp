import { useSelector } from 'react-redux';
import { Error, Loader, SongCard } from '../components';
import { useGetTopChartsQuery } from '../redux/services/ShazamCore';

const Discover = () => {
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetTopChartsQuery();
  if (isFetching) return <Loader title=" Songs is loading... " />;
  if (error) return <Error />;
  return (

    <div className="flex flex-col">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10 ">
        <h2 className="font-bold text-3xl text-white text-left">
          Discover Music
        </h2>

      </div>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        { data.tracks?.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            i={i}
            activeSong={activeSong}
            isPlaying={isPlaying}
            data={data}
          />
        ))}

      </div>
    </div>
  );
};

export default Discover;
