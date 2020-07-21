const { name, version } = require('../package.json')

const prefix = process.env.PREFIX

function sendHelp(message) {
	const help = `${name} ${version}
Usage: ${prefix} [command] [args]
Commands:
  ${prefix} new [title] - Starts a new queue, with a dedicated message that can be reacted to.
    If there is a running queue, this replaces it with a new one. Only one queue/timer can be running currently.
  (WIP) ${prefix} start [userCount] [timeToRespond] - Starts a timer and messages everyone at the top of the queue
  ${prefix} view - Prints out entire current queue
  (TODO) ${prefix} stop - Cancels the timer but leaves the queue open
  (TODO) ${prefix} delete - Removes the queue`

	message.channel.send(help)
}

module.exports = {
	sendHelp,
}
