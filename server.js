// Dependencies:
const createServer = require('http').createServer;
const nodeStaticServer = require('node-static').Server;
const webmake = require('webmake');


// Project path:
// Public folder path (statics)
const staticsPath = __dirname;

// Server port:
const port = 8000;

const staticServer = new nodeStaticServer(staticsPath);

const bundles = {
	'/js/all.js': __dirname + '/src/bits.js'
};

// Initialize http server
createServer(function (req, res) {
	// Start the flow (new Stream API demands that)
	req.resume();
	// Respond to request
	req.on('end', function () {
		if ( bundles[req.url] ) {
			// Generate bundle with Webmake
			// let programPath = bundles[req.url];
			// Send headers
			res.writeHead(200, {
				'Content-Type': 'application/javascript; charset=utf-8',
				// Do not cache generated bundle
				'Cache-Control': 'no-cache'
			});

			const time = Date.now();
			webmake(bundles[req.url], {cache: true}, function (err, content) {
				if (err) {
					console.error("Webmake error: " + err.message);
					res.end('console.error("Webmake error: ' + err.message + '");');
					return;
				}

				// Send script
				console.log("Webmake OK (" + ((Date.now() - time) / 1000).toFixed(3) + "s)");
				res.end(content);
			});
		} else {
			staticServer.serve(req, res);
		}
	});
}).listen(port);

console.log("Server started");
