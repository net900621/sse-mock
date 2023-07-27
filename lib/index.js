"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebpackWsPlugin = exports.WebpackSsePlugin = void 0;
// eslint-disable-next-line import/no-commonjs, @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
var http = require('http');
// eslint-disable-next-line import/no-commonjs, @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
var WebSocket = require('ws');
var sseStart = function (_a) {
    var port = _a.port, time = _a.time, data = _a.data;
    http
        .createServer(function (req, res) {
        var fileName = ".".concat(req.url);
        if (fileName === './stream') {
            res.writeHead(200, {
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache',
                Connection: 'keep-alive',
                'Access-Control-Allow-Origin': '*',
            });
            res.write('retry: 10000\n');
            res.write('event: connecttime\n');
            var interval_1 = setInterval(function () {
                res.write("data: ".concat(data || new Date(), "\n\n"));
            }, time || 3000);
            req.connection.addListener('close', function () {
                clearInterval(interval_1);
            }, false);
        }
    })
        .listen(port || 8844, '127.0.0.1');
};
var wsStart = function (_a) {
    var port = _a.port, time = _a.time, data = _a.data;
    // 打开一个WebSocket:
    var server = new WebSocket.Server({ port: port || 8844, path: '/chat' });
    server.on('open', function open() {
        console.log('connected');
    });
    server.on('close', function close() {
        console.log('disconnected');
    });
    server.on('error', function (error) {
        console.log('error is:', error);
    });
    server.on('connection', function connection(ws, req) {
        var ip = req.connection.remoteAddress;
        var port = req.connection.remotePort;
        var clientName = "".concat(ip).concat(port);
        console.log('%s is connected', clientName);
        // 发送欢迎信息给客户端
        ws.onmessage = function (event) {
            console.log(event.data, 'aaaaaa');
        };
        ws.on('error', function (err) {
            console.log(err, '无法连接至服务器');
        });
        // 给服务器发送一个字符串:
        setInterval(function () {
            ws.send(data || 'Hello!');
        }, time || 3000);
    });
};
var WebpackSsePlugin = /** @class */ (function () {
    // 构造函数，接收插件的配置项 options
    function WebpackSsePlugin(options) {
        // console.log(options, 111111);
        sseStart(options);
    }
    // 插件安装时会调用 apply，并传入 compiler
    WebpackSsePlugin.prototype.apply = function (compiler) {
        console.log(compiler);
        // 获取 comolier 独享，可以监听事件钩子
        // 功能开发 ...
    };
    return WebpackSsePlugin;
}());
exports.WebpackSsePlugin = WebpackSsePlugin;
var WebpackWsPlugin = /** @class */ (function () {
    // 构造函数，接收插件的配置项 options
    function WebpackWsPlugin(options) {
        // console.log(options, 111111);
        wsStart(options);
    }
    // 插件安装时会调用 apply，并传入 compiler
    WebpackWsPlugin.prototype.apply = function (compiler) {
        console.log(compiler);
        // 获取 comolier 独享，可以监听事件钩子
        // 功能开发 ...
    };
    return WebpackWsPlugin;
}());
exports.WebpackWsPlugin = WebpackWsPlugin;
