"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteData = exports.updateData = exports.fetchAllData = exports.createData = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// ================= ADD DATA =================
const createData = (req, res) => {
    let datas = "";
    req.on("data", (chunk) => {
        datas += chunk;
    });
    req.on("end", () => {
        let databaseFolder = path_1.default.join(__dirname, "database");
        let databaseFile = path_1.default.join(databaseFolder, "database.json");
        // ============ create database dynamically ============
        if (!fs_1.default.existsSync(databaseFolder)) {
            fs_1.default.mkdirSync(databaseFolder);
        }
        if (!fs_1.default.existsSync(databaseFile)) {
            fs_1.default.writeFileSync(databaseFile, " ");
        }
        const work = JSON.parse(datas);
        console.log(work);
        return fs_1.default.readFile(path_1.default.join(__dirname, "database/database.json"), "utf-8", (err, infos) => {
            if (err) {
                res.writeHead(500, { "Content-Type": "application/json" });
                res.end(JSON.stringify({
                    success: false,
                    error: err,
                }));
            }
            else {
                let organisation = [];
                try {
                    organisation = JSON.parse(infos);
                }
                catch (parseError) {
                    organisation = [];
                }
                work.createdAt = new Date();
                work.updatedAt = new Date();
                work.noOfEmployees = work.employees.length;
                if (organisation.length === 0) {
                    work.id = 1;
                }
                else {
                    let Ids = organisation.map((a) => a.id);
                    let newId = Math.max(...Ids);
                    work.id = newId + 1;
                }
                organisation.push(work);
                console.log("iyke", organisation);
                // write back into database
                fs_1.default.writeFile(path_1.default.join(__dirname, "database/database.json"), JSON.stringify(organisation, null, 2), (err) => {
                    if (err) {
                        res.writeHead(500, { "Content-Type": "application/json" });
                        res.end(JSON.stringify({
                            success: false,
                            error: err,
                        }));
                    }
                    else {
                        res.writeHead(200, { "Content-Type": "application/json" });
                        res.end(JSON.stringify({
                            success: true,
                            message: organisation,
                        }));
                    }
                });
            }
        });
    });
};
exports.createData = createData;
// ================= GET ALL DATA =================
const fetchAllData = (req, res) => {
    return fs_1.default.readFile(path_1.default.join(__dirname, "database/database.json"), "utf-8", (err, info) => {
        if (err) {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({
                success: false,
                error: err,
            }));
        }
        else {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({
                success: true,
                data: JSON.parse(info),
            }));
        }
    });
};
exports.fetchAllData = fetchAllData;
// ================= UPDATE DATA =================
const updateData = (req, res) => {
    let datas = "";
    req.on("data", (chunk) => {
        datas += chunk;
    });
    req.on("end", () => {
        let work = JSON.parse(datas);
        return fs_1.default.readFile(path_1.default.join(__dirname, "database/database.json"), "utf8", (err, info) => {
            if (err) {
                res.writeHead(500, { "Content-Type": "application/json" });
                res.end(JSON.stringify({
                    success: false,
                    error: err,
                }));
            }
            else {
                let organisation = JSON.parse(info);
                let fetchedDataIndex = organisation.findIndex((a) => a.id === work.id);
                organisation[fetchedDataIndex] = work;
                fs_1.default.writeFile(path_1.default.join(__dirname, "database/database.json"), JSON.stringify(organisation, null, 2), (err) => {
                    if (err) {
                        res.writeHead(500, { "Content-Type": "application/json" });
                        res.end(JSON.stringify({
                            success: false,
                            error: err,
                        }));
                    }
                    else {
                        res.writeHead(200, { "Content-Type": "application/json" });
                        res.end(JSON.stringify({
                            success: true,
                            message: organisation,
                        }));
                    }
                });
            }
        });
    });
};
exports.updateData = updateData;
// ================= DELETE DATA =================
const deleteData = (req, res) => {
    let datas = "";
    req.on("data", (chunk) => {
        datas += chunk;
    });
    req.on("end", () => {
        let work = JSON.parse(datas);
        return fs_1.default.readFile(path_1.default.join(__dirname, "./database/database.json"), "utf8", (err, info) => {
            if (err) {
                res.writeHead(500, { "Content-Type": "application/json" });
                res.end(JSON.stringify({
                    success: false,
                    error: err
                }));
            }
            else {
                let organisation = JSON.parse(info);
                let fetchedDataIndex = organisation.findIndex((a) => a.id === work.id);
                let deleteData = organisation.find((a) => a.id = work.id);
                organisation.splice(fetchedDataIndex, 1);
                fs_1.default.writeFile(path_1.default.join(__dirname, "./database/database.json"), JSON.stringify(organisation, null, 2), (err) => {
                    if (err) {
                        res.writeHead(500, { "Content-Type": "application/json" });
                        res.end(JSON.stringify({
                            success: false,
                            error: err
                        }));
                    }
                    else {
                        res.writeHead(200, { "Content-Type": "application/json" });
                        res.end(JSON.stringify({
                            success: true,
                            message: organisation
                        }));
                    }
                });
            }
        });
    });
};
exports.deleteData = deleteData;
