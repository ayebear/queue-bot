const { remove } = require('lodash')

// const allowed = new Set(['👎', '👍', '➕'])
const emoji = '👍'

module.exports = async (args, adminMessage, state) => {
	try {
		const title = args.join(' ') || 'Untitled Queue'
		state.queue = []
		state.timer = null

		// Setup queue message for people to react to
		const botMessage = await adminMessage.channel.send(
			`New queue created with title: "${title}".\nPlease react with ${emoji} to be added to the queue.`
		)
		await botMessage.react(emoji)

		// Handle reaction events, update queue
		const filter = (reaction, user) =>
			reaction.emoji.name === emoji && user.id !== botMessage.author.id
		const collector = botMessage.createReactionCollector(filter, {
			dispose: true,
		})
		collector.on('collect', (reaction, user) => {
			state.queue.push(user.id)
			user.send(
				`You are at position ${state.queue.length} of the queue titled: "${title}"`
			)
		})
		collector.on('remove', (reaction, user) => {
			remove(state.queue, user.id)
			user.send(`You were removed from the queue titled: "${title}"`)
		})
		collector.on('end', (collected) =>
			console.log(`Collected ${collected.size} items`)
		)
	} catch (e) {
		console.error(e)
	}
}
