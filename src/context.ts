import { createContext, useContext } from 'react';

export type IsPlaying = {
	isPlaying: boolean;
	setIsPlaying: (element: boolean) => void;
};
export const IsPlayingContext = createContext<IsPlaying>({
	isPlaying: false,
	setIsPlaying: () => {},
});

export const useIsPlayingContext = () => useContext(IsPlayingContext);
