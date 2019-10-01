"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require("mysql");
class MySQL {
    constructor() {
        this.conectado = false;
        console.log('conectado mysql');
        this.cnn = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'node'
        });
        this.conectarDB();
    }
    static get instance() {
        return this._instance || (this._instance = new MySQL());
    }
    static execQuery(query, callback) {
        this.instance.cnn.query(query, (err, results, fields) => {
            if (err) {
                console.log('Error en query', err);
                return callback(err);
            }
            if (results.length === 0) {
                callback('No se devolvieron datos');
            }
            else {
                callback(null, results);
            }
        });
    }
    conectarDB() {
        this.cnn.connect((err) => {
            if (err) {
                console.log(err.message);
                return;
            }
            this.conectado = true;
            console.log('BBDD online');
        });
    }
}
exports.default = MySQL;
