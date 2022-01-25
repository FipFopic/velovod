export class StopWatch {
	initialDate: Date

	constructor () {
		this.initialDate = new Date()
	}

	initNewDate () {
		this.initialDate = new Date()
	}

	get actualValue () {
		const actualDate = new Date()

		// console.log('actualDate', actualDate.getSeconds())
		// console.log('initialDate', this.initialDate.getSeconds())

		return {
			hours: actualDate.getHours() - this.initialDate.getHours(),
			minutes: actualDate.getMinutes() - this.initialDate.getMinutes(),
			seconds: actualDate.getSeconds() - this.initialDate.getSeconds()
		}
	}
}
