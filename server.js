const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
})

server.listen(3000, () => console.log('Server running on localhost at port 3000.'))
