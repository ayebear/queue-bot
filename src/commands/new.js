module.exports = (args, message) => {
	message.channel.send('new ' + args.join(', '))
}
