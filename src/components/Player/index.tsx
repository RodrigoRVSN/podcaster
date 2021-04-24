import Image from 'next/image';
import { useContext, useRef, useEffect } from 'react';
import { PlayerContext } from '../../contexts/PlayerContext';
import styles from './styles.module.scss';

import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

export function Player() {
  const audioRef = useRef<HTMLAudioElement>(null);

  const {
    episodeList,
    currentEpisodeIndex,
    isPlaying,
    togglePlay,
    setPlayingState
  } = useContext(PlayerContext);

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

  const episode = episodeList[currentEpisodeIndex];

  return (

    <div className={styles.playerContainer}>
      <header>
        <img src="playing.svg" alt="reproduzindo agora" />
        <strong>Reproduzindo agora</strong>
      </header>

      { episode ? (
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
          <span>00:00</span>
          <div className={styles.slider}>
            {episode ? (
              <Slider
                trackStyle={{ background: '#04d361' }}
                railStyle={{ background: '#9f75ff' }}
                handleStyle={{ borderColor: '#04d361' }}
              />
            ) : (
              <div className={styles.emptySlider} />
            )}
          </div>
          <span>00:00</span>
        </div>

        {episode && (
          <audio
            ref={audioRef}
            src={episode.url}
            autoPlay
            onPlay={()=> setPlayingState(true)}
            onPause={()=> setPlayingState(false)}
          />
        )}

        <div className={styles.buttons}>
          <button type="button" disabled={!episode}>
            <img src="/shuffle.svg" alt="Embaralhar" />
          </button>
          <button type="button" disabled={!episode}>
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
          <button type="button" disabled={!episode}>
            <img src="/play-next.svg" alt="Tocar próxima" />
          </button>
          <button type="button" disabled={!episode}>
            <img src="/repeat.svg" alt="Repetir" />
          </button>
        </div>
      </footer>

    </div>
  );
}