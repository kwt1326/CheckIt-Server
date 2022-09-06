#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = __importDefault(require("http"));
var express_1 = __importDefault(require("./express"));
function serverRun(type, appProps) {
    /**
     * Get port from environment and store in Express.
     */
    var app = type === 'express' ? (0, express_1.default)(appProps) : {};
    var port = normalizePort(process.env.PORT || '3000');
    app.set('port', port);
    /**
     * Create HTTP server.
     */
    var server = http_1.default.createServer(app);
    /**
     * Listen on provided port, on all network interfaces.
     */
    server.listen(port);
    server.on('error', onError);
    server.on('listening', onListening);
    /**
     * Normalize a port into a number, string, or false.
     */
    function normalizePort(val) {
        var port = parseInt(val, 10);
        if (isNaN(port)) {
            // named pipe
            return val;
        }
        if (port >= 0) {
            // port number
            return port;
        }
        return false;
    }
    /**
     * Event listener for HTTP server "error" event.
     */
    function onError(error) {
        if (error.syscall !== 'listen') {
            throw error;
        }
        var bind = typeof port === 'string'
            ? 'Pipe ' + port
            : 'Port ' + port;
        // handle specific listen errors with friendly messages
        switch (error.code) {
            case 'EACCES':
                console.error(bind + ' requires elevated privileges');
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error(bind + ' is already in use');
                process.exit(1);
                break;
            default:
                throw error;
        }
    }
    /**
     * Event listener for HTTP server "listening" event.
     */
    function onListening() {
        var addr = server.address();
        if (addr) {
            var bind = typeof addr === 'string'
                ? 'pipe ' + addr
                : 'port ' + addr.port;
            console.log('Listening on ' + bind);
        }
    }
}
;
exports.default = serverRun;
//# sourceMappingURL=index.js.map