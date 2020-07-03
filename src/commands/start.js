module.exports = (args, message) => {
	message.channel.send('start ' + args.join(', '))
}
