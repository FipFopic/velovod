// export class StopWatch {
// 	initialDate: Date
//
// 	constructor () {
// 		this.initialDate = new Date()
// 	}
//
// 	initNewDate () {
// 		this.initialDate = new Date()
// 	}
//
// 	get actualValue () {
// 		const actualDate = new Date()
//
// 		// console.log('actualDate', actualDate.getSeconds())
// 		// console.log('initialDate', this.initialDate.getSeconds())
//
// 		return {
// 			hours: actualDate.getHours() - this.initialDate.getHours(),
// 			minutes: actualDate.getMinutes() - this.initialDate.getMinutes(),
// 			seconds: actualDate.getSeconds() - this.initialDate.getSeconds()
// 		}
// 	}
// }
export class StopWatch {
	seconds: number
	minutes: number
	hours: number
	value: string
	stopWatchInterval: any

	constructor () {
		this.seconds = 0
		this.minutes = 0
		this.hours = 0
		this.value = '' + this.seconds + this.minutes + this.hours
	}

	stop () {
		this.seconds = 0
		this.minutes = 0
		this.hours = 0
		clearInterval(this.stopWatchInterval)
	}

	start () {
		this.stopWatchInterval = setInterval(() => {
			this.seconds++

			if (this.seconds > 59) {
				this.seconds = 0
				this.minutes++
			}

			if (this.minutes > 59) {
				this.minutes = 0
				this.hours++
			}
		}, 1000)
	}

	get actualValue () {
		this.value = ''

		this.value += (this.hours < 10) ? `0${this.hours}:` : `${this.hours}:`
		this.value += (this.minutes < 10) ? `0${this.minutes}:` : `${this.minutes}:`
		this.value += (this.seconds < 10) ? `0${this.seconds}` : `${this.seconds}`

		return this.value
	}
}
