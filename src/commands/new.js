module.exports = (args, message, state) => {
	message.channel.send('new ' + args.join(', '))
}
