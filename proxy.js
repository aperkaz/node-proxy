const https = require('https');
const http = require('http');
const fs = require('fs');
const proxy = require('http-proxy');

const port = process.env.PORT || 8011;

const proxyRoutes = [
	{ sourceUrlRegex: /^.*\/test-endpoint$/g, targetUrl: 'http://localhost:8080' }
];

const httpsProxy = proxy.createProxyServer({
	agent: https.globalAgent,
	secure: false,
	ssl: {
		key: fs.readFileSync('server.key', 'utf-8'),
		cert: fs.readFileSync('server.crt', 'utf-8')
	},
	ws: true,
	xfwd: true,
	changeOrigin: true,
	cookieDomainRewrite: ''
});

const httpProxy = proxy.createProxyServer({ changeOrigin: true });

const onProxyError = (err, req, res) => {
	console.error(err);
	res.writeHead(500, {
		'Content-Type': 'text/plain'
	});
	res.end('Proxying failed');
};

httpProxy.on('error', onProxyError);
httpsProxy.on('error', onProxyError);

// create custom server that will route the requests
var server = http.createServer((req, res) => {
	proxyRoutes.some(proxyRoute => {
		if (req.url.match(proxyRoute.sourceUrlRegex)) {
			console.log(`-> ${req.url} => ${proxyRoute.targetUrl + req.url}`);
			if (proxyRoute.targetUrl.startsWith('https')) {
				httpsProxy.web(req, res, { target: proxyRoute.targetUrl });
			} else {
				httpProxy.web(req, res, { target: proxyRoute.targetUrl });
			}
			return true;
		}
	});
});

server.listen(port);
console.log('\x1b[32m%s\x1b[0m', '\nnode-proxy server running on:', 'http://localhost:' + port, '\n');
