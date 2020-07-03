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
	if (command.startsWith('!')) {
		const name = command.slice(1)
		if (name in commands) {
			commands[name](args, message)
		}
	}
})

client.login(token)
