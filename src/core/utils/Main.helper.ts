import { REST_API, REST_END } from '../../config'

export const getImageSrc = (id = -1, size: number) => {
	return REST_API + REST_END.getMedia + id + '/' + size
}

export const getAudioSrc = (id = -1) => {
	return REST_API + REST_END.getMedia + id
}
