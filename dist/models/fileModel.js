"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.File = void 0;
const mongoose_1 = require("mongoose");
const slugify_1 = __importDefault(require("slugify"));
const fileSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, 'A file requires a name'],
    },
    description: {
        type: String,
        required: [true, 'A file requires a description'],
    },
    fileType: {
        type: String,
        enum: ['PDF', 'AUDIO', 'IMAGE', 'VIDEO'],
        required: [true, 'file requires a fileTypes'],
    },
    fileUrl: {
        type: String,
        required: [true, 'file requires a fileUrl'],
    },
    path: {
        type: String,
        required: [true, 'A file requires a path'],
    },
    emailCount: {
        type: Number,
        default: 0,
    },
    downloadCount: {
        type: Number,
        default: 0,
    },
    slug: String,
});
fileSchema.pre('save', function (next) {
    this.slug = (0, slugify_1.default)(this.title, { lower: true });
    next();
});
fileSchema.pre(/^find/, function (next) {
    this.select('-__v');
    next();
});
exports.File = (0, mongoose_1.model)('File', fileSchema);
//# sourceMappingURL=fileModel.js.map