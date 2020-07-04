const { readFileSync } = require('fs')
const commands = require('./commands')
const Discord = require('discord.js')
const { version } = require('../package.json')
const client = new Discord.Client()

const prefix = '!qb'
const config = JSON.parse(readFileSync('./config.json', 'utf8'))
const { token } = config
const state = {
	queue: [],
	timer: null,
}

console.log('Starting...')
client.once('ready', () => {
	console.log('Started!')
})

client.on('message', (adminMessage) => {
	const [qb, command, ...args] = adminMessage.content.split(/\s+/)
	/* TODO
	Implement remaining commands and timer functionality
	*/
	if (qb === prefix) {
		if (command in commands) {
			commands[command](args, adminMessage, state)
		} else {
			sendHelp(adminMessage)
		}
	}
})

client.login(token)

const help = `queue-bot ${version}
Usage: ${prefix} [command] [args]
Commands:
  ${prefix} new [title] - Starts a new queue, with a dedicated message that can be reacted to.
    If there is a running queue, this replaces it with a new one. Only one queue/timer can be running currently.
  ${prefix} start [userCount] [timeToRespond] - Starts a timer and messages everyone at the top of the queue
  ${prefix} view - Prints out entire current queue
  ${prefix} stop - Cancels the timer but leaves the queue open
  ${prefix} delete - Removes the queue`

function sendHelp(message) {
	message.channel.send(help)
}
