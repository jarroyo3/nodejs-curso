"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path_1 = __importDefault(require("path"));
class Server {
    constructor(puerto) {
        this.port = puerto;
        this.app = express();
    }
    static init(port) {
        return new Server(port);
    }
    publicFolder() {
        const publicFolder = path_1.default.resolve(__dirname, '../public');
        this.app.use(express.static(publicFolder));
    }
    start(callback) {
        this.app.listen(this.port);
        this.publicFolder();
    }
}
exports.default = Server;
