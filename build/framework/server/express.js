"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var http_errors_1 = __importDefault(require("http-errors"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
function expressApp(options) {
    var modules = options.modules;
    var app = (0, express_1.default)();
    app.use((0, morgan_1.default)('dev'));
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: false }));
    app.use((0, cookie_parser_1.default)());
    app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
    for (var _i = 0, modules_1 = modules; _i < modules_1.length; _i++) {
        var module_1 = modules_1[_i];
        app.use(module_1);
    }
    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
        next((0, http_errors_1.default)(404));
    });
    // error handler
    app.use(function (err, req, res, next) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};
        // render the error page
        res.status(err.status || 500);
        res.send({ 'error': err.message });
    });
    return app;
}
exports.default = expressApp;
//# sourceMappingURL=express.js.map