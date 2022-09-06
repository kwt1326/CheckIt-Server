"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @description json schema router module - API 스펙을 파싱하여 경로를 라우팅합니다.
 * @param req
 * @param res
 * @returns
 */
var router = function (_a) {
    var schema = _a.schema, handler = _a.handler;
    return function (request, response) {
        var spec = Object.entries(schema).find(function (_a) {
            var _spec = _a[1];
            return _spec.url === request.url;
        });
        if (!spec)
            return response.end();
        return handler({ request: request, response: response, key: spec[0], spec: spec[1] });
    };
};
exports.default = router;
//# sourceMappingURL=index.js.map