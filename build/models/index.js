"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createModel = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var auth_1 = __importDefault(require("./schema/auth"));
var doctor_1 = __importDefault(require("./schema/doctor"));
var image_1 = __importDefault(require("./schema/image"));
function createModel() {
    mongoose_1.default.model('Auth', auth_1.default);
    mongoose_1.default.model('Doctor', doctor_1.default);
    mongoose_1.default.model('Images', image_1.default);
}
exports.createModel = createModel;
//# sourceMappingURL=index.js.map