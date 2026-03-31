const http = require('http');

const port = process.argv[2] || 3000;

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Welcome to Manual HTTP Router');
    return;
  }

  if (req.method === 'GET' && req.url === '/time') {
    const now = new Date().toISOString();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ now }));
    return;
  }

  if (req.method === 'GET' && req.url.startsWith('/echo')) {
    const url = new URL(req.url, `http://localhost:${port}`);
    const msg = url.searchParams.get('msg') || '';

    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(msg);
    return;
  }

  if (req.method === 'GET' && req.url.startsWith('/sum')) {
    const url = new URL(req.url, `http://localhost:${port}`);

    const aParam = url.searchParams.get('a');
    const bParam = url.searchParams.get('b');

    if (
      aParam === null ||
      bParam === null ||
      isNaN(Number(aParam)) ||
      isNaN(Number(bParam))
    ) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Invalid numbers' }));
      return;
    }

    const sum = Number(aParam) + Number(bParam);

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ sum }));
    return;
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Not found' }));
});

server.listen(port);