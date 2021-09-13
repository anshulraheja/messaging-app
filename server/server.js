// const httpServer = require("http").createServer();
const PORT = process.env.PORT || 5000
const io = require("socket.io")(PORT,{
  cors: {
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
  }
});

io.on("connection", (socket) => {
  const id = socket.handshake.query.id
  socket.join(id)
  console.log('connection joined')
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

// httpServer.listen(5000, ()=> console.log('connected to 5000'));