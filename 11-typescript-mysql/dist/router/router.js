"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mysql_1 = __importDefault(require("../public/mysql"));
let router = express_1.Router();
router.get('/heroes', (req, res) => {
    console.log('ruta heroes');
    // Escapar 
    // const idEscapado = MySQL.instance.cnn.escape(parametroGetID);
    const query = `
    SELECT *
    FROM heroes
  `;
    mysql_1.default.execQuery(query, (err, heroes) => {
        if (err) {
            res.status(400).json({
                ok: false,
                message: 'TODO KKKOOO'
            });
        }
        res.status(200).json({
            ok: true,
            message: 'TODO OK',
            heroes
        });
    });
});
router.get('/heroes:id', (req, res) => {
    // Escapar 
    const id = req.params.id;
    const idEscapado = mysql_1.default.instance.cnn.escape(id);
    const query = `
    SELECT *
    FROM heroes
    WHERE id = ${idEscapado}
  `;
    mysql_1.default.execQuery(query, (err, heroes) => {
        if (err) {
            res.status(400).json({
                ok: false,
                message: 'TODO KKKOOO'
            });
        }
        res.json({
            ok: true,
            message: 'TODO OK',
            heroes
        });
    });
});
exports.default = router;
