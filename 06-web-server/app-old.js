const http = require('http');

http.createServer((req, resp) => {
        resp.writeHead(200, { 'Content-Type': 'application/json' })
        resp.write(JSON.stringify({
            nomre: 'Jorge',
            edad: 31,
            url: req.url
        }));
        resp.end();
    })
    .listen(8080);

console.log('Escuchando el puerto 8080');