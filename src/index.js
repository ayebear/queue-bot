const { readFileSync } = require('fs')
const commands = require('./commands')
const Discord = require('discord.js')
const client = new Discord.Client()

const config = JSON.parse(readFileSync('./config.json', 'utf8'))
const { token } = config

console.log('Starting...')
client.once('ready', () => {
	console.log('Started!')
})

client.on('message', (message) => {
	const [command, ...args] = message.content.split(/\s+/)
	/* TODO
	Add custom prefix that isn't global (!qb new)
	Add help command as fallback for unrecognized commands
	Add reaction parsing to gather user IDs, in order of reacting

	Help:
	!qb new [title] - Starts a new queue, with a dedicated message that can be reacted to.
		If there is a running queue, this replaces it with a new one. Only one queue/timer can be running currently.
	!qb start [userCount] [timeToRespond] - Starts a timer and messages everyone at the top of the queue
	!qb stop - Cancels the timer but leaves the queue open
	!qb delete - Removes the queue
	*/
	if (command.startsWith('!')) {
		const name = command.slice(1)
		if (name in commands) {
			commands[name](args, message)
		}
	}
})

client.login(token)
