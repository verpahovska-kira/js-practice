const http = require('http')
const url = require('url')

const port = process.argv[2]

const server = http.createServer(function (req, res) {

  const parsedUrl = url.parse(req.url, true)

  const pathname = parsedUrl.pathname
  const iso = parsedUrl.query.iso

  if (!iso) return

  const date = new Date(iso)

  let result

  if (pathname === '/api/parsetime') {
    result = {
      hour: date.getHours(),
      minute: date.getMinutes(),
      second: date.getSeconds()
    }
  }

  if (pathname === '/api/unixtime') {
    result = {
      unixtime: date.getTime()
    }
  }

  if (result) {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(result))
  }

})

server.listen(port)