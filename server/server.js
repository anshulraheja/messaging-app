const PORT = process.env.PORT || 5000;
const INDEX = '../client/public/index.html'

const io = require('socket.io')(PORT,{
  cors: {
      origin: INDEX,
      methods:["GET", "POST"],
  },
});

io.on('connection', socket => {
  const id = socket.handshake.query.id
  socket.join(id)
  
  socket.on('send-message', ({ recipients, text }) => {
    recipients.forEach(recipient => {
      const newRecipients = recipients.filter(r => r !== recipient)
      newRecipients.push(id)
      socket.broadcast.to(recipient).emit('receive-message', {
        recipients: newRecipients, sender: id, text
      })
    })
  })
})