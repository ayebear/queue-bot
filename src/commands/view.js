const { formatUsers } = require('../utils')

module.exports = async (args, adminMessage, state) => {
	try {
		const length = state.queue.length
		const queueString =
			`There ${
				length === 1 ? 'is 1 user' : `are ${length} users`
			} in the queue${length === 0 ? '.' : ':'}\n` +
			formatUsers(state.queue)
		adminMessage.channel.send(queueString)
		return true
	} catch (e) {
		console.error(e)
	}
	return false
}
