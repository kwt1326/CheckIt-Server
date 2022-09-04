"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var http_errors_1 = __importDefault(require("http-errors"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var mongoose_1 = __importDefault(require("mongoose"));
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var dotenv_1 = __importDefault(require("dotenv"));
var index_1 = require("./routes/index");
var models_1 = require("./models");
dotenv_1.default.config();
var _a = process.env, MONGO_DB_URI = _a.MONGO_DB_URI, NODE_ENV = _a.NODE_ENV;
var mongoUrl = NODE_ENV === 'development' ? 'mongodb://localhost:27017/checkit' : MONGO_DB_URI || '';
(0, models_1.createModel)();
mongoose_1.default
    .connect(mongoUrl, { retryWrites: true })
    .then(function () { return console.log('successfully connect mongo db'); })
    .catch(function (e) { console.error(e); console.log('failed db connection'); });
var db = mongoose_1.default.connection;
var app = (0, express_1.default)();
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use(index_1.router);
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
exports.default = app;
//# sourceMappingURL=app.js.map