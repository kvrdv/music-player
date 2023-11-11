// const songs = [...Array(5).keys()].map((n) => ({
// 	title: 'Song Number ' + Number(n + 1),
// 	src: `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${Number(n + 1)}.mp3`,
// }));

import song1 from '../../data/Elliot-Bass Buzzer.mp3';
import image1 from '../../data/Elliot-Bass Buzzer.webp';
import song2 from '../../data/C.W.-Shoulda Coulda.mp3';
import image2 from '../../data/C.W.-Shoulda Coulda.webp';
import song3 from '../../data/Risian-League.mp3';
import image3 from '../../data/Risian-League.webp';

interface Song {
	title: string;
	src: string;
	image: string;
}

const songs: Song[] = [
	{
		title: 'Elliot - Bass Buzzer',
		src: song1,
		image: image1,
	},
	{
		title: 'C.W. - Shoulda Coulda',
		src: song2,
		image: image2,
	},
	{
		title: 'Risian - League',
		src: song3,
		image: image3,
	},
];

export { songs };
