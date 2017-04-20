"use strict";

/**
 * Created by hartex
 */
const http = require('http');

const proxyApp = require('./proxyApp');

let mainServer = http.createServer(proxyApp);
mainServer.listen(8080);

mainServer.on('error', function (error, req, res) {
    let json;
    console.log('proxy error', error);
    if (!res.headersSent) {
        res.writeHead(500, {'content-type': 'application/json'});
    }

    json = {error: 'proxy_error', reason: error.message};
    res.end(JSON.stringify(json));
});
