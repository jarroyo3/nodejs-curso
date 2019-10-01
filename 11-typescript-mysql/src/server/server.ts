import express = require('express');
import path  from 'path';


export default class Server {

  public app: express.Application;
  public port:number;

  constructor(puerto:number) {
    this.port = puerto;
    this.app = express();
  }

  static init (port:number) {
    return new Server(port);
  }

  private publicFolder() {
    const publicFolder = path.resolve(__dirname, '../public');
    this.app.use(express.static(publicFolder));
  }

  start (callback:Function) {
    this.app.listen(this.port);
    this.publicFolder();
  }
}