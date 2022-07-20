import RNFetchBlob from 'rn-fetch-blob'

const dirs = RNFetchBlob.fs.dirs
// const path = '/assets/audio-store/'

export const downloadAudio = async (url: string) => {
	return await (RNFetchBlob
		.config({
			fileCache: true,
			// path: dirs.DocumentDir + path
			appendExt: 'mp3'
		}))
		.fetch('GET', url);
		// .then((res) => {
		// 	console.log('\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nThe file saved to ', res.path())
		// 	return res.path()
		// })
}

export class AudioFile {
	private url: string;
	private status: boolean;
	private src: string;
	// private name;

	constructor(routeId: string, url: string) {
		this.url = url;
		this.status = false;
		this.src = '';
		RNFetchBlob
			.config({
				session: routeId,
				fileCache: true,
				appendExt: 'mp3'
			})
			.fetch('GET', this.url)
			.then((res) => {
				// const status = res.info().status;
				this.status = true;
				this.src = res.path();
			})
	}

	isLoaded() {
		return this.status;
	}

	getSrc() {
		return this.src
	}

}
