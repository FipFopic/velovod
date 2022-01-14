import {useCallback, useRef} from 'react';

export const useThrottle = (callback: any, delay: any) => {
	const isThrottled = useRef(false)

	return useCallback((...args) => {
		if (isThrottled.current) {
			return
		}

		callback(args)
		isThrottled.current = true
		setTimeout(() => isThrottled.current = false, delay)

	}, [callback, delay])
}
