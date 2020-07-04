const { remove } = require('lodash')

const allowed = new Set(['👎', '👍', '➕'])

const filter = (reaction, user) => true || allowed.has(reaction.emoji.name)

module.exports = async (args, adminMessage, state) => {
	try {
		const title = args.join(' ') || 'Untitled Queue'
		state.queue = []
		state.timer = null
		const botMessage = await adminMessage.channel.send(title)
		// const collected = await message.awaitReactions(filter, { time: 15000 })
		// console.log(collected)
		const collector = botMessage.createReactionCollector(filter, {
			dispose: true,
		})
		console.log(collector)
		collector.on('collect', (reaction, user) => {
			state.queue.push(user.id)
			console.log('Added to queue', reaction.emoji.name, user)
		})
		collector.on('remove', (reaction, user) => {
			remove(state.queue, user.id)
			console.log('Removed from queue', reaction, user.id)
		})
		collector.on('end', (collected) =>
			console.log(`Collected ${collected.size} items`)
		)
	} catch (e) {
		console.error(e)
	}
}
