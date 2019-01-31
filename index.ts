// ver que server se importa de esta manera ya que la clase se exporta como default en server.ts
import Server from './clases/server';
import router from './routes/router';
// para poder capturar la data desde un post
import bodyparser from 'body-parser';
// CORS
import cors from 'cors';

const server = Server.instance;

// configuracion del bodyparser
server.app.use(bodyparser.urlencoded({ extended: true }) );
server.app.use(bodyparser.json() );

// CORS
server.app.use( cors({  origin: true, credentials: true }))

// rutas de servicios
server.app.use('/', router);

server.start( () => {
    console.log(`Servidor de Desarrollo de RockSoft corriendo en el puerto ${ server.port }`);
});