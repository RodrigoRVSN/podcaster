import '../styles/global.scss';

import { Header } from '../components/Header';
import { Player } from '../components/Player';

import styles from '../styles/app.module.scss';

import { PlayerContextProvider } from '../contexts/PlayerContext';
import { ThemeContextProvider } from '../contexts/ThemeToggle';

function MyApp({ Component, pageProps }) {
  

  return (
    <PlayerContextProvider>
      <ThemeContextProvider>
          <div className={styles.wrapper}>
            <main>
              <Header />
              <Component {...pageProps} />
            </main>
            <Player />
          </div>
      </ThemeContextProvider>
    </PlayerContextProvider>
  );
}

export default MyApp;