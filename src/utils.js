const sd = require('simple-duration')

// Returns a formatted string of users in the queue
// TODO: Use rich embeds
function formatUsers(queue) {
	return queue.map((user, i) => `${i + 1}. ${user.username}`).join('\n')
}

// Returns time in seconds, as well as formatted time in mm:ss
function parseTime(input) {
	try {
		const time = sd.parse(input)
		const formatted = sd.stringify(time)
		return { time, formatted }
	} catch (e) {
		return { time: 0, formatted: '00:00' }
	}
}

module.exports = {
	formatUsers,
	parseTime,
}
