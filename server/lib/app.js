"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const engine_1 = require("./engine");
/*
implement your server code here
*/
const server = http_1.default.createServer((req, res) => {
    if (req.method === "POST" && req.url === "/data/add") {
        return engine_1.createData(req, res);
    }
    else if (req.method === "GET" && req.url === "/data") {
        return engine_1.fetchAllData(req, res);
    }
    else if (req.method === "PUT" && req.url === "/data/update") {
        return engine_1.updateData(req, res);
    }
    else if (req.method === "DELETE" && req.url === "data/delete") {
        return engine_1.deleteData(req, res);
    }
});
server.listen(3005, () => {
    console.log(`Server running on port ${3005}`);
});
