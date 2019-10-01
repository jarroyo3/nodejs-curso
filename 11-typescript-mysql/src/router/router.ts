import { Router, Request, Response } from 'express';
import MySQL from '../public/mysql';

let router = Router();

router.get('/heroes', (req: Request, res: Response) => {
  console.log('ruta heroes');
  // Escapar 
  // const idEscapado = MySQL.instance.cnn.escape(parametroGetID);
  const query = `
    SELECT *
    FROM heroes
  `;

  MySQL.execQuery(query, (err:any, heroes: Object[]) => {
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


router.get('/heroes:id', (req: Request, res: Response) => {

  // Escapar 
  const id = req.params.id;
  const idEscapado = MySQL.instance.cnn.escape(id);
  const query = `
    SELECT *
    FROM heroes
    WHERE id = ${idEscapado }
  `;

  MySQL.execQuery(query, (err: any, heroes: Object[]) => {
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

export default router;