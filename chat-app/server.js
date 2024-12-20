// server.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

io.on('connection', (socket) => {
  console.log('Bir kullanıcı bağlandı');
  
  socket.on('set username', (username) => {
    socket.username = username;
    console.log(`Kullanıcı adı ayarlandı: ${username}`);
  });

  socket.on('chat message', (msg) => {
    const user = socket.username || 'Anonim';
    io.emit('chat message', { user, msg });
  });

  socket.on('logout', () => {
    console.log(username + 'çıkış Yaptı')
  })

  socket.on('disconnect', () => {
    const user = socket.username
    console.log(`${user}: ayrıldı`);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor`);
});
