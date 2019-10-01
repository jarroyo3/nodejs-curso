import Server from './server/server';
import router from './router/router'
import MySQL from './public/mysql';


const server = Server.init(3000);
server.app.use(router);

const mysql = MySQL.instance;

console.log('entraa');

server.start( () => {
  console.log('servidor corriendo en el puerto 3000');
});