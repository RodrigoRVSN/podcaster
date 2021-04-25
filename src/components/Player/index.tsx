import Image from 'next/image';
import { useRef, useEffect, useState } from 'react';
import { usePlayer } from '../../contexts/PlayerContext';

import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { convertDurationToTimeString } from '../../utils/convertDurationToTimeString';

import styles from './styles.module.scss';
import theme from '../../styles/theme.module.scss';
import { useTheme } from '../../contexts/ThemeToggle';

export function Player() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [progress, setProgress] = useState(0);

  const {
    isDark,
    changeTheme
  } = useTheme();

  const {
    episodeList,
    currentEpisodeIndex,
    isPlaying,
    isLooping,
    isShuffling,
    togglePlay,
    toggleLoop,
    toggleShuffle,
    playNext,
    playPrevious,
    hasNext,
    hasPrevious,
    clearPlayerState,
    setPlayingState
  } = usePlayer();

  useEffect(() => {
    if (!audioRef.current) {
      return;
    }
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying])

  function setupProgressListener() {
    audioRef.current.currentTime = 0;
    audioRef.current.addEventListener('timeupdate', () => {
      setProgress(Math.floor(audioRef.current.currentTime));
    });
  }

  function handleSeek(amount: number) {
    audioRef.current.currentTime = amount;
    setProgress(amount);
  }

  function handleEpisodeEnded() {
    if (hasNext) {
      playNext()
    } else {
      clearPlayerState
    }
  }

  const episode = episodeList[currentEpisodeIndex];

  return (

    <div className={isDark ? theme.dark : theme.light}>

      <div className={styles.playerContainer}>
        <header>
          <img src="/playing.svg" alt="reproduzindo agora" />
          <strong>Reproduzindo agora</strong>
        </header>

        {episode ? (
          <div className={styles.atualEpisode}>
            <Image
              width={592}
              height={592}
              src={episode?.thumbnail}
              objectFit="cover"
            />
            <strong>{episode.title}</strong>
            <span>{episode.members}</span>
          </div>

        ) : (
          <div className={styles.emptyPlayer}>
            <strong>Escolha um podcast para reproduzir!</strong>
          </div>
        )}

        <footer className={!episode ? styles.empty : ''}>
          <div className={styles.progress}>
            <span>{convertDurationToTimeString(progress)}</span>
            <div className={styles.slider}>
              {episode ? (
                <Slider
                  max={episode.duration}
                  value={progress}
                  onChange={handleSeek}
                  trackStyle={{ background: '#04d361' }}
                  railStyle={{ background: '#9f75ff' }}
                  handleStyle={{ borderColor: '#04d361' }}
                />
              ) : (
                <div className={styles.emptySlider} />
              )}
            </div>
            <span>{convertDurationToTimeString(episode?.duration ?? 0)}</span>
          </div>

          {episode && (
            <audio
              ref={audioRef}
              src={episode.url}
              loop={isLooping}
              autoPlay
              onEnded={handleEpisodeEnded}
              onPlay={() => setPlayingState(true)}
              onPause={() => setPlayingState(false)}
              onLoadedMetadata={setupProgressListener}
            />
          )}

          <div className={styles.buttons}>
            <button type="button" onClick={toggleShuffle} className={isShuffling ? styles.isActive : ''} disabled={!episode || episodeList.length === 1}>
              <img src="/shuffle.svg" alt="Embaralhar" />
            </button>
            <button type="button" onClick={playPrevious} disabled={!episode || !hasPrevious}>
              <img src="/play-previous.svg" alt="Tocar anterior" />
            </button>
            <button
              type="button"
              className={styles.playButton}
              disabled={!episode}
              onClick={togglePlay}
            >
              {isPlaying
                ? <img src="/pause.svg" alt="Pausar" />
                : <img src="/play.svg" alt="Reproduzir" />
              }
            </button>
            <button type="button" onClick={playNext} disabled={!episode || !hasNext}>
              <img src="/play-next.svg" alt="Tocar próxima" />
            </button>
            <button type="button" onClick={toggleLoop} className={isLooping ? styles.isActive : ''} disabled={!episode}>
              <img src="/repeat.svg" alt="Repetir" />
            </button>
          </div>
        </footer>

      </div>
    </div>
  );
}