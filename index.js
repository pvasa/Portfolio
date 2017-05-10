let // PORT and IP where server listens
    PORT = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    IP = process.env.IP || process.env.OPENSHIFT_NODEJS_IP || `0.0.0.0`,
    express = require(`express`), // Express server
    server = express(),
    compression = require(`compression`), // Compress network responses
    bodyParser = require(`body-parser`), // Encoded body parser
    log = function (message) {
        console.log(`\n${message}`);
    };

server.use(compression());

/**
 * Add security headers
 * https://www.npmjs.com/package/helmet
 */
let helmet = require(`helmet`);
server.use(helmet());

/**
 * Parse encoded bodies
 * https://www.npmjs.com/package/body-parser
 */
server.use( bodyParser.json() );       // to support JSON-encoded bodies
server.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

// Use pug for static content
server.set(`view engine`, `pug`);
server.set(`views`, `./views`);
server.use(`/`, express.static(__dirname + `/views`));
server.use(`/`, require(`./bin/ep-get.js`));

// Redirect /views request to /
server.use(`/views`, function (req, res) {
    res.redirect(`/`);
});

server.listen(PORT, IP, function() {
    log(`Server home: http://${IP}:${PORT}/`);
});
