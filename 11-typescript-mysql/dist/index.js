"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server/server"));
const router_1 = __importDefault(require("./router/router"));
const mysql_1 = __importDefault(require("./public/mysql"));
const server = server_1.default.init(3000);
server.app.use(router_1.default);
const mysql = mysql_1.default.instance;
console.log('entraa');
server.start(() => {
    console.log('servidor corriendo en el puerto 3000');
});