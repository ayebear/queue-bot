const { role, timerEmoji } = require('../config')
const { parseTime, formatUsers } = require('../utils')

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
		state.collector.on('collect', (reaction, user) => {
			// Add role to user
			user.roles.add(roleRef)
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
