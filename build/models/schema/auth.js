"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var authSchema = new mongoose_1.default.Schema({
    email: { type: String, required: true },
    name: { type: String, required: true },
    key: { type: String, required: true },
    test: { type: String, require: false }
}, {
    timestamps: true,
});
exports.default = authSchema;
//# sourceMappingURL=auth.js.map