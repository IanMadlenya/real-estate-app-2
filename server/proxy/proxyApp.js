"use strict";

/**
 * Created by hartex
 */

const http = require('http'),
    httpProxy = require('http-proxy'),
    express = require('express'),
    bodyParser = require('body-parser');

const proxyRules = require('./proxyRules');

let proxyApp = express();
let proxy = httpProxy.createProxyServer();

proxyApp.use(function (req, res, next) {
    try {
        if (req.url.substr(0, 18).indexOf("socket.io") > -1) {
            console.log("SOCKET.IO", req.url);
            return proxy.web(req, res, {target: 'wss://localhost:4567', ws: true}, function (e) {
                console.log('PROXY ERR', e);
            });
        } else {
            let target = proxyRules.match(req);
            if (target) {
                console.log("TARGET", target, req.url);
                return proxy.web(req, res, {
                    target: target
                }, function (e) {
                    console.log('PROXY ERR', e);
                });
            } else {
                res.sendStatus(404);
            }
        }
    } catch (e) {
        res.sendStatus(500);
    }
});

proxyApp.use(bodyParser.json());
proxyApp.use(bodyParser.urlencoded({extended: false}));

module.exports = proxyApp;