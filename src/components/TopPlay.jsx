import { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useSelector, useDispatch } from 'react-redux';
import { FreeMode } from 'swiper';
import { playPause, setActiveSong } from '../redux/features/playerSlice';
import PlayPause from './PlayPause';
import { useGetTopChartsQuery } from '../redux/services/ShazamCore';
import 'swiper/css';
import 'swiper/css/free-mode';

const TopChartCard = ({ song, i, activeSong, isPlaying, handlepauseClick, handleplayClick }) => (
  <div className="w-full flex flex-row items-center hover:bg-[#2a4d2df8] py-2 p-4 rounded-lg cursor-pointer mb-2">
    <h3 className=" font-bold text-base text-white mr-3">{ i + 1 }</h3>
    <div className=" flex-1 flex flex-row justify-between items-center">
      <img
        src={song?.images?.coverart}
        alt={song?.title}
        className=" w-[74px] h-[74px] rounded-lg"
      />
      <div className=" flex-1 flex flex-col justify-center mx-3 ">
        <div>
          <p className="text-white font-bold text-m">{ song.title }</p>
        </div>
        <div>
          <p className="text-gray-300 mt-1 text-base">{ song?.subtitle }</p>
        </div>
      </div>
    </div>
    <PlayPause
      song={song}
      activeSong={activeSong}
      isPlaying={isPlaying}
      handlepause={handlepauseClick}
      handleplay={handleplayClick}
    />
  </div>
);
const TopPlay = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data } = useGetTopChartsQuery();
  const divRef = useRef(null);
  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: 'smooth' });
  });
  const topPlays = data?.tracks.slice(0, 5);
  const handlepauseClick = () => {
    dispatch(playPause(false));
  };
  const handleplayClick = (i, song) => {
    dispatch(setActiveSong({ i, data, song }));
    dispatch(playPause(true));
  };
  return (
    <div
      ref={divRef}
      className="xl:ml-6 ml-0 xl:mb-0 mb-6
    flex-1 xl:max-w-[400px] max-w-full flex flex-col"
    >
      <div className=" w-full flex flex-col">
        <div className=" flex flex-row justify-between items-center">
          <h2 className=" text-white font-bold text-2xl">Top Songs</h2>
        </div>
        <div className=" mt-4 flex flex-col gap-1">
          {topPlays?.map((song, i) => (
            <TopChartCard
              key={song.key}
              song={song}
              i={i}
              data={data}
              activeSong={activeSong}
              isPlaying={isPlaying}
              handlepauseClick={handlepauseClick}
              handleplayClick={() => handleplayClick(i, song)}
            />
          ))}
        </div>
      </div>
      <div className=" w-full flex flex-col mt-8">
        <div className=" flex flex-row justify-between items-center">
          <h2 className=" text-white font-bold text-2xl">Top Artists</h2>

        </div>
        <Swiper
          slidesPerView="auto"
          spaceBetween={15}
          freeMode
          centeredslide="true"
          centeredSlidesBounds
          modules={[FreeMode]}
          className="mt-4"
        >
          {topPlays?.map((song) => (
            <SwiperSlide
              key={song.key}
              style={{ width: '25%', height: 'auto' }}
              className=" shadow-lg rounded-full animate-slideright"
            >
              <div>
                <img src={song?.images.background} alt="name" className=" rounded-full w-full object-cover" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default TopPlay;
