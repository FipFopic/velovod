export const REST_API = 'https://velovod.com/api/'

export const REST_END = {
	getMedia: 'c_media/get/',
	uploadMedia: 'c_media/add',
	login: 'login',
	signup: 'registration',
	authVK: 'auth/vk',
	authFB: 'auth/facebook', // TODO Must be implemented
	logout: 'logout',
	userProfile: 'c_user/item',
	updateUserProfile: 'c_user/edit',
	simpleRoutes: 'c_route/lite/items',
	simpleRouteDetails: 'c_route/item',
	routeComplete: 'c_route/complete',
	addSimpleRoute: 'c_route/ios/save',
	questRoutes: 'c_quest/lite/items',
	questRouteDetails: 'c_quest/item',
	questRoutePlay: 'c_quest/play',
	questRouteExit: 'c_quest/play/current/exit',
	questRouteSendPosition: 'c_quest/play/current/position',
	questRouteCurrentPoints: 'c_quest/play/current/points',
	questRouteCurrentPoint: 'c_quest/play/current/point',
	questRouteUsers: 'c_quest/play/current/users',
	questRouteAnswer: 'c_quest/play/current/answer',

	sendQuestRating: 'c_quest/setRating', /// ???
}

export const EMAIL_PATTERN = /^[\w.]+@[a-zA-Z_]+?(\.[a-zA-Z]{2,})*(\.[a-zA-Z]{2,})$/

export const KEYS = {
	AUTH: {
		VK: {
			appId: '5538876'
		},
		FACEBOOK: {
			// appId: '1161945170522401',
			appId: '4740522775968741',
			protocolScheme: '1161945170522401'
		}
	},
	GOOGLE: {
		key: 'AIzaSyBw88d3ysoIDJUt1VotBvi_wbMjBzXeg_Q'
	}
}
