"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var path_1 = __importDefault(require("path"));
var controller_1 = __importDefault(require("../controller"));
var json = require(path_1.default.join(__dirname, '../public/json/api.json'));
var apis = Object.freeze(json);
var router = function (req, res) {
    var apiValues = Object.values(apis);
    var spec = apiValues.find(function (api) { return api.url === req.url; });
    if (spec) {
        var method = spec.method;
        controller_1.default[method]({ req: req, res: res, spec: spec });
        return res.end();
    }
    if (req.url === '/') {
        res.send('server running!');
        return res.end();
    }
    res.status(401).json({ fail: { statusCode: '401', json: 'Not found request url' } });
    return res.end();
};
exports.router = router;
//# sourceMappingURL=index.js.map