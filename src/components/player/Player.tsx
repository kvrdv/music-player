import { ChangeEvent, FC, useContext, useRef, useState } from 'react';
import styles from './Player.module.scss';
import cn from 'classnames';
import prevButton from '../../assets/images/button-prev.svg';
import nextButton from '../../assets/images/button-next.svg';
import playButton from '../../assets/images/button-play.svg';
import pauseButton from '../../assets/images/button-pause.svg';
import volumeCross from '../../assets/images/volume-cross.svg';
import volumeLoud from '../../assets/images/volume-loud.svg';
import cover from './data/Elliot-Bass Buzzer.webp';
import { useIsPlayingContext } from '../../context';

const Player: FC = () => {
	const { isPlaying, setIsPlaying } = useIsPlayingContext();
	const [volume, setVolume] = useState(50);
	const [seek, setSeek] = useState(0);

	const handleVolumeChange = (event: ChangeEvent<HTMLInputElement>) => {
		setVolume(Number(event.target.value));
	};

	const handleSeekChange = (event: ChangeEvent<HTMLInputElement>) => {
		setSeek(Number(event.target.value));
	};

	return (
		<div className={styles.player}>
			<div className={styles.controls}>
				<button className={styles.prevButton}>
					<img src={prevButton} alt="previous" draggable={false} />
				</button>
				<button
					className={styles.playButton}
					onClick={() => {
						setIsPlaying(!isPlaying);
					}}
				>
					<img
						src={isPlaying ? playButton : pauseButton}
						alt="previous"
						draggable={false}
					/>
				</button>
				<button className={styles.nextButton}>
					<img src={nextButton} alt="previous" draggable={false} />
				</button>
			</div>

			<div className={styles.sliders}>
				<div className={styles.volumeWrapper}>
					<img src={volumeCross} alt="0% volume" draggable={false} />
					<input
						className={cn({
							[styles.volume]: true,
							[styles.volumePlay]: isPlaying,
						})}
						type="range"
						id="volume"
						min="0"
						max="100"
						value={volume}
						onChange={handleVolumeChange}
					></input>
					<img src={volumeLoud} alt="100% volume" draggable={false} />
				</div>

				<p className={styles.trackName}>Название песни</p>

				<input
					className={styles.seek}
					type="range"
					id="seek"
					min="0"
					max="100"
					value={seek}
					onChange={handleSeekChange}
				></input>
			</div>

			<img
				className={cn({
					[styles.cover]: true,
				})}
				style={{ animationPlayState: isPlaying ? 'running' : 'paused' }}
				src={cover}
				alt="cover"
				draggable={false}
			/>
		</div>
	);
};

export default Player;
