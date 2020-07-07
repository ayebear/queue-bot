const sd = require('simple-duration')

// Returns a formatted string of users in the queue
// TODO: Use rich embeds
async function formatUsers(queue, message, mention = false) {
	const userStrings = await Promise.all(
		queue.map(async (user, i) => {
			const member = await message.guild.members.fetch(user.id)
			const displayName = member.displayName || user.username
			return `${i + 1}. ${mention ? '@' : ''}${displayName}`
		})
	)
	return userStrings.join('\n')
}

// Returns time in seconds, as well as formatted time in mm:ss
function parseTime(input) {
	try {
		const time = sd.parse(input)
		const formatted = sd.stringify(time)
		return { time: time * 1000, formatted }
	} catch (e) {
		return { time: 0, formatted: '00:00' }
	}
}

module.exports = {
	formatUsers,
	parseTime,
}
