import { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import styles from './Player.module.scss';
import cn from 'classnames';
import prevButton from '../../assets/images/button-prev.svg';
import nextButton from '../../assets/images/button-next.svg';
import playButton from '../../assets/images/button-play.svg';
import pauseButton from '../../assets/images/button-pause.svg';
import volumeCross from '../../assets/images/volume-cross.svg';
import volumeLoud from '../../assets/images/volume-loud.svg';
import { useIsPlayingContext } from '../../context';
import { songs } from './songs';

const Player: FC = () => {
	const { isPlaying, setIsPlaying } = useIsPlayingContext();
	const [volume, setVolume] = useState(1);
	const [currentTime, setCurrentTime] = useState(0);
	const [duration, setDuration] = useState(0);
	const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

	const audioRef = useRef<HTMLAudioElement | null>(null);

	const togglePlay = () => {
		if (isPlaying) {
			audioRef.current?.pause();
		} else {
			audioRef.current?.play();
		}
		setIsPlaying(!isPlaying);
	};

	const handleVolumeChange = (event: ChangeEvent<HTMLInputElement>) => {
		const newVolume = parseFloat(event.target.value);

		setVolume(newVolume);

		if (audioRef.current) {
			audioRef.current.volume = newVolume;
		}
	};

	const handleVolumeMute = () => {
		if (volume === 0) {
			const newVolume = 0.5;
			setVolume(newVolume);
			if (audioRef.current) {
				audioRef.current.volume = newVolume;
			}
		} else {
			const newVolume = 0;
			setVolume(newVolume);
			if (audioRef.current) {
				audioRef.current.volume = newVolume;
			}
		}
	};

	const handleVolumeMax = () => {
		const newVolume = 1;
		setVolume(newVolume);
		if (audioRef.current) {
			audioRef.current.volume = newVolume;
		}
	};

	const handleTimeChange = (event: ChangeEvent<HTMLInputElement>) => {
		const newTime = parseFloat(event.target.value);
		setCurrentTime(newTime);
		if (audioRef.current) {
			audioRef.current.currentTime = newTime;
		}
	};

	useEffect(() => {
		if (audioRef.current) {
			audioRef.current.addEventListener('loadedmetadata', () => {
				setDuration(audioRef.current?.duration || 0);
			});

			audioRef.current.addEventListener('timeupdate', () => {
				setCurrentTime(audioRef.current?.currentTime || 0);
			});

			audioRef.current.addEventListener('ended', () => {
				playNextTrack();
			});
		}

		if (isPlaying) {
			audioRef.current?.pause();

			const timeout = setTimeout(() => {
				audioRef.current?.play();
			}, 500);

			return () => {
				clearTimeout(timeout);
			};
		}
	}, [currentTrackIndex]);

	const playNextTrack = () => {
		if (currentTrackIndex < songs.length - 1) {
			setCurrentTrackIndex(currentTrackIndex + 1);
			setCurrentTime(0);
		} else {
			setCurrentTrackIndex(0);
			setCurrentTime(0);
		}
	};

	const playPreviousTrack = () => {
		if (currentTrackIndex > 0) {
			setCurrentTrackIndex(currentTrackIndex - 1);
			setCurrentTime(0);
		} else {
			setCurrentTrackIndex(songs.length - 1);
			setCurrentTime(0);
		}
	};

	return (
		<div className={styles.player}>
			<div>
				<audio ref={audioRef} src={songs[currentTrackIndex].src} preload="metadata" />
			</div>

			<div className={styles.controls}>
				<button className={styles.prevButton}>
					<img
						src={prevButton}
						alt="previous"
						draggable={false}
						onClick={playPreviousTrack}
					/>
				</button>
				<button className={styles.playButton} onClick={togglePlay}>
					<img
						src={isPlaying ? playButton : pauseButton}
						alt="previous"
						draggable={false}
					/>
				</button>
				<button className={styles.nextButton}>
					<img src={nextButton} alt="next" draggable={false} onClick={playNextTrack} />
				</button>
			</div>

			<div className={styles.sliders}>
				<div className={styles.volumeWrapper}>
					<img
						src={volumeCross}
						alt="0% volume"
						draggable={false}
						onClick={handleVolumeMute}
					/>
					<input
						className={cn({
							[styles.volume]: true,
							[styles.volumePlay]: isPlaying,
						})}
						type="range"
						id="volume"
						min="0"
						max="1"
						step="0.01"
						value={volume}
						onChange={handleVolumeChange}
					></input>
					<img
						src={volumeLoud}
						alt="100% volume"
						draggable={false}
						onClick={handleVolumeMax}
					/>
				</div>

				<p className={styles.trackName}>{songs[currentTrackIndex].title}</p>

				<input
					className={styles.seek}
					type="range"
					id="seek"
					min="0"
					max={audioRef.current?.duration || 0}
					step="1"
					value={currentTime}
					onChange={handleTimeChange}
				></input>
			</div>

			<img
				className={cn({
					[styles.cover]: true,
				})}
				style={{ animationPlayState: isPlaying ? 'running' : 'paused' }}
				src={songs[currentTrackIndex].image}
				alt="cover"
				draggable={false}
			/>
		</div>
	);
};

export default Player;
