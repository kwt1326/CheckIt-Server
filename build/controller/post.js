"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function post(_a) {
    // Object.keys(spec).includes()
    var req = _a.req, res = _a.res, spec = _a.spec;
    res.status(200).json(spec.response);
    res.end();
}
exports.default = post;
//# sourceMappingURL=post.js.map