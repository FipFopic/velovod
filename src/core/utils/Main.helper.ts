import { REST_API, REST_END } from '../../config'

const mediaTypes = {
	audio: 'audio/mp3',
	image: 'image/jpeg'
}

export const getImageSrc = (id = -1, size: number) => {
	return REST_API + REST_END.getMedia + id + '/' + size
}

export const getAudioSrc = (id = -1) => {
	return REST_API + REST_END.getMedia + id
}

const plugImageSrc = getImageSrc(17319, 100)

export const getMediaSrc = (media: Array<any>, type = 'image', size = 100) => {
	// @ts-ignore
	if (media.length === 1 && !media[0].media_format.includes(type)) {
		if (type === mediaTypes.audio) return
		return plugImageSrc
	}

	const mediaData = media.find((m) => m.media_format.includes(type))

	if (!mediaData) return

	switch (type) {
	case 'audio':
		return getAudioSrc(mediaData.id)
	case 'image':
		return getImageSrc(mediaData.id, size)
	}
}
