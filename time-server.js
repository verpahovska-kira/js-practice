const net = require('net')

function zeroFill(i) {
  return i < 10 ? '0' + i : i
}

function getTime() {
  const d = new Date()

  return d.getFullYear() + '-' +
    zeroFill(d.getMonth() + 1) + '-' +
    zeroFill(d.getDate()) + ' ' +
    zeroFill(d.getHours()) + ':' +
    zeroFill(d.getMinutes())
}

const server = net.createServer(function (socket) {
  socket.end(getTime() + '\n')
})

server.listen(process.argv[2])