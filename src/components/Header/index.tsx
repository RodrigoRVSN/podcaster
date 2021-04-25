import format from 'date-fns/format';
import ptBR from 'date-fns/locale/pt-BR';

import styles from './styles.module.scss';
import theme from '../../styles/theme.module.scss';
import { useTheme } from '../../contexts/ThemeToggle';

import { CgDarkMode } from "react-icons/cg";

export function Header() {

  const currentDate = format(new Date(), 'EEEEEE, d MMMM', {
    locale: ptBR,
  });

  const {
    isDark,
    changeTheme
  } = useTheme();

  return (
    <div className={isDark ? theme.dark : theme.light}>

      <header className={styles.headerContainer}>
        <img src="/favicon.png" alt="Podcastr" />
        <h1>Podcaster</h1>
        <p>Ouça do melhor!</p>

        <span>{currentDate}</span>
        <h2><CgDarkMode onClick={changeTheme} className={styles.themeButton} /></h2>
      </header>
    </div>
  );
}