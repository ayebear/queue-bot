module.exports = (args, message) => {
	message.channel.send('stop ' + args.join(', '))
}
