"use strict";

/**
 * Created by hartex
 */

const HttpProxyRules = require('http-proxy-rules');

const host = 'http://localhost',
    portNodeBB = ':4567',
    portApp = ':8081',
    portMain = ':8080';

let proxyRules = new HttpProxyRules({
    rules: {
        '/nodebb/api/users': host + portNodeBB + '/forum/api/v1/users',
        '/nodebb/api/login': host + portNodeBB + '/forum/api/ns/login',
        '/rea/requests': host + portApp + '/rea/requests', // REST API

        '.*/forum': host + portNodeBB + '/forum', // rule (1) nodebb
        '.*/forum/*': host + portNodeBB + '/forum',
        '/forum/*': host + portNodeBB + '/forum',
        './forum/*': host + portNodeBB + '/forum',
        '/forum': host + portNodeBB + '/forum',

        /*'.*!/nodebb/api': host + portMain + '/api/v1', // rule (2) nodebb REST api
         '.*!/nodebb/api/!*': host + portMain + '/api/v1',
         '/nodebb/api/!*': host + portMain + '/api/v1',
         './nodebb/api/!*': host + portMain + '/api/v1',
         '/nodebb/api': host + portMain + '/api/v1',*/

        //'.*/nodebb/api/login': host + portMain + '/api/ns/login', // rule (3) nodebb login REST api
        //'.*/nodebb/api/login/*': host + portMain + '/api/ns/login',
        //'/nodebb/api/login/*': host + portMain + '/api/ns/login',
        //'./nodebb/api/login/*': host + portMain + '/api/ns/login',
        //'/nodebb/api/login': host + portMain + '/api/ns/login'
    },
    default: host + portApp // default target, will be SPA
});

module.exports = proxyRules;