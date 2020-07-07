const { role, timerEmoji } = require('../config')
const { parseTime, formatUsers } = require('../utils')
const { remove } = require('lodash')

module.exports = async (args, adminMessage, state) => {
	try {
		// TODO: Add error messages (true succeeds, string shows custom error, * fallback error)
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

		// Get top users
		const topUsers = state.queue.slice(0, count)
		const topUserIds = new Set(topUsers.map((user) => user.id))

		// Get role to assign to users
		const roleRef = adminMessage.guild.roles.cache.find(
			(r) => r.name === role
		)

		// Show top users with pre-reaction
		const startString =
			`The following ${topUsers.length} user(s) have ${formatted} to react with ${timerEmoji}, to be assigned the "${role}" role:\n` +
			formatUsers(topUsers, true)
		const timerMessage = await adminMessage.channel.send(startString)
		await timerMessage.react(timerEmoji)

		// Setup a timed collector, assign roles to users that react that match the top n users
		const filter = (reaction, user) =>
			reaction.emoji.name === timerEmoji &&
			user.id !== timerMessage.author.id
		state.collector = timerMessage.createReactionCollector(filter, { time })
		state.collector.on('collect', async (reaction, user) => {
			// Make sure this is a top user
			if (topUserIds.has(user.id)) {
				// Find member from current guild
				const member = await timerMessage.guild.members.fetch(user.id)

				// Add role to user
				await member.roles.add(roleRef.id)

				// Remove user from queue
				remove(state.queue, (u) => u.id === user.id)
			}
		})
		state.collector.on('end', (collected) =>
			console.log(`Collected ${collected.size} items for start`)
		)
		return true
	} catch (e) {
		console.error(e)
	}
	return false
}
