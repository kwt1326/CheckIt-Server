"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function get(_a) {
    var req = _a.req, res = _a.res, spec = _a.spec;
    res.status(200).json(spec.response);
    res.end();
}
exports.default = get;
//# sourceMappingURL=get.js.map