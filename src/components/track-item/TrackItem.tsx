import { MdPlayArrow, MdPause } from 'react-icons/md';
import cn from 'classnames';
import { FC } from 'react';
import { TrackItemProps } from './track-item.types';

const TrackItem: FC<TrackItemProps> = ({ title, trackNumberLabel, selected, onClick }) => {
	return (
		<li
			onClick={onClick}
			// className={cn(
			// 	'flex items-center py-3 px-3 w-full space-evenly rounded cursor-pointer mb-1',
			// 	{ 'bg-cyan-600 text-white': selected },
			// 	{ 'hover:bg-cyan-600 hover:text-white': !selected }
			// )}
		>
			<span >{trackNumberLabel}</span>
			<h2 >{title}</h2>
			<span>{selected ? <MdPause size={20} /> : <MdPlayArrow size={20} />}</span>
		</li>
	);
};

export default TrackItem;
