const bodyParser = require('body-parser');

const app = require('express')();
const httpServer = require('http').createServer(app);


const io = require('socket.io')(httpServer, {
  cors: {origin : '*'}
});

const port = process.env.PORT || 3000;

io.on('connection', (socket) => {

  console.log('a user connected');

  socket.on('data', (data) => {
    io.emit('data', data);
  });

  socket.on('disconnect', () => {
    console.log('a user disconnected!');
  });
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(require('./api/controller'))

httpServer.listen(port, () => console.log(`listening on port ${port}`));
