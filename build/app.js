"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var dotenv_1 = __importDefault(require("dotenv"));
var mongoose_1 = __importDefault(require("mongoose"));
var server_1 = __importDefault(require("./framework/server"));
var router_1 = __importDefault(require("./framework/modules/router"));
var models_1 = require("./models");
var apiSchemaJson = require(path_1.default.join(__dirname, 'public/json/api.json'));
var apiSchema = Object.freeze(apiSchemaJson);
dotenv_1.default.config();
var _a = process.env, MONGO_DB_URI = _a.MONGO_DB_URI, NODE_ENV = _a.NODE_ENV;
var mongoUrl = NODE_ENV === 'development' ? 'mongodb://localhost:27017/checkit' : MONGO_DB_URI || '';
var routerModuleHandler = function (params) {
    var request = params.request, response = params.response, key = params.key, spec = params.spec;
};
(0, models_1.createModel)();
mongoose_1.default
    .connect(mongoUrl, { retryWrites: true })
    .then(function () { return console.log('successfully connect mongo db'); })
    .catch(function (e) { console.error(e); console.log('failed db connection'); });
(0, server_1.default)('express', { modules: [(0, router_1.default)({ schema: apiSchema, handler: routerModuleHandler })] });
//# sourceMappingURL=app.js.map