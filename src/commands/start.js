const { role } = require('../config')
const { parseTime, formatUsers } = require('../utils')

module.exports = async (args, adminMessage, state) => {
	try {
		// TODO: Add error messages
		if (state.queue.length === 0) {
			return false
		}

		// Parse input
		const [reqCount, ...reqTime] = args
		const count = parseInt(reqCount, 10) || 0
		if (count <= 0) {
			return false
		}

		// Parse requested time
		const { time, formatted } = parseTime(reqTime.join(''))
		if (time <= 0) {
			return false
		}
		// TODO: Do something with time

		// Show top users
		const startString =
			`The following ${state.queue.length} user(s) have ${formatted} to respond, to be assigned the "${role}" role:\n` +
			formatUsers(state.queue)
		adminMessage.channel.send(startString)
		return true
	} catch (e) {
		console.error(e)
	}
	return false
}
