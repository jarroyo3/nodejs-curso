import mysql = require('mysql')

export default class MySQL {
  private static _instance: MySQL;

  cnn: mysql.Connection;
  conectado: boolean = false;

  constructor() {
    console.log('conectado mysql');
    this.cnn = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'node'
    })

    this.conectarDB();
  }

  public static get instance() {
    return this._instance || (this._instance = new MySQL());
  }

  static execQuery (query: string, callback: Function) {
    this.instance.cnn.query(query, (err, results: Object[], fields) => {
      if (err) {
        console.log('Error en query', err);
        return callback(err);
      }

      if (results.length === 0) {
        callback('No se devolvieron datos');
      } else {
        callback(null, results);
      }
    })
  }

  private conectarDB() {
    this.cnn.connect((err:mysql.MysqlError) => {
      if (err) {
        console.log(err.message);
        return;
      }

      this.conectado = true;
      console.log('BBDD online');

    })
  }

}