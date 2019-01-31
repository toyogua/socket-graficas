import { Router, Request, Response } from 'express';
import Server from '../clases/server';
import { usuariosConectados } from '../sockets/sockets';
import { GraficaData } from '../clases/grafica';

const router = Router();

const grafica =  new GraficaData();

router.get('/grafica', ( req: Request, res: Response ) => {

        res.json( grafica.getDataGrafica() );
});

router.post('/grafica', ( req: Request, res: Response ) => {
    
    const mes       = req.body.mes;
    const unidades  = Number(req.body.unidades);

    grafica.incrementarValor( mes, unidades );
    const server = Server.instance;
    server.io.emit('cambio-grafica', grafica.getDataGrafica() );

    res.json( grafica.getDataGrafica() );
});

router.post('/mensajes/:id', ( req: Request, res: Response ) => {
    
    const cuerpo    = req.body.cuerpo;
    const de        = req.body.de;
    const id        = req.params.id;

    const payload = {
        de,
        cuerpo
    }

    const server = Server.instance;
    server.io.in( id ).emit('mensaje-privado', payload );

    res.json({
        ok: true,
        cuerpo,
        de,
        id

    })
});

// servicios para obtener todos los ids de los usuarios
router.get('/usuarios', ( req: Request, res: Response ) => {
    const server = Server.instance;
    server.io.clients(( err: any, clientes: string[] ) => {
        if ( err ) {
            return res.json({
                ok: false,
                err: err
            })
        }

        res.json({
            ok: true,
            clientes
        });
    });
});

// Obtener usuarios y sus nombres
router.get('/usuarios/detalles', ( req: Request, res: Response ) => {
    
    res.json({
        ok: true,
        clientes: usuariosConectados.getLista()
    })
});

export default router;