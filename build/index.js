"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var json = require(path_1.default.join(__dirname, '../public/json/api.json'));
var apis = Object.freeze(json);
var controller = function (req, res) {
    var apiValues = Object.values(apis);
    var spec = apiValues.find(function (api) { return api.url === req.url; });
    if (spec) {
        var method = spec.method;
        switch (method) {
            case "get":
                return res.send(spec.response);
            case "post":
                return res.send(spec.response);
            default:
                break;
        }
        res.send({ data: spec.response });
    }
};
// const router = methodOverride(function (req, res) {
//   console.log('TEST');
//   return controller(req, res);
//   // if (req.body && typeof req.body === 'object') {
//   //   // look in urlencoded POST bodies and delete it
//   //   var method = req.body._method
//   //   delete req.body._method
//   //   return method
//   // }
// })
module.exports = controller;
//# sourceMappingURL=index.js.map