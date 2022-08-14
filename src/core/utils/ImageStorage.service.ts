import {getImageSrc} from "./Main.helper";
import RNFetchBlob from "rn-fetch-blob";

// getImageSrc(cover?.id, 720)


export class ImageFile {
	private url: string;
	private status: boolean;
	private src: string;

	constructor(routeId: string, url: string) {
		this.url = url;
		this.status = false;
		this.src = '';
		RNFetchBlob
			.config({
				session: routeId,
				fileCache: true,
				appendExt: 'jpg'
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
