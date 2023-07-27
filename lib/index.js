"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line import/no-commonjs, @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
var http = require('http');
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
                console.log(res, 12321);
                res.write("data: ".concat(data || new Date(), "\n\n"));
            }, time || 3000);
            req.connection.addListener('close', function () {
                clearInterval(interval_1);
            }, false);
        }
    })
        .listen(port || 8844, '127.0.0.1');
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
exports.default = WebpackSsePlugin;
