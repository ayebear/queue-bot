module.exports = async (args, adminMessage, state) => {
	try {
		const length = state.queue.length
		const queueString =
			`There ${
				length === 1 ? 'is one user' : `are ${length} users`
			} in the queue${length === 0 ? '.' : ':'}\n` +
			state.queue
				.map((user, i) => `${i + 1}. ${user.username}`)
				.join('\n')
		adminMessage.channel.send(queueString)
		return true
	} catch (e) {
		console.error(e)
	}
	return false
}
