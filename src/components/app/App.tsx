import { FC, useState } from 'react';
import styles from './App.module.scss';
import cn from 'classnames';
import Player from '../player/Player';
import { IsPlayingContext } from '../../context';

const App: FC = () => {
	const [isPlaying, setIsPlaying] = useState<boolean>(false);

	return (
		<IsPlayingContext.Provider value={{ isPlaying, setIsPlaying }}>
			<div className={styles.app}>
				<svg
					className={cn({
						[styles.bgPause]: !isPlaying,
						[styles.bgPlay]: isPlaying,
					})}
					viewBox="0 0 1728 1080"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						className={styles.bgLine}
						d="M1728 0V579.389L1100.5 932.5L917.5 456L1728 0Z"
						fill="#307358"
					/>
					<path
						className={styles.bgCross}
						d="M838.836 1080L781 887L385.5 887L318 1080H0L54.5 941.5L1728 0L1728 579.5L838.836 1080Z"
						fill="#05AC6A"
						fillOpacity="0.15"
					/>
					<path
						className={styles.bgLogo}
						d="M742.453 0L1157.07 1080H838.875L781.022 887.143H385.69L318.194 1080H0L424.259 0H742.453Z"
						fill="#0CB673"
						fillOpacity="0.3"
					/>
				</svg>
				<Player />
			</div>
		</IsPlayingContext.Provider>
	);
};

export default App;
