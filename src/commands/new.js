const { remove } = require('lodash')

// const allowed = new Set(['👎', '👍', '➕'])
const emoji = '👍'

module.exports = async (args, adminMessage, state) => {
	try {
		const title = args.join(' ') || 'Untitled Queue'
		if (state.collector) {
			state.collector.stop()
		}
		state.queue = []
		state.timer = null

		// Setup queue message for people to react to
		const botMessage = await adminMessage.channel.send(
			`${title}\nPlease react with ${emoji} to be added to the queue.`
		)
		await botMessage.react(emoji)

		// Handle reaction events, update queue
		const filter = (reaction, user) =>
			reaction.emoji.name === emoji && user.id !== botMessage.author.id
		state.collector = botMessage.createReactionCollector(filter, {
			dispose: true,
		})
		state.collector.on('collect', (reaction, user) => {
			state.queue.push(user)
			user.send(
				`You are at position ${state.queue.length} of the queue titled: "${title}"`
			)
		})
		state.collector.on('remove', (reaction, user) => {
			remove(state.queue, (u) => u.id === user.id)
			user.send(`You were removed from the queue titled: "${title}"`)
		})
		state.collector.on('end', (collected) =>
			console.log(`Collected ${collected.size} items`)
		)
		return true
	} catch (e) {
		console.error(e)
	}
	return false
}
