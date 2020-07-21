const commands = require('./commands')
const { sendHelp } = require('./help')
const Discord = require('discord.js')
const client = new Discord.Client()

const token = process.env.TOKEN
const prefix = process.env.PREFIX

const state = {
	queue: [],
	timer: null,
}

console.log('Starting...')
client.once('ready', () => {
	console.log('Started!')
})

// Handle admin messages
client.on('message', async (adminMessage) => {
	const [qb, command, ...args] = adminMessage.content.split(/\s+/)
	/* TODO
	Implement remaining commands and timer functionality
	Implement requested role assigning features
	Save state to a DB or json file, restore previous state on startup (get message ref, etc. or invalidate state)
	Only accept admin controls from certain users
	Add README
	Setup automatic deploy
	*/
	if (qb === prefix) {
		const status =
			command in commands && commands[command](args, adminMessage, state)
		if (!status) {
			sendHelp(adminMessage)
		}
	}
})

client.login(token)
